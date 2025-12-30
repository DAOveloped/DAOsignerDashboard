/**
 * Vercel Serverless Function - Printify API Proxy
 *
 * This function proxies requests to the Printify API to avoid CORS issues
 * in the browser. It adds the necessary authentication headers.
 *
 * Usage: /api/printify?endpoint=/shops/SHOP_ID/products.json
 */

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET and POST requests
  if (!['GET', 'POST'].includes(req.method)) {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get the endpoint from query parameters
  const { endpoint } = req.query;

  if (!endpoint) {
    return res.status(400).json({ error: 'Missing endpoint parameter' });
  }

  // Get API token from environment variables
  const apiToken = process.env.PRINTIFY_API_TOKEN;

  if (!apiToken) {
    return res.status(500).json({ error: 'API token not configured' });
  }

  try {
    const url = `https://api.printify.com/v1${endpoint}`;

    const fetchOptions = {
      method: req.method,
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
        'User-Agent': 'DAOsigner-Apparel/1.0',
      },
    };

    // Add body for POST requests
    if (req.method === 'POST' && req.body) {
      fetchOptions.body = JSON.stringify(req.body);
    }

    const response = await fetch(url, fetchOptions);
    const data = await response.text();

    // Try to parse as JSON, otherwise return as-is
    try {
      const jsonData = JSON.parse(data);
      return res.status(response.status).json(jsonData);
    } catch {
      return res.status(response.status).send(data);
    }
  } catch (error) {
    console.error('Printify API Error:', error);
    return res.status(500).json({ error: 'Failed to fetch from Printify API' });
  }
}
