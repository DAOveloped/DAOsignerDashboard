/**
 * Vercel Serverless Function - AI Design Generation
 *
 * This function generates design images using OpenAI's DALL-E API
 * or falls back to a placeholder if no API key is configured.
 *
 * Environment Variables Required:
 * - OPENAI_API_KEY: Your OpenAI API key
 */

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, styles, colors } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid prompt' });
  }

  // Check if OpenAI API key is configured
  const openaiApiKey = process.env.OPENAI_API_KEY;

  if (!openaiApiKey) {
    // Return a placeholder for development/demo purposes
    console.warn('OPENAI_API_KEY not configured, returning placeholder');
    return res.status(200).json({
      imageUrl: 'https://placehold.co/1024x1024/1a1a2e/8B5CF6?text=AI+Generated+Design',
      message: 'AI generation not configured. Add OPENAI_API_KEY to environment variables.',
      placeholder: true,
    });
  }

  try {
    // Build the prompt for DALL-E
    const enhancedPrompt = `Create a t-shirt design: ${prompt}.
The design should be:
- High contrast with clean edges
- Suitable for screen printing on apparel
- Centered composition
- Professional quality graphic design
- No text unless specifically requested
- Transparent or solid color background`;

    // Call OpenAI DALL-E API
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
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
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);

      // Handle specific error types
      if (response.status === 400 && errorData.error?.code === 'content_policy_violation') {
        return res.status(400).json({
          error: 'Your prompt was flagged by content policy. Please try a different description.',
          code: 'content_policy'
        });
      }

      if (response.status === 429) {
        return res.status(429).json({
          error: 'Rate limit reached. Please wait a moment and try again.',
          code: 'rate_limit'
        });
      }

      return res.status(response.status).json({
        error: errorData.error?.message || 'Failed to generate image',
        code: 'api_error'
      });
    }

    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      return res.status(500).json({ error: 'No image generated' });
    }

    return res.status(200).json({
      imageUrl: data.data[0].url,
      revisedPrompt: data.data[0].revised_prompt,
    });

  } catch (error) {
    console.error('Generate design error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
