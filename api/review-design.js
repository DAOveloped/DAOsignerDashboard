/**
 * Vercel Serverless Function - AI Design Review
 *
 * Uses Anthropic Claude to automatically review submitted designs for:
 * - Inappropriate/pornographic content
 * - Offensive imagery or hate symbols
 * - Text containing profanity or slurs
 * - Low quality or nonsensical designs
 * - Copyright/trademark concerns
 *
 * Returns: { approved: boolean, reason: string, confidence: number }
 */

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { imageUrl, title, description, tags } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ error: 'Missing imageUrl' });
  }

  const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

  if (!anthropicApiKey) {
    console.warn('ANTHROPIC_API_KEY not configured, auto-approving');
    return res.status(200).json({
      approved: true,
      reason: 'Auto-approved (review not configured)',
      confidence: 0,
      reviewSkipped: true,
    });
  }

  try {
    // Fetch the image and convert to base64
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error('Failed to fetch image');
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString('base64');
    const contentType = imageResponse.headers.get('content-type') || 'image/png';

    // Call Anthropic Claude API for review
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307', // Fast and cost-effective for moderation
        max_tokens: 500,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: contentType,
                  data: base64Image,
                },
              },
              {
                type: 'text',
                text: `You are a content moderator for an apparel design platform. Review this design image for a t-shirt/clothing item.

Design Title: "${title || 'Untitled'}"
Description: "${description || 'No description'}"
Tags: ${tags?.join(', ') || 'None'}

Evaluate the design and respond with a JSON object (no markdown, just raw JSON):
{
  "approved": true/false,
  "reason": "Brief explanation",
  "confidence": 0.0-1.0,
  "flags": ["list", "of", "concerns"]
}

APPROVE if the design:
- Is appropriate for general audiences
- Does not contain nudity, pornography, or sexual content
- Does not contain hate symbols, slurs, or discriminatory imagery
- Does not contain excessive profanity or vulgar language
- Does not clearly infringe on major trademarks/copyrights
- Has reasonable artistic merit (not completely nonsensical)

REJECT if the design contains ANY of:
- Nudity, pornography, or overtly sexual content
- Hate speech, slurs, or discriminatory symbols
- Excessive profanity (single mild swear words may be acceptable in artistic context)
- Violence, gore, or disturbing imagery
- Clear trademark/copyright infringement (major brands, characters)
- Completely nonsensical or obviously low-effort content

Be reasonable - edgy or artistic designs are fine. Only reject clear violations.`,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Anthropic API error:', errorData);

      // If API fails, don't block - mark for manual review
      return res.status(200).json({
        approved: false,
        reason: 'Flagged for manual review (API error)',
        confidence: 0,
        requiresManualReview: true,
      });
    }

    const data = await response.json();
    const reviewText = data.content[0]?.text || '';

    // Parse the JSON response
    let reviewResult;
    try {
      // Try to extract JSON from the response
      const jsonMatch = reviewText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        reviewResult = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse review response:', reviewText);
      // Default to flagging for manual review if we can't parse
      return res.status(200).json({
        approved: false,
        reason: 'Flagged for manual review (parse error)',
        confidence: 0,
        requiresManualReview: true,
        rawResponse: reviewText,
      });
    }

    return res.status(200).json({
      approved: reviewResult.approved === true,
      reason: reviewResult.reason || 'No reason provided',
      confidence: reviewResult.confidence || 0.5,
      flags: reviewResult.flags || [],
      requiresManualReview: false,
    });

  } catch (error) {
    console.error('Review design error:', error);

    // On error, flag for manual review rather than blocking
    return res.status(200).json({
      approved: false,
      reason: 'Flagged for manual review (system error)',
      confidence: 0,
      requiresManualReview: true,
      error: error.message,
    });
  }
}
