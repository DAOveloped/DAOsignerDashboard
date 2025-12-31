/**
 * Printify API Service
 * Handles all communication with the Printify API for product management and orders
 *
 * Uses /api/printify?endpoint= format which works with both:
 * - Vite dev middleware (vite.config.js)
 * - Vercel serverless function (api/printify.js)
 */

// Get shop ID from environment variables
const getShopId = () => import.meta.env.VITE_PRINTIFY_SHOP_ID;

/**
 * Make an authenticated request to the Printify API
 * Both dev and prod use the same query parameter format for consistency
 */
const printifyFetch = async (endpoint, options = {}) => {
  // Use query parameter format for both dev (Vite middleware) and prod (Vercel function)
  const url = `/api/printify?endpoint=${encodeURIComponent(endpoint)}`;
  const fetchOptions = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Printify API Error:', response.status, errorText);
      throw new Error(`Printify API error (${response.status}): ${errorText}`);
    }

    return response.json();
  } catch (err) {
    console.error('Fetch error:', err);
    throw err;
  }
};

/**
 * Get all shops associated with the account
 */
export const getShops = async () => {
  return printifyFetch('/shops.json');
};

/**
 * Get all products from the configured shop with pagination
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Items per page (10-50, default: 50)
 */
export const getProducts = async (page = 1, limit = 50) => {
  const shopId = getShopId();

  if (!shopId) {
    throw new Error('Printify Shop ID not configured. Please set VITE_PRINTIFY_SHOP_ID in your .env file.');
  }

  return printifyFetch(`/shops/${shopId}/products.json?page=${page}&limit=${limit}`);
};

/**
 * Get all products (handles pagination automatically)
 */
export const getAllProducts = async () => {
  const allProducts = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await getProducts(page, 50);
    allProducts.push(...response.data);

    // Check if there are more pages
    hasMore = response.next_page_url !== null;
    page++;
  }

  return allProducts;
};

/**
 * Get a single product by ID
 */
export const getProduct = async (productId) => {
  const shopId = getShopId();

  if (!shopId) {
    throw new Error('Printify Shop ID not configured.');
  }

  return printifyFetch(`/shops/${shopId}/products/${productId}.json`);
};

/**
 * Get shipping information for a product
 */
export const getProductShipping = async (blueprintId, printProviderId) => {
  return printifyFetch(`/catalog/blueprints/${blueprintId}/print_providers/${printProviderId}/shipping.json`);
};

/**
 * Create an order
 */
export const createOrder = async (orderData) => {
  const shopId = getShopId();

  if (!shopId) {
    throw new Error('Printify Shop ID not configured.');
  }

  return printifyFetch(`/shops/${shopId}/orders.json`, {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
};

/**
 * Submit an order to production
 */
export const submitOrderToProduction = async (orderId) => {
  const shopId = getShopId();

  if (!shopId) {
    throw new Error('Printify Shop ID not configured.');
  }

  return printifyFetch(`/shops/${shopId}/orders/${orderId}/send_to_production.json`, {
    method: 'POST',
  });
};

/**
 * Get order details
 */
export const getOrder = async (orderId) => {
  const shopId = getShopId();

  if (!shopId) {
    throw new Error('Printify Shop ID not configured.');
  }

  return printifyFetch(`/shops/${shopId}/orders/${orderId}.json`);
};

/**
 * Get all orders
 */
export const getOrders = async (page = 1, limit = 10) => {
  const shopId = getShopId();

  if (!shopId) {
    throw new Error('Printify Shop ID not configured.');
  }

  return printifyFetch(`/shops/${shopId}/orders.json?page=${page}&limit=${limit}`);
};

/**
 * Calculate shipping for an order
 */
export const calculateShipping = async (lineItems, addressTo) => {
  const shopId = getShopId();

  if (!shopId) {
    throw new Error('Printify Shop ID not configured.');
  }

  return printifyFetch(`/shops/${shopId}/orders/shipping.json`, {
    method: 'POST',
    body: JSON.stringify({
      line_items: lineItems,
      address_to: addressTo,
    }),
  });
};

/**
 * Transform Printify product data to our app's format
 */
export const transformProduct = (printifyProduct) => {
  // Get the first available image or use a placeholder
  const images = printifyProduct.images || [];
  const primaryImage = images.find(img => img.is_default) || images[0];

  // Get variants and their prices
  const variants = printifyProduct.variants || [];
  const enabledVariants = variants.filter(v => v.is_enabled);

  // Calculate price range or single price
  const prices = enabledVariants.map(v => v.price / 100); // Printify stores prices in cents
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

  // Extract tags/categories
  const tags = printifyProduct.tags || [];

  // Try to determine category from tags
  let category = 'Apparel';
  const categoryKeywords = {
    'National Parks': ['national park', 'park', 'nature', 'outdoors'],
    'Crypto': ['crypto', 'bitcoin', 'blockchain', 'defi', 'dao'],
    'Hats': ['hat', 'cap', 'trucker', 'beanie'],
    'T-shirts': ['t-shirt', 'tee', 'shirt'],
  };

  for (const [cat, keywords] of Object.entries(categoryKeywords)) {
    if (tags.some(tag => keywords.some(kw => tag.toLowerCase().includes(kw))) ||
        printifyProduct.title.toLowerCase().includes(keywords[0])) {
      category = cat;
      break;
    }
  }

  // Check for specific tags
  const isNew = tags.some(tag => tag.toLowerCase().includes('new')) ||
    (printifyProduct.created_at && isWithinDays(printifyProduct.created_at, 30));
  const isFeatured = tags.some(tag => tag.toLowerCase().includes('featured'));

  return {
    id: printifyProduct.id,
    title: printifyProduct.title,
    description: printifyProduct.description,
    price: minPrice,
    priceRange: minPrice !== maxPrice ? { min: minPrice, max: maxPrice } : null,
    image: primaryImage?.src || null,
    images: images.map(img => ({
      src: img.src,
      variantIds: img.variant_ids,
      isDefault: img.is_default,
    })),
    category,
    tags,
    isNew,
    isFeatured,
    variants: enabledVariants.map(v => ({
      id: v.id,
      title: v.title,
      sku: v.sku,
      price: v.price / 100,
      isEnabled: v.is_enabled,
      isDefault: v.is_default,
      options: v.options || {},
    })),
    blueprintId: printifyProduct.blueprint_id,
    printProviderId: printifyProduct.print_provider_id,
    isVisible: printifyProduct.visible,
    createdAt: printifyProduct.created_at,
    updatedAt: printifyProduct.updated_at,
  };
};

/**
 * Helper to check if a date is within the last N days
 */
const isWithinDays = (dateString, days) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now - date;
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays <= days;
};

/**
 * Get and transform all products for the shop
 */
export const getTransformedProducts = async () => {
  const products = await getAllProducts();
  return products
    .filter(p => p.visible) // Only show visible/published products
    .map(transformProduct);
};

export default {
  getShops,
  getProducts,
  getAllProducts,
  getProduct,
  getProductShipping,
  createOrder,
  submitOrderToProduction,
  getOrder,
  getOrders,
  calculateShipping,
  transformProduct,
  getTransformedProducts,
};
