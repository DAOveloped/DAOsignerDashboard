import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on mode
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      // Custom plugin to handle API routes in development
      {
        name: 'api-proxy',
        configureServer(server) {
          // Handle /api/generate-design requests (OpenAI DALL-E)
          server.middlewares.use('/api/generate-design', async (req, res) => {
            if (req.method === 'OPTIONS') {
              res.setHeader('Access-Control-Allow-Origin', '*')
              res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
              res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
              res.statusCode = 200
              res.end()
              return
            }

            if (req.method !== 'POST') {
              res.statusCode = 405
              res.end(JSON.stringify({ error: 'Method not allowed' }))
              return
            }

            // Collect body
            let body = ''
            await new Promise((resolve) => {
              req.on('data', chunk => body += chunk)
              req.on('end', resolve)
            })

            const { prompt } = JSON.parse(body || '{}')
            if (!prompt) {
              res.statusCode = 400
              res.end(JSON.stringify({ error: 'Missing prompt' }))
              return
            }

            const openaiKey = env.OPENAI_API_KEY
            if (!openaiKey) {
              res.setHeader('Content-Type', 'application/json')
              res.statusCode = 200
              res.end(JSON.stringify({
                imageUrl: 'https://placehold.co/1024x1024/1a1a2e/8B5CF6?text=AI+Design',
                message: 'OPENAI_API_KEY not configured',
                placeholder: true,
              }))
              return
            }

            try {
              const enhancedPrompt = `Create a t-shirt design: ${prompt}. High contrast, clean edges, suitable for screen printing, centered composition, professional quality, no text unless requested.`

              const response = await fetch('https://api.openai.com/v1/images/generations', {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${openaiKey}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  model: 'dall-e-3',
                  prompt: enhancedPrompt,
                  n: 1,
                  size: '1024x1024',
                  quality: 'hd',
                  response_format: 'url',
                }),
              })

              const data = await response.json()
              res.setHeader('Content-Type', 'application/json')

              if (!response.ok) {
                res.statusCode = response.status
                res.end(JSON.stringify({ error: data.error?.message || 'Failed to generate' }))
                return
              }

              res.statusCode = 200
              res.end(JSON.stringify({
                imageUrl: data.data[0].url,
                revisedPrompt: data.data[0].revised_prompt,
              }))
            } catch (error) {
              console.error('Generate design error:', error)
              res.statusCode = 500
              res.end(JSON.stringify({ error: 'Internal server error' }))
            }
          })

          // Handle /api/review-design requests (Anthropic Claude)
          server.middlewares.use('/api/review-design', async (req, res) => {
            if (req.method === 'OPTIONS') {
              res.setHeader('Access-Control-Allow-Origin', '*')
              res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
              res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
              res.statusCode = 200
              res.end()
              return
            }

            if (req.method !== 'POST') {
              res.statusCode = 405
              res.end(JSON.stringify({ error: 'Method not allowed' }))
              return
            }

            let body = ''
            await new Promise((resolve) => {
              req.on('data', chunk => body += chunk)
              req.on('end', resolve)
            })

            const { imageUrl, title, description, tags } = JSON.parse(body || '{}')
            if (!imageUrl) {
              res.statusCode = 400
              res.end(JSON.stringify({ error: 'Missing imageUrl' }))
              return
            }

            const anthropicKey = env.ANTHROPIC_API_KEY
            if (!anthropicKey) {
              res.setHeader('Content-Type', 'application/json')
              res.statusCode = 200
              res.end(JSON.stringify({
                approved: true,
                reason: 'Auto-approved (review not configured)',
                confidence: 0,
                reviewSkipped: true,
              }))
              return
            }

            try {
              // Fetch and convert image to base64
              const imageResponse = await fetch(imageUrl)
              const imageBuffer = await imageResponse.arrayBuffer()
              const base64Image = Buffer.from(imageBuffer).toString('base64')
              const contentType = imageResponse.headers.get('content-type') || 'image/png'

              const response = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'x-api-key': anthropicKey,
                  'anthropic-version': '2023-06-01',
                },
                body: JSON.stringify({
                  model: 'claude-3-haiku-20240307',
                  max_tokens: 500,
                  messages: [{
                    role: 'user',
                    content: [
                      { type: 'image', source: { type: 'base64', media_type: contentType, data: base64Image } },
                      { type: 'text', text: `Review this t-shirt design. Title: "${title || 'Untitled'}". Respond with JSON only: {"approved": true/false, "reason": "brief explanation", "confidence": 0.0-1.0, "flags": []}. Approve unless it contains nudity, hate symbols, excessive profanity, or clear copyright infringement.` }
                    ]
                  }]
                }),
              })

              const data = await response.json()
              res.setHeader('Content-Type', 'application/json')

              if (!response.ok) {
                res.statusCode = 200
                res.end(JSON.stringify({ approved: false, reason: 'Flagged for manual review', requiresManualReview: true }))
                return
              }

              const reviewText = data.content[0]?.text || ''
              const jsonMatch = reviewText.match(/\{[\s\S]*\}/)
              if (jsonMatch) {
                const result = JSON.parse(jsonMatch[0])
                res.statusCode = 200
                res.end(JSON.stringify({
                  approved: result.approved === true,
                  reason: result.reason || 'No reason',
                  confidence: result.confidence || 0.5,
                  flags: result.flags || [],
                }))
              } else {
                res.statusCode = 200
                res.end(JSON.stringify({ approved: false, reason: 'Parse error', requiresManualReview: true }))
              }
            } catch (error) {
              console.error('Review design error:', error)
              res.statusCode = 200
              res.end(JSON.stringify({ approved: false, reason: 'System error', requiresManualReview: true }))
            }
          })

          // Handle /api/printify requests
          server.middlewares.use('/api/printify', async (req, res) => {
            const url = new URL(req.url, 'http://localhost')
            const endpoint = url.searchParams.get('endpoint')

            if (!endpoint) {
              res.statusCode = 400
              res.end(JSON.stringify({ error: 'Missing endpoint parameter' }))
              return
            }

            const token = env.VITE_PRINTIFY_API_TOKEN
            if (!token) {
              res.statusCode = 500
              res.end(JSON.stringify({ error: 'Printify API token not configured' }))
              return
            }

            try {
              const apiUrl = `https://api.printify.com/v1${endpoint}`

              // Collect body for POST requests
              let body = ''
              if (req.method === 'POST') {
                await new Promise((resolve) => {
                  req.on('data', chunk => body += chunk)
                  req.on('end', resolve)
                })
              }

              const fetchOptions = {
                method: req.method || 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                  'User-Agent': 'DAOsigner-Apparel/1.0',
                },
              }

              if (body) {
                fetchOptions.body = body
              }

              const response = await fetch(apiUrl, fetchOptions)
              const data = await response.text()
              res.setHeader('Content-Type', 'application/json')
              res.statusCode = response.status
              res.end(data)
            } catch (error) {
              console.error('Printify API Error:', error)
              res.statusCode = 500
              res.end(JSON.stringify({ error: 'Failed to fetch from Printify API' }))
            }
          })
        },
      },
    ],
    base: './',
  }
})
