import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";
import ScrollReveal from "../components/ScrollReveal";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { useProducts } from "../context/ProductContext";

// Featured designer - when more join, this becomes an array
const featuredDesigner = {
  name: "EnjoyWeaver",
  slug: "enjoyweaver",
  bio: "Creating wearable art inspired by nature, culture, and the world around us.",
  designCount: 27,
};

export default function Home() {
  const { products, loading, error } = useProducts();
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      console.log("Email submitted:", email);
      setEmailSubmitted(true);
      setEmail("");
    }
  };

  // Filter products by category for the category section
  const tshirtCount = products.filter(p =>
    p.title?.toLowerCase().includes('tee') ||
    p.title?.toLowerCase().includes('shirt') ||
    p.tags?.some(t => t.toLowerCase().includes('shirt'))
  ).length;

  const hatCount = products.filter(p =>
    p.title?.toLowerCase().includes('hat') ||
    p.title?.toLowerCase().includes('cap') ||
    p.tags?.some(t => t.toLowerCase().includes('hat'))
  ).length;

  return (
    <div className="relative">
      <AnimatedBackground />

      {/* ===== HERO ===== */}
      <section
        ref={heroRef}
        className="min-h-[100vh] relative flex items-center justify-center px-4"
      >
        <motion.div
          className="relative z-10 text-center max-w-4xl mx-auto"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* Slogan - Brand Identity */}
          <motion.p
            className="text-sm md:text-base tracking-[0.3em] text-purple-400 uppercase mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Design. Earn. Repeat.
          </motion.p>

          {/* Main Headline */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="text-white">Apparel Where</span>
            <br />
            <span className="gradient-text">Artists Earn Forever</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-400 max-w-xl mx-auto mb-10 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Every purchase pays the designer a royalty. Not once—on every sale, forever.
            Wear something that matters.
          </motion.p>

          {/* Dual CTAs - Designer-first */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link
              to="/submit"
              className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold text-lg px-8 py-4 rounded-full hover:bg-gray-100 transition-colors"
            >
              Submit Your Design
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-white font-medium text-lg px-6 py-4 rounded-full border border-white/30 hover:bg-white/10 transition-colors"
            >
              Shop Designs
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div className="w-1 h-2 bg-white/40 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== SHOP BY CATEGORY ===== */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              <Link
                to="/shop?category=T-shirts"
                className="group flex items-center gap-2"
              >
                <span className="text-2xl md:text-3xl font-bold text-white group-hover:text-purple-400 transition-colors">
                  T-Shirts
                </span>
                <span className="text-sm text-gray-500">
                  {tshirtCount || ''}
                </span>
                <svg className="w-5 h-5 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <span className="text-gray-600 hidden sm:block">|</span>

              <Link
                to="/shop?category=Hats"
                className="group flex items-center gap-2"
              >
                <span className="text-2xl md:text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  Hats
                </span>
                {hatCount > 0 && (
                  <span className="text-sm text-gray-500">
                    {hatCount}
                  </span>
                )}
                <svg className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <span className="text-gray-600 hidden sm:block">|</span>

              <Link
                to="/designers"
                className="group flex items-center gap-2"
              >
                <span className="text-2xl md:text-3xl font-bold text-white group-hover:text-amber-400 transition-colors">
                  Designers
                </span>
                <svg className="w-5 h-5 text-gray-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== PRODUCTS ===== */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-8 md:mb-10">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  New Arrivals
                </h2>
                <p className="text-gray-400 mt-1 text-sm md:text-base">Fresh from our designers</p>
              </div>
              <Link
                to="/shop"
                className="text-purple-400 hover:text-purple-300 text-sm md:text-base font-medium transition-colors flex items-center gap-1"
              >
                View all
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {loading ? (
              [...Array(8)].map((_, i) => (
                <div key={i} className="product-card animate-pulse">
                  <div className="product-image bg-gray-800/50"></div>
                  <div className="product-info">
                    <div className="h-3 bg-gray-800/50 rounded w-1/3 mb-2"></div>
                    <div className="h-4 bg-gray-800/50 rounded w-3/4 mb-3"></div>
                    <div className="h-5 bg-gray-800/50 rounded w-1/4"></div>
                  </div>
                </div>
              ))
            ) : error ? (
              <div className="col-span-full text-center py-16">
                <p className="text-gray-400 mb-4">Unable to load products right now.</p>
                <button
                  onClick={() => window.location.reload()}
                  className="text-purple-400 hover:text-purple-300 font-medium"
                >
                  Try again
                </button>
              </div>
            ) : products.length > 0 ? (
              products.slice(0, 8).map((product) => (
                <ProductCard key={product.id} {...product} />
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <p className="text-gray-400">New designs coming soon.</p>
              </div>
            )}
          </div>

          {!loading && products.length > 8 && (
            <div className="text-center mt-10">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 btn-secondary"
              >
                Browse All Products
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ===== FEATURED DESIGNER ===== */}
      <section className="py-12 md:py-20 border-y border-white/5">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto">
              {/* Section Label */}
              <p className="text-purple-400 text-sm font-medium uppercase tracking-wider mb-4 text-center md:text-left">
                Featured Designer
              </p>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
                {/* Designer Avatar */}
                <Link to={`/designer/${featuredDesigner.slug}`} className="flex-shrink-0 group">
                  <motion.div
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 p-1"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                      <span className="text-3xl md:text-4xl font-bold text-white">
                        {featuredDesigner.name.charAt(0)}
                      </span>
                    </div>
                  </motion.div>
                </Link>

                {/* Designer Info */}
                <div className="text-center md:text-left flex-1">
                  <Link to={`/designer/${featuredDesigner.slug}`}>
                    <h3 className="text-2xl md:text-3xl font-bold text-white hover:text-purple-400 transition-colors">
                      {featuredDesigner.name}
                    </h3>
                  </Link>
                  <p className="text-gray-400 mt-2 mb-4 max-w-md">
                    {featuredDesigner.bio}
                  </p>
                  <div className="flex items-center justify-center md:justify-start gap-4">
                    <span className="text-sm text-gray-500">
                      {featuredDesigner.designCount} designs
                    </span>
                    <Link
                      to={`/designer/${featuredDesigner.slug}`}
                      className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center gap-1"
                    >
                      View profile
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Designer's Products Preview */}
              {!loading && products.length > 0 && (
                <div className="mt-8 grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
                  {products.slice(0, 4).map((product) => (
                    <Link key={product.id} to={`/product/${product.id}`} className="group">
                      <div className="aspect-square rounded-lg overflow-hidden bg-gray-800/50">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-gray-600">No image</span>
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                How It Works
              </h2>
              <p className="text-gray-400 mb-10 md:mb-14">
                A better deal for artists and customers
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
                {/* Step 1 */}
                <div className="text-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl md:text-3xl font-bold text-purple-400">1</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Browse</h3>
                  <p className="text-gray-400 text-sm">
                    Discover original designs from independent artists
                  </p>
                </div>

                {/* Step 2 */}
                <div className="text-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl md:text-3xl font-bold text-cyan-400">2</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Order</h3>
                  <p className="text-gray-400 text-sm">
                    Premium apparel, printed on demand and shipped to you
                  </p>
                </div>

                {/* Step 3 */}
                <div className="text-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl md:text-3xl font-bold text-amber-400">3</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Artists Earn</h3>
                  <p className="text-gray-400 text-sm">
                    Designers receive royalties on every sale—automatically
                  </p>
                </div>
              </div>

              <p className="mt-10 md:mt-14 text-gray-400 text-sm md:text-base max-w-xl mx-auto">
                We're building a platform where artist royalties are
                <span className="text-purple-400 font-medium"> guaranteed and transparent</span>.
                No middlemen taking unfair cuts.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== EMAIL SIGNUP ===== */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-lg mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Stay in the Loop
              </h2>
              <p className="text-gray-400 mb-6 text-sm md:text-base">
                Be the first to see new designs and designer announcements.
              </p>

              {emailSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 font-medium py-4"
                >
                  You're in! We'll keep you posted.
                </motion.div>
              ) : (
                <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-5 py-3.5 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors text-base"
                  />
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-full transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              )}

              <p className="text-gray-600 text-xs mt-4">
                No spam, ever. Unsubscribe anytime.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== DESIGNER CTA ===== */}
      <section className="py-12 md:py-16 border-t border-white/5">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
              <div className="text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  Got a design idea?
                </h3>
                <p className="text-gray-400 text-sm md:text-base">
                  Turn your art into apparel. Earn royalties every time it sells.
                </p>
              </div>
              <Link
                to="/submit"
                className="btn-primary whitespace-nowrap"
              >
                Start Earning
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
