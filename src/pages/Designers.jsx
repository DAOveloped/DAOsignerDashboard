import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";
import ScrollReveal from "../components/ScrollReveal";
import Footer from "../components/Footer";

// Current designers (will be replaced with API data)
const allDesigners = [
  { id: 1, name: "EnjoyWeaver", slug: "enjoyweaver", designCount: 27, earnings: 0, isNew: false },
  { id: 2, name: "DesignerTwo", slug: "designertwo", designCount: 1, earnings: 0, isNew: true },
];

const filters = [
  { id: "all", label: "All" },
  { id: "trending", label: "Trending" },
  { id: "new", label: "New" },
  { id: "top", label: "Top Earners" },
];

export default function Designers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // Filter designers based on search and active filter
  const filteredDesigners = allDesigners.filter((designer) => {
    const matchesSearch = designer.name.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    switch (activeFilter) {
      case "new":
        return designer.isNew;
      case "top":
        return designer.earnings > 2000;
      case "trending":
        return designer.designCount > 20;
      default:
        return true;
    }
  });

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />

      {/* Header */}
      <section className="pt-32 pb-12">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Our <span className="gradient-text">Designers</span>
              </h1>
              <p className="text-gray-400 text-lg">
                Discover talented creators earning onchain royalties for every sale
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="pb-12">
        <div className="container mx-auto px-6">
          <ScrollReveal delay={0.1}>
            {/* Search Bar */}
            <div className="max-w-xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search designers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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

            {/* Filter Tabs */}
            <div className="flex justify-center gap-2 flex-wrap">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    activeFilter === filter.id
                      ? "bg-purple-500 text-white"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Designers Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {filteredDesigners.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {filteredDesigners.map((designer, index) => (
                <ScrollReveal key={designer.id} delay={index * 0.03}>
                  <Link to={`/designer/${designer.slug}`}>
                    <motion.div
                      className="text-center cursor-pointer group"
                      whileHover={{ y: -8 }}
                    >
                      {/* Avatar */}
                      <div className="relative">
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 p-0.5 group-hover:scale-110 transition-transform duration-300">
                          <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                            <span className="text-3xl font-bold text-white">
                              {designer.name.charAt(0)}
                            </span>
                          </div>
                        </div>
                        {designer.isNew && (
                          <span className="absolute -top-1 -right-1 px-2 py-0.5 bg-purple-500 text-white text-xs font-bold rounded-full">
                            NEW
                          </span>
                        )}
                      </div>

                      {/* Name */}
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">
                        {designer.name}
                      </h3>

                      {/* Stats */}
                      <p className="text-gray-500 text-sm">{designer.designCount} designs</p>
                      <p className="text-green-400 text-sm font-medium">${designer.earnings.toLocaleString()} earned</p>
                    </motion.div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No designers found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Want to Join Them?
              </h2>
              <p className="text-gray-400 mb-8">
                Start earning onchain royalties for every sale of your designs.
              </p>
              <Link to="/about" className="btn-primary text-lg px-8 py-4">
                Become a Designer
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
