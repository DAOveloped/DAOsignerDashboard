import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedBackground from '../components/AnimatedBackground';
import ScrollReveal from '../components/ScrollReveal';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { useProducts } from '../context/ProductContext';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name A-Z' },
];

export default function Shop() {
  const { products, loading, error, categories, fetchProducts } = useProducts();
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by category
    if (activeCategory !== 'All') {
      filtered = filtered.filter(p => p.category === activeCategory);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        (p.tags && p.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        filtered = filtered.filter(p => p.isNew).concat(filtered.filter(p => !p.isNew));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'featured':
      default:
        filtered = filtered.filter(p => p.isFeatured).concat(filtered.filter(p => !p.isFeatured));
        break;
    }

    return filtered;
  }, [products, activeCategory, sortBy, searchQuery]);

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
          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
              <p className="text-gray-400 mt-4">Loading products...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">!</div>
              <h3 className="text-2xl font-bold text-white mb-2">Unable to load products</h3>
              <p className="text-gray-400 mb-6">{error}</p>
              <button
                onClick={fetchProducts}
                className="btn-primary"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Products */}
          {!loading && !error && (
            <>
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
                  <div className="text-6xl mb-4">-</div>
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
            </>
          )}
        </div>
      </section>

      {/* Printify Integration Note */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="card text-center max-w-3xl mx-auto">
              <div className="text-4xl mb-4">*</div>
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
