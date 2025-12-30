import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import AnimatedBackground from '../components/AnimatedBackground'
import Footer from '../components/Footer'

// Earnings calculator helper
const calculateEarnings = (salesPerMonth, royaltyPerSale = 3.5) => {
  const monthly = salesPerMonth * royaltyPerSale
  const yearly = monthly * 12
  return { monthly, yearly }
}

export default function Submit() {
  const { user, signInWithGoogle, loading } = useAuth()
  const navigate = useNavigate()
  const [salesSlider, setSalesSlider] = useState(20)
  const [expandedFaq, setExpandedFaq] = useState(null)

  const earnings = calculateEarnings(salesSlider)

  const handleGetStarted = async () => {
    if (user) {
      navigate('/studio')
    } else {
      try {
        await signInWithGoogle()
      } catch (error) {
        console.error('Sign in error:', error)
      }
    }
  }

  const faqs = [
    {
      question: "How much can I earn?",
      answer: "You earn a royalty on every sale of your design, typically around $3-5 per item. If your design is popular and sells 50 times a month, that's $150-250/month in passive income. The more designs you have, the more you can earn."
    },
    {
      question: "How do royalties work?",
      answer: "When someone buys a product with your design, you automatically receive a percentage of the sale. Royalties are calculated after the order ships and are paid out regularly. Eventually, all payments will be verified on the blockchain for full transparency."
    },
    {
      question: "What kind of designs work best?",
      answer: "Designs that resonate with specific communities or interests tend to do well. Think: niche hobbies, clever phrases, minimalist art, pop culture references, or designs you'd personally want to wear. Quality and uniqueness matter more than complexity."
    },
    {
      question: "Why can I only submit one design at first?",
      answer: "We use a threshold system to maintain quality. Everyone starts with 1 design slot. Once your first design proves successful (reaches a sales milestone), you unlock more slots. This ensures our catalog stays curated and valuable."
    },
    {
      question: "How long until my design is approved?",
      answer: "We review submissions within 24-48 hours. We check for quality, originality, and that it follows our guidelines. If approved, your design goes live immediately. If we have feedback, we'll let you know how to improve it."
    },
    {
      question: "Do I need design skills?",
      answer: "No! Our Design Studio includes AI tools that can generate designs from text descriptions. Just describe what you want, and the AI creates it. Of course, you can also upload your own artwork if you prefer."
    }
  ]

  const thresholdLevels = [
    { name: "New", slots: 1, requirement: "Sign up", icon: "🌱" },
    { name: "Proven", slots: 2, requirement: "5 sales", icon: "🌿" },
    { name: "Established", slots: 5, requirement: "25 sales", icon: "🌳" },
    { name: "Pro", slots: 15, requirement: "100 sales", icon: "🏆" },
    { name: "Verified", slots: "∞", requirement: "500 sales", icon: "⭐" },
  ]

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />

      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center justify-center px-4 pt-20">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="text-sm md:text-base tracking-[0.3em] text-purple-400 uppercase mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Become a Designer
          </motion.p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
            <span className="text-white">Turn Your Art Into</span>
            <br />
            <span className="gradient-text">Passive Income</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Create designs using our AI tools or upload your own.
            Earn royalties on every sale, forever.
          </p>

          <motion.button
            onClick={handleGetStarted}
            disabled={loading}
            className="inline-flex items-center gap-3 bg-white text-gray-900 font-semibold text-lg px-10 py-5 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                Loading...
              </>
            ) : user ? (
              <>
                Open Design Studio
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </>
            ) : (
              <>
                Start Creating
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </>
            )}
          </motion.button>

          {!user && (
            <p className="text-gray-500 text-sm mt-4">
              Sign in with Google to get started
            </p>
          )}
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-gray-400">Three simple steps to start earning</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Create",
                description: "Use our AI tools to generate designs from text, or upload your own artwork. No design skills required.",
                color: "purple"
              },
              {
                step: "2",
                title: "Submit",
                description: "Preview your design on products, add details, and submit. We review and approve within 24-48 hours.",
                color: "cyan"
              },
              {
                step: "3",
                title: "Earn",
                description: "Your design goes live. Every time someone buys, you earn a royalty. Passive income, forever.",
                color: "amber"
              }
            ].map((item, i) => (
              <motion.div
                key={item.step}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={`w-16 h-16 rounded-full bg-${item.color}-500/20 flex items-center justify-center mx-auto mb-5`}>
                  <span className={`text-3xl font-bold text-${item.color}-400`}>{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Earnings Calculator */}
      <section className="py-20 px-4 border-y border-white/5">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Could You Earn?
            </h2>
            <p className="text-gray-400 mb-12">Drag the slider to see potential earnings</p>

            <div className="bg-white/5 rounded-2xl p-8 md:p-10 border border-white/10">
              <p className="text-gray-300 mb-6">
                If your design sells <span className="text-purple-400 font-bold text-2xl">{salesSlider}</span> times per month...
              </p>

              <input
                type="range"
                min="5"
                max="200"
                value={salesSlider}
                onChange={(e) => setSalesSlider(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500 mb-8"
              />

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-purple-500/10 rounded-xl p-6 border border-purple-500/20">
                  <p className="text-gray-400 text-sm mb-1">Monthly Earnings</p>
                  <p className="text-3xl md:text-4xl font-bold text-white">
                    ${earnings.monthly.toFixed(0)}
                  </p>
                </div>
                <div className="bg-cyan-500/10 rounded-xl p-6 border border-cyan-500/20">
                  <p className="text-gray-400 text-sm mb-1">Yearly Earnings</p>
                  <p className="text-3xl md:text-4xl font-bold text-white">
                    ${earnings.yearly.toFixed(0)}
                  </p>
                </div>
              </div>

              <p className="text-gray-500 text-sm mt-6">
                * Based on average royalty of $3.50 per sale. Actual earnings vary by product.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Threshold System */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Quality Over Quantity
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We use a threshold system to keep our catalog valuable. Start with one design,
              prove its success, and unlock more slots.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {thresholdLevels.map((level, i) => (
              <motion.div
                key={level.name}
                className="bg-white/5 rounded-xl p-5 border border-white/10 text-center min-w-[140px]"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="text-2xl mb-2">{level.icon}</div>
                <h4 className="font-semibold text-white mb-1">{level.name}</h4>
                <p className="text-purple-400 font-bold">{level.slots} {level.slots === 1 ? 'slot' : 'slots'}</p>
                <p className="text-gray-500 text-sm mt-1">{level.requirement}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 border-t border-white/5">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="bg-white/5 rounded-xl border border-white/10 overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="font-medium text-white">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${expandedFaq === i ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-400">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Earning?
            </h2>
            <p className="text-gray-400 mb-8">
              Join our community of designers and turn your creativity into income.
            </p>

            <motion.button
              onClick={handleGetStarted}
              disabled={loading}
              className="inline-flex items-center gap-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold text-lg px-10 py-5 rounded-full transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {user ? 'Open Design Studio' : 'Create Your First Design'}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
