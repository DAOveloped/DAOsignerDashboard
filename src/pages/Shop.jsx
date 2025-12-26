import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedBackground from '../components/AnimatedBackground';
import ScrollReveal from '../components/ScrollReveal';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

// Mock products data - will be replaced with Printify API data
const allProducts = [
  // Crypto Collection
  { id: 1, title: 'Crypto State of Mind', price: 20, category: 'Crypto', isNew: true },
  { id: 2, title: 'DeFi Until I Die', price: 20, category: 'Crypto', isFeatured: true },
  { id: 3, title: 'Rug Me Once, Shame On You', price: 20, category: 'Crypto' },
  { id: 4, title: 'Crypto Made Me Do It', price: 20, category: 'Crypto' },
  { id: 5, title: 'Bulls, Bears, Blockchain', price: 20, category: 'Crypto' },
  { id: 6, title: 'Full Send', price: 20, category: 'Crypto' },
  { id: 7, title: 'DAO Life', price: 20, category: 'Crypto' },
  { id: 8, title: 'Smart Contracts, Dumb Decisions', price: 20, category: 'Crypto', isFeatured: true },
  { id: 9, title: 'Build -n- Chill', price: 20, category: 'Crypto' },
  { id: 10, title: 'Crypto and Coffee', price: 20, category: 'Crypto' },
  { id: 11, title: "Satoshi's Child", price: 20, category: 'Crypto' },
  { id: 12, title: 'Shill -n- Chill', price: 20, category: 'Crypto' },
  { id: 13, title: 'Permissionless AF', price: 20, category: 'Crypto', isNew: true },
  { id: 14, title: 'Netflix and Shill', price: 20, category: 'Crypto' },

  // National Parks Collection
  { id: 15, title: 'Erosion. The OG Filer', price: 20, category: 'National Parks' },
  { id: 16, title: 'Where Everything Bites', price: 20, category: 'National Parks' },
  { id: 17, title: 'License to Kilauea', price: 20, category: 'National Parks', isFeatured: true },
  { id: 18, title: 'Carved by Time Zion', price: 20, category: 'National Parks' },
  { id: 19, title: 'Take Me Somewhere I can get Lost', price: 20, category: 'National Parks' },
  { id: 20, title: 'Cliff Notes Hit Different', price: 20, category: 'National Parks' },
  { id: 21, title: 'Cooler Than Your Ex Glacier', price: 20, category: 'National Parks' },
  { id: 22, title: 'I Hate Pulling Out of National Parks', price: 20, category: 'National Parks', isNew: true },
  { id: 23, title: 'Keep the Wonder Wild', price: 20, category: 'National Parks' },

  // Bitcoin / Arweave
  { id: 24, title: 'Arweave Permanence Pie', price: 25, category: 'Bitcoin' },
  { id: 25, title: 'Bitcoin Colorblind V-Neck', price: 30, category: 'Bitcoin' },
  { id: 26, title: 'Bitcoin Colorblind Tee', price: 30, category: 'Bitcoin' },

  // Hats
  { id: 27, title: 'DAOveloped Trucker Cap', price: 25, category: 'Hats', isNew: true },
  { id: 28, title: 'inDemniFi Trucker Cap', price: 25, category: 'Hats' },
];

const categories = ['All', 'Crypto', 'National Parks', 'Bitcoin', 'Hats'];

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name A-Z' },
];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = [...allProducts];

    // Filter by category
    if (activeCategory !== 'All') {
      products = products.filter(p => p.category === activeCategory);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      products = products.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        products = products.filter(p => p.isNew).concat(products.filter(p => !p.isNew));
        break;
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        products.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'featured':
      default:
        products = products.filter(p => p.isFeatured).concat(products.filter(p => !p.isFeatured));
        break;
    }

    return products;
  }, [activeCategory, sortBy, searchQuery]);

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                <span className="text-white">The </span>
                <span className="gradient-text">Collection</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Premium crypto and adventure apparel. Every purchase supports independent designers.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-8 sticky top-16 z-40 glass">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-80">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input pl-10"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Categories */}
            <div className="category-filter">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-sm">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-input py-2 px-4 text-sm bg-transparent border-purple-500/30"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value} className="bg-gray-900">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {/* Results count */}
          <div className="mb-8 flex items-center justify-between">
            <p className="text-gray-400">
              Showing <span className="text-white font-medium">{filteredProducts.length}</span> products
            </p>
          </div>

          {/* Product Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + sortBy + searchQuery}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">No products found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="btn-secondary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Printify Integration Note */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="card text-center max-w-3xl mx-auto">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Powered by Print-on-Demand
              </h3>
              <p className="text-gray-400">
                All products are printed and shipped directly to you through our Printify integration.
                High-quality prints, fast shipping, and eco-friendly production.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
