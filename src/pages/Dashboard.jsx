import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../utils/supabase'
import AnimatedBackground from '../components/AnimatedBackground'

const levelInfo = {
  new: { name: 'New', icon: '🌱', slots: 1, nextLevel: 'proven', nextRequirement: 5 },
  proven: { name: 'Proven', icon: '🌿', slots: 2, nextLevel: 'established', nextRequirement: 25 },
  established: { name: 'Established', icon: '🌳', slots: 5, nextLevel: 'pro', nextRequirement: 100 },
  pro: { name: 'Pro', icon: '🏆', slots: 15, nextLevel: 'verified', nextRequirement: 500 },
  verified: { name: 'Verified', icon: '⭐', slots: '∞', nextLevel: null, nextRequirement: null },
}

export default function Dashboard() {
  const { user, designerProfile, designerLevel, designSlots, totalSales, canSubmitDesign, signOut } = useAuth()
  const location = useLocation()
  const [designs, setDesigns] = useState([])
  const [stats, setStats] = useState({ totalEarnings: 0, pendingEarnings: 0, monthlyEarnings: 0 })
  const [loading, setLoading] = useState(true)
  const [showSuccess, setShowSuccess] = useState(location.state?.submitted)

  const currentLevelInfo = levelInfo[designerLevel] || levelInfo.new

  useEffect(() => {
    if (user && designerProfile) {
      fetchDesigns()
      fetchStats()
    }
  }, [user, designerProfile])

  // Clear success message after showing
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [showSuccess])

  const fetchDesigns = async () => {
    try {
      const { data, error } = await supabase
        .schema('products')
        .from('designs')
        .select('*')
        .eq('designer_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setDesigns(data || [])
    } catch (error) {
      console.error('Error fetching designs:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      // Fetch royalty stats
      const { data, error } = await supabase
        .schema('royalties')
        .from('payments')
        .select('amount, status, created_at')
        .eq('designer_id', user.id)

      if (error) throw error

      const now = new Date()
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

      const totalEarnings = data?.reduce((sum, p) => sum + (p.status === 'paid' ? Number(p.amount) : 0), 0) || 0
      const pendingEarnings = data?.reduce((sum, p) => sum + (p.status === 'pending' ? Number(p.amount) : 0), 0) || 0
      const monthlyEarnings = data?.filter(p => new Date(p.created_at) >= monthStart)
        .reduce((sum, p) => sum + Number(p.amount), 0) || 0

      setStats({ totalEarnings, pendingEarnings, monthlyEarnings })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const getStatusBadge = (status) => {
    const styles = {
      pending_review: 'bg-amber-500/20 text-amber-400',
      approved: 'bg-green-500/20 text-green-400',
      rejected: 'bg-red-500/20 text-red-400',
      live: 'bg-purple-500/20 text-purple-400',
    }
    const labels = {
      pending_review: 'Under Review',
      approved: 'Approved',
      rejected: 'Rejected',
      live: 'Live',
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || styles.pending_review}`}>
        {labels[status] || status}
      </span>
    )
  }

  if (!designerProfile) {
    return (
      <div className="relative min-h-screen">
        <AnimatedBackground />
        <div className="min-h-screen flex items-center justify-center px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">Not a Designer Yet</h2>
            <p className="text-gray-400 mb-6">Create your designer profile to access the dashboard</p>
            <Link
              to="/studio"
              className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Get Started
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-white">
            DAOsigner
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/shop"
              className="text-gray-300 hover:text-white transition-colors text-sm"
            >
              Shop
            </Link>
            <button
              onClick={signOut}
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">

          {/* Success Toast */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-500/20 border border-green-500/30 rounded-xl px-6 py-4 flex items-center gap-3"
              >
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-green-300">Design submitted successfully! We'll review it within 24-48 hours.</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Welcome Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back, {designerProfile.display_name}
            </h1>
            <p className="text-gray-400">Manage your designs and track your earnings</p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {/* Level Card */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-5 border border-purple-500/20">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{currentLevelInfo.icon}</span>
                <div>
                  <p className="text-gray-400 text-sm">Current Level</p>
                  <p className="text-white font-semibold">{currentLevelInfo.name}</p>
                </div>
              </div>
              {currentLevelInfo.nextLevel && (
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">{totalSales} / {currentLevelInfo.nextRequirement} sales</span>
                    <span className="text-purple-400">Next: {levelInfo[currentLevelInfo.nextLevel].name}</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
                      style={{ width: `${Math.min((totalSales / currentLevelInfo.nextRequirement) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Design Slots */}
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <p className="text-gray-400 text-sm mb-1">Design Slots</p>
              <p className="text-3xl font-bold text-white">
                {designs.length} <span className="text-lg text-gray-500">/ {designSlots}</span>
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {canSubmitDesign ? `${designSlots - designs.length} available` : 'All slots used'}
              </p>
            </div>

            {/* Total Earnings */}
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <p className="text-gray-400 text-sm mb-1">Total Earnings</p>
              <p className="text-3xl font-bold text-white">${stats.totalEarnings.toFixed(2)}</p>
              {stats.pendingEarnings > 0 && (
                <p className="text-amber-400 text-xs mt-1">
                  ${stats.pendingEarnings.toFixed(2)} pending
                </p>
              )}
            </div>

            {/* This Month */}
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <p className="text-gray-400 text-sm mb-1">This Month</p>
              <p className="text-3xl font-bold text-white">${stats.monthlyEarnings.toFixed(2)}</p>
              <p className="text-gray-500 text-xs mt-1">{totalSales} total sales</p>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="flex gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/studio"
              className={`inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-xl transition-colors ${
                canSubmitDesign
                  ? 'bg-purple-500 hover:bg-purple-600 text-white'
                  : 'bg-white/5 text-gray-500 cursor-not-allowed'
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Design
            </Link>
          </motion.div>

          {/* Designs List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-white mb-4">Your Designs</h2>

            {loading ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            ) : designs.length === 0 ? (
              <div className="bg-white/5 rounded-2xl p-12 border border-white/10 text-center">
                <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No designs yet</h3>
                <p className="text-gray-400 mb-6">Create your first design to start earning royalties</p>
                <Link
                  to="/studio"
                  className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  Create Your First Design
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {designs.map((design) => (
                  <motion.div
                    key={design.id}
                    className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden group"
                    whileHover={{ y: -4 }}
                  >
                    <div className="aspect-square bg-gray-800 relative">
                      {design.image_url ? (
                        <img
                          src={design.image_url}
                          alt={design.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-600">
                          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      <div className="absolute top-3 right-3">
                        {getStatusBadge(design.status)}
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-white mb-1 truncate">{design.title}</h3>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">
                          {design.sales_count || 0} sales
                        </span>
                        <span className="text-purple-400 font-medium">
                          ${((design.sales_count || 0) * 3.5).toFixed(2)} earned
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Level Progression Info */}
          <motion.div
            className="mt-12 bg-white/5 rounded-2xl p-6 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Level Progression</h3>
            <div className="grid sm:grid-cols-5 gap-4">
              {Object.entries(levelInfo).map(([key, info]) => (
                <div
                  key={key}
                  className={`text-center p-4 rounded-xl ${
                    designerLevel === key
                      ? 'bg-purple-500/20 border border-purple-500/50'
                      : 'bg-white/5'
                  }`}
                >
                  <div className="text-2xl mb-2">{info.icon}</div>
                  <p className="font-medium text-white text-sm">{info.name}</p>
                  <p className="text-purple-400 font-bold">{info.slots} slots</p>
                  {info.nextRequirement && (
                    <p className="text-gray-500 text-xs mt-1">{info.nextRequirement} sales</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
