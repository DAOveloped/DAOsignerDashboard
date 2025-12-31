/**
 * Printify Catalog Service
 * Fetches blueprints, print providers, and variants from Printify API
 */

// Curated list of popular apparel blueprints for the design studio
export const APPAREL_BLUEPRINTS = [
  // T-Shirts
  { id: 6, category: 'tshirt', name: 'Gildan Heavy Cotton Tee', brand: 'Gildan', style: 'Crew Neck' },
  { id: 5, category: 'tshirt', name: 'Next Level Cotton Crew Tee', brand: 'Next Level', style: 'Crew Neck' },
  { id: 12, category: 'tshirt', name: 'Bella+Canvas Jersey Tee', brand: 'Bella+Canvas', style: 'Crew Neck' },
  { id: 48, category: 'tshirt', name: 'Bella+Canvas V-Neck Tee', brand: 'Bella+Canvas', style: 'V-Neck' },
  { id: 9, category: 'tshirt', name: 'Bella+Canvas Women\'s Tee', brand: 'Bella+Canvas', style: 'Women\'s Fit' },

  // Long Sleeves
  { id: 41, category: 'longsleeve', name: 'Bella+Canvas Long Sleeve', brand: 'Bella+Canvas', style: 'Crew Neck' },
  { id: 45, category: 'longsleeve', name: 'Next Level Long Sleeve', brand: 'Next Level', style: 'Crew Neck' },

  // Hoodies & Sweatshirts
  { id: 77, category: 'hoodie', name: 'Gildan Heavy Blend Hoodie', brand: 'Gildan', style: 'Pullover' },
  { id: 49, category: 'sweatshirt', name: 'Gildan Crewneck Sweatshirt', brand: 'Gildan', style: 'Crew Neck' },
]

// Cache for API responses
const cache = new Map()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

/**
 * Fetch from API with caching
 */
async function fetchWithCache(endpoint) {
  const cacheKey = endpoint
  const cached = cache.get(cacheKey)

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data
  }

  const response = await fetch(`/api/printify?endpoint=${encodeURIComponent(endpoint)}`)

  if (!response.ok) {
    throw new Error(`Printify API error: ${response.status}`)
  }

  const data = await response.json()
  cache.set(cacheKey, { data, timestamp: Date.now() })

  return data
}

/**
 * Get all available blueprints
 */
export async function getAllBlueprints() {
  return fetchWithCache('/catalog/blueprints.json')
}

/**
 * Get a specific blueprint by ID
 */
export async function getBlueprint(blueprintId) {
  return fetchWithCache(`/catalog/blueprints/${blueprintId}.json`)
}

/**
 * Get print providers for a blueprint
 */
export async function getPrintProviders(blueprintId) {
  return fetchWithCache(`/catalog/blueprints/${blueprintId}/print_providers.json`)
}

/**
 * Get variants for a blueprint and print provider
 */
export async function getVariants(blueprintId, printProviderId) {
  return fetchWithCache(`/catalog/blueprints/${blueprintId}/print_providers/${printProviderId}/variants.json`)
}

/**
 * Get complete product info with variants
 * Returns blueprint details, default print provider, and all color/size options
 */
export async function getProductWithVariants(blueprintId) {
  try {
    // Get blueprint info
    const blueprint = await getBlueprint(blueprintId)

    // Get print providers
    const providers = await getPrintProviders(blueprintId)

    if (!providers || providers.length === 0) {
      throw new Error('No print providers available for this product')
    }

    // Use first print provider (usually the most reliable/cost-effective)
    const defaultProvider = providers[0]

    // Get variants for this provider
    const variantData = await getVariants(blueprintId, defaultProvider.id)

    // Extract unique colors and sizes
    const colors = new Map()
    const sizes = new Set()

    variantData.variants.forEach(variant => {
      const colorName = variant.options.color
      const sizeName = variant.options.size

      sizes.add(sizeName)

      if (!colors.has(colorName)) {
        colors.set(colorName, {
          name: colorName,
          // Try to extract hex color if available, otherwise use placeholder
          hex: variant.options.color_code || getColorHex(colorName),
          variants: []
        })
      }

      colors.get(colorName).variants.push({
        id: variant.id,
        size: sizeName,
        cost: variant.cost,
        placeholders: variant.placeholders
      })
    })

    return {
      blueprint: {
        id: blueprint.id,
        title: blueprint.title,
        brand: blueprint.brand,
        model: blueprint.model,
        description: blueprint.description,
        images: blueprint.images
      },
      printProvider: {
        id: defaultProvider.id,
        title: defaultProvider.title
      },
      colors: Array.from(colors.values()),
      sizes: Array.from(sizes),
      placeholders: variantData.variants[0]?.placeholders || []
    }
  } catch (error) {
    console.error('Error fetching product with variants:', error)
    throw error
  }
}

/**
 * Get print area dimensions for a blueprint
 */
export async function getPrintAreas(blueprintId, printProviderId) {
  const variantData = await getVariants(blueprintId, printProviderId)

  if (!variantData.variants || variantData.variants.length === 0) {
    return []
  }

  // Get placeholders from first variant (they're the same for all variants)
  return variantData.variants[0].placeholders.map(placeholder => ({
    position: placeholder.position,
    width: placeholder.width,
    height: placeholder.height
  }))
}

/**
 * Helper to get approximate hex color from color name
 */
function getColorHex(colorName) {
  const colorMap = {
    'Black': '#1a1a2e',
    'White': '#ffffff',
    'Navy': '#1e3a5f',
    'Royal': '#1e40af',
    'Red': '#dc2626',
    'Forest Green': '#166534',
    'Charcoal': '#374151',
    'Dark Heather': '#4b5563',
    'Sport Grey': '#9ca3af',
    'Light Blue': '#93c5fd',
    'Light Pink': '#fbcfe8',
    'Orange': '#f97316',
    'Purple': '#7c3aed',
    'Sand': '#d4a574',
    'Dark Chocolate': '#3d2314',
    'Heather Grey': '#9ca3af',
    'Maroon': '#7f1d1d',
    'Gold': '#ca8a04',
    'Irish Green': '#15803d',
    'Cardinal': '#991b1b',
  }

  // Try to match by partial name
  const lowerName = colorName.toLowerCase()
  for (const [key, value] of Object.entries(colorMap)) {
    if (lowerName.includes(key.toLowerCase()) || key.toLowerCase().includes(lowerName)) {
      return value
    }
  }

  return '#6b7280' // Default gray
}

/**
 * Get curated apparel products for the design studio
 */
export function getCuratedProducts() {
  return APPAREL_BLUEPRINTS
}

/**
 * Get products by category
 */
export function getProductsByCategory(category) {
  return APPAREL_BLUEPRINTS.filter(p => p.category === category)
}
