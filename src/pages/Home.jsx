import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";
import ScrollReveal from "../components/ScrollReveal";
import ParallaxSection from "../components/ParallaxSection";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

// Featured products data (will be replaced with Printify data)
const featuredProducts = [
  {
    id: 1,
    title: "Crypto State of Mind",
    price: 20,
    category: "Lifestyle",
    isNew: true,
  },
  {
    id: 2,
    title: "DeFi Until I Die",
    price: 20,
    category: "Lifestyle",
    isFeatured: true,
  },
  { id: 3, title: "License to Kilauea", price: 20, category: "National Parks" },
  { id: 4, title: "DAO Life", price: 20, category: "Lifestyle" },
  {
    id: 5,
    title: "Carved by Time Zion",
    price: 20,
    category: "National Parks",
    isNew: true,
  },
  {
    id: 6,
    title: "Keep the Wonder Wild",
    price: 20,
    category: "National Parks",
  },
  {
    id: 7,
    title: "Smart Contracts, Dumb Decisions",
    price: 20,
    category: "Lifestyle",
  },
  {
    id: 8,
    title: "Netflix and Shill",
    price: 20,
    category: "Lifestyle",
    isFeatured: true,
  },
];

// Current designers (will be replaced with API data)
const featuredDesigners = [
  { id: 1, name: "EnjoyWeaver", slug: "enjoyweaver", designCount: 27, avatar: null },
  { id: 2, name: "DesignerTwo", slug: "designertwo", designCount: 1, avatar: null },
];

const stats = [
  { value: "100%", label: "Onchain Payments" },
  { value: "Forever", label: "Designer Royalties" },
  { value: "50+", label: "Designer Creations" },
  { value: "48h", label: "Fast Shipping" },
];

const whyOnchain = [
  {
    icon: "🔗",
    title: "Verifiable",
    description:
      "Every payment is recorded onchain. Check it yourself, anytime.",
  },
  {
    icon: "🤝",
    title: "Trustless",
    description:
      "No middlemen. Smart contracts guarantee your royalties automatically.",
  },
  {
    icon: "♾️",
    title: "Forever",
    description:
      "Your designs, your earnings. Every sale, for life. No exceptions.",
  },
  {
    icon: "⚡",
    title: "Instant",
    description: "Royalties paid automatically after the refund window closes.",
  },
];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.85], [1, 0.95]);

  return (
    <div className="relative">
      <AnimatedBackground />

      {/* ===== HERO SECTION ===== */}
      <section
        ref={heroRef}
        className="hero-section min-h-screen relative pb-96"
      >
        {/* Floating 3D Elements */}
        <motion.div
          className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/10 blur-xl"
          animate={{ y: [0, 30, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-10 w-48 h-48 rounded-full bg-gradient-to-br from-amber-500/20 to-purple-500/10 blur-xl"
          animate={{ y: [0, -40, 0], rotate: [360, 180, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/30 to-transparent blur-lg"
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Hero Content */}
        <motion.div
          className="relative z-10 container mx-auto px-6 pt-40 pb-20 text-center"
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        >
          {/* Spacer for header clearance */}
          <div className="h-20" />

          {/* Main Headline */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="text-white">Design.</span>
            <span className="gradient-text"> Earn.</span>
            <span className="text-white"> Repeat.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            The first apparel brand that pays designers onchain for every single
            sale, forever.
            <br className="hidden md:block" />
            <span className="text-purple-400">
              Verifiable. Trustless. Guaranteed.
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Link to="/shop" className="btn-primary text-lg px-8 py-4">
              Shop Collection
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link to="/about" className="btn-secondary text-lg px-8 py-4">
              Become a Designer
            </Link>
          </motion.div>

          {/* Hero Image / Product Showcase */}
          <motion.div
            className="mt-16 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
          >
            <div className="relative mx-auto max-w-4xl">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-cyan-500/20 to-amber-500/30 blur-3xl -z-10 scale-110" />

              {/* Featured Banner */}
              <img
                src="/images/banner.png"
                alt="DAOsigner Apparel - Create Once. Earn Forever."
                className="w-full h-auto rounded-2xl shadow-2xl"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-gray-500 flex justify-center p-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div className="w-1.5 h-3 bg-purple-400 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== MARQUEE SECTION ===== */}
      <div className="marquee-container py-4">
        <div className="marquee-content">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex">
              <span className="marquee-item">DESIGN & EARN</span>
              <span className="marquee-item text-purple-400">★</span>
              <span className="marquee-item">ONCHAIN ROYALTIES</span>
              <span className="marquee-item text-cyan-400">★</span>
              <span className="marquee-item">VERIFIABLE PAYMENTS</span>
              <span className="marquee-item text-amber-400">★</span>
              <span className="marquee-item">TRUSTLESS</span>
              <span className="marquee-item text-purple-400">★</span>
              <span className="marquee-item">FOREVER EARNINGS</span>
              <span className="marquee-item text-cyan-400">★</span>
              <span className="marquee-item">GUARANTEED</span>
              <span className="marquee-item text-amber-400">★</span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== WHY ONCHAIN SECTION ===== */}
      <section className="section py-24">
        <ScrollReveal>
          <div className="section-header">
            <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">
              Why Onchain Payments?
            </span>
            <h2 className="text-white mt-2">
              Finally, a Brand That{" "}
              <span className="gradient-text">Pays Designers Right</span>
            </h2>
            <p>Every royalty payment is recorded onchain. No trust required.</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {whyOnchain.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.1}>
              <motion.div
                className="text-center group"
                whileHover={{ y: -8 }}
              >
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ===== MEET OUR DESIGNERS SECTION ===== */}
      <section className="section py-24">
        <ScrollReveal>
          <div className="section-header">
            <h2 className="gradient-text">Meet Our Designers</h2>
            <p>The creative minds earning onchain royalties</p>
          </div>
        </ScrollReveal>

        {/* Search Bar */}
        <ScrollReveal delay={0.1}>
          <div className="max-w-md mx-auto mb-16">
            <div className="relative">
              <input
                type="text"
                placeholder="Find a designer..."
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
              />
              <svg
                className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </ScrollReveal>

        {/* Designer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {featuredDesigners.map((designer, index) => (
            <ScrollReveal key={designer.id} delay={index * 0.05}>
              <Link to={`/designer/${designer.slug}`}>
                <motion.div
                  className="text-center cursor-pointer group"
                  whileHover={{ y: -8 }}
                >
                  {/* Avatar */}
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 p-0.5 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {designer.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  {/* Name */}
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">
                    {designer.name}
                  </h3>
                  {/* Design Count */}
                  <p className="text-gray-500 text-sm">{designer.designCount} designs</p>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Browse All Button */}
        <ScrollReveal delay={0.4}>
          <div className="text-center mt-12">
            <Link to="/designers" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors">
              Browse All Designers
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ===== FEATURED PRODUCTS SECTION ===== */}
      <section className="section py-24 relative">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-3xl -z-10" />

        <ScrollReveal>
          <div className="section-header">
            <h2 className="text-white">
              Featured <span className="gradient-text">Drops</span>
            </h2>
            <p>Fresh designs from our community of creators</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <div className="text-center mt-12">
            <Link to="/shop" className="btn-secondary">
              View All Products
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ===== DESIGN & EARN SECTION ===== */}
      <section className="py-24 relative overflow-hidden">
        <ParallaxSection speed={0.3}>
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <ScrollReveal direction="left">
                <div>
                  <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">
                    Designer Program
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
                    Design. Earn.
                    <span className="gradient-text block">Repeat.</span>
                  </h2>
                  <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    We're building something different. Every designer who
                    creates for DAOsigner earns royalties on every single sale -
                    paid automatically onchain. No middlemen, no broken
                    promises, no "we'll pay you eventually." Just verifiable,
                    trustless payments you can count on.
                  </p>

                  <ul className="space-y-4 mb-8">
                    {[
                      "Royalties paid onchain - verifiable by anyone",
                      "Automatic payments after 30-day refund window",
                      "No upfront costs or inventory to manage",
                      "Full creative freedom on your designs",
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center gap-3 text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-purple-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>

                  <Link to="/about" className="btn-primary">
                    Apply to Design
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </ScrollReveal>

              {/* Image / Visual */}
              <ScrollReveal direction="right">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-3xl -z-10" />
                  <img
                    src="/images/logo.png"
                    alt="DAOsigner - Design and Earn"
                    className="w-full max-w-sm mx-auto h-auto"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </ParallaxSection>
      </section>

      {/* ===== HOW IT WORKS SECTION ===== */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="section-header">
              <h2 className="gradient-text">How Onchain Royalties Work</h2>
              <p>Transparent. Automatic. Guaranteed.</p>
            </div>
          </ScrollReveal>

          <div className="flex flex-col md:flex-row justify-center items-start gap-4 md:gap-0 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Customer Buys",
                desc: "Someone purchases a shirt with your design",
              },
              {
                step: "02",
                title: "30-Day Wait",
                desc: "Refund window ensures legitimate sales only",
              },
              {
                step: "03",
                title: "Smart Contract",
                desc: "Royalty automatically calculated and queued",
              },
              {
                step: "04",
                title: "Onchain Payment",
                desc: "You receive payment - verifiable forever",
              },
            ].map((item, index, arr) => (
              <ScrollReveal key={item.step} delay={index * 0.15} className="flex-1 flex items-center">
                <motion.div className="text-center flex-1 group" whileHover={{ y: -5 }}>
                  <span className="text-5xl md:text-6xl font-black gradient-text opacity-60 group-hover:opacity-100 transition-opacity">
                    {item.step}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-4 mb-2 group-hover:text-purple-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </motion.div>
                {index < arr.length - 1 && (
                  <div className="hidden md:block text-gray-600 text-3xl px-4">→</div>
                )}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <ScrollReveal key={stat.label} delay={index * 0.1} direction="up">
                <div className="stat-item">
                  <motion.h3
                    className="gradient-text"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                  >
                    {stat.value}
                  </motion.h3>
                  <p>{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIAL / SOCIAL PROOF ===== */}
      <section className="section py-24">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-8xl mb-8 gradient-text opacity-30">"</div>
            <p className="text-2xl md:text-3xl text-white font-light leading-relaxed italic mb-8">
              I've sold designs on other platforms before, but I never knew if
              I was actually getting paid fairly. With DAOsigner, I can verify
              every single royalty payment onchain. No more trusting - just
              verifying.
            </p>
            <p className="text-purple-400 font-semibold text-lg">— Independent Designer</p>
          </div>
        </ScrollReveal>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-cyan-900/20" />

        <ParallaxSection speed={0.2}>
          <div className="container mx-auto px-6 text-center relative z-10">
            <ScrollReveal>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Ready to Create?
                <span className="gradient-text block mt-2">Or Just Shop?</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                Whether you're a designer ready to earn or a fan of great
                apparel, there's a place for you at DAOsigner.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/shop" className="btn-primary text-lg px-10 py-4">
                  Shop Now
                </Link>
                <Link to="/about" className="btn-secondary text-lg px-10 py-4">
                  Become a Designer
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </ParallaxSection>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
