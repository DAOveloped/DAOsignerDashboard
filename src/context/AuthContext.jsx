import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [designerProfile, setDesignerProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch customer profile from database
  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .schema('customers')
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error fetching profile:', error)
      return null
    }
  }

  // Fetch designer profile if exists
  const fetchDesignerProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .schema('designers')
        .from('profiles')
        .select('*, progress(*)')
        .eq('user_id', userId)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching designer profile:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error fetching designer profile:', error)
      return null
    }
  }

  // Create customer profile if it doesn't exist
  const createProfile = async (user) => {
    try {
      const { data, error } = await supabase
        .schema('customers')
        .from('profiles')
        .insert({
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || user.user_metadata?.name || '',
          avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || '',
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating profile:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error creating profile:', error)
      return null
    }
  }

  // Become a designer (creates designer profile)
  const becomeDesigner = async (displayName, bio = '', walletAddress = '') => {
    if (!user) throw new Error('Must be logged in to become a designer')

    // Generate a URL-safe slug from display name
    const slug = displayName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') + '-' + Math.random().toString(36).substring(2, 8)

    try {
      const { data, error } = await supabase
        .schema('designers')
        .from('profiles')
        .insert({
          user_id: user.id,
          display_name: displayName,
          slug: slug,
          bio: bio,
          wallet_address: walletAddress || '0x0000000000000000000000000000000000000000',
        })
        .select('*, progress(*)')
        .single()

      if (error) {
        console.error('Error creating designer profile:', error)
        throw error
      }

      setDesignerProfile(data)
      return data
    } catch (error) {
      console.error('Error becoming designer:', error)
      throw error
    }
  }

  // Load all user data
  const loadUserData = async (authUser) => {
    // Fetch customer profile, create if doesn't exist
    let customerProfile = await fetchProfile(authUser.id)
    if (!customerProfile) {
      customerProfile = await createProfile(authUser)
    }
    setProfile(customerProfile)

    // Check if user is a designer
    const designer = await fetchDesignerProfile(authUser.id)
    setDesignerProfile(designer)
  }

  useEffect(() => {
    // Get initial session
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()

        if (session?.user) {
          setUser(session.user)
          await loadUserData(session.user)
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
      } finally {
        setLoading(false)
      }
    }

    initAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email)

        setUser(session?.user ?? null)

        if (session?.user) {
          await loadUserData(session.user)
        } else {
          setProfile(null)
          setDesignerProfile(null)
        }

        // If we just signed in, make sure loading is false
        if (event === 'SIGNED_IN') {
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // Redirect to root - the auth handler will navigate to dashboard after session is established
        redirectTo: window.location.origin
      }
    })
    if (error) throw error
  }

  const signInWithEmail = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error
    return data
  }

  const signUpWithEmail = async (email, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    })
    if (error) throw error
    return data
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    setUser(null)
    setProfile(null)
    setDesignerProfile(null)
  }

  // Refresh designer profile (useful after submitting a design)
  const refreshDesignerProfile = async () => {
    if (!user) return
    const designer = await fetchDesignerProfile(user.id)
    setDesignerProfile(designer)
  }

  // Map level_id to level name (matches designers.levels table)
  const levelNames = {
    1: 'new',
    2: 'proven',
    3: 'established',
    4: 'pro',
    5: 'verified',
  }

  // Get available slots based on level (matches designers.levels.max_designs)
  const levelSlots = {
    1: 1,    // New
    2: 2,    // Proven
    3: 5,    // Established
    4: 15,   // Pro
    5: -1,   // Verified (unlimited)
  }

  const currentLevelId = designerProfile?.level_id || 1
  const totalDesigns = designerProfile?.progress?.total_designs || 0

  // Check if user is platform owner (unlimited access)
  const isOwner = profile?.is_owner === true

  // Owners get unlimited slots, otherwise use level-based or progress-based slots
  const availableSlots = isOwner
    ? Infinity
    : (designerProfile?.progress?.available_slots === -1
        ? Infinity
        : designerProfile?.progress?.available_slots ?? levelSlots[currentLevelId] ?? 1)

  const value = {
    user,
    profile,
    designerProfile,
    loading,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    becomeDesigner,
    refreshDesignerProfile,
    isAuthenticated: !!user,
    isDesigner: !!designerProfile,
    isAdmin: profile?.is_admin || false,
    isOwner: isOwner, // Platform owner flag
    // Designer-specific computed values (matching schema columns)
    designerLevel: isOwner ? 'verified' : (levelNames[currentLevelId] || 'new'),
    designSlots: availableSlots,
    totalSales: designerProfile?.progress?.total_sales || 0,
    totalDesigns: totalDesigns,
    canSubmitDesign: isOwner || availableSlots === Infinity || totalDesigns < availableSlots,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
