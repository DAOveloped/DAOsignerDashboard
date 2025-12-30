import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../utils/supabase'
import AnimatedBackground from '../components/AnimatedBackground'

// Mock product templates for preview
const productTemplates = [
  { id: 'tshirt', name: 'T-Shirt', basePrice: 24.99, image: '/products/tshirt-template.png' },
  { id: 'hoodie', name: 'Hoodie', basePrice: 49.99, image: '/products/hoodie-template.png' },
  { id: 'longsleeve', name: 'Long Sleeve', basePrice: 29.99, image: '/products/longsleeve-template.png' },
]

export default function Studio() {
  const { user, isDesigner, designerProfile, becomeDesigner, canSubmitDesign, designSlots, designerLevel, refreshDesignerProfile } = useAuth()
  const navigate = useNavigate()

  // Onboarding state (for new designers)
  const [showOnboarding, setShowOnboarding] = useState(!isDesigner)
  const [onboardingStep, setOnboardingStep] = useState(1)
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [onboardingLoading, setOnboardingLoading] = useState(false)
  const [onboardingError, setOnboardingError] = useState('')

  // Design creation state
  const [step, setStep] = useState(1) // 1: Create, 2: Preview, 3: Details, 4: Submit
  const [designMethod, setDesignMethod] = useState(null) // 'ai' or 'upload'
  const [aiPrompt, setAiPrompt] = useState('')
  const [uploadedImage, setUploadedImage] = useState(null)
  const [generatedImage, setGeneratedImage] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(productTemplates[0])
  const [designTitle, setDesignTitle] = useState('')
  const [designDescription, setDesignDescription] = useState('')
  const [tags, setTags] = useState([])
  const [tagInput, setTagInput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const fileInputRef = useRef(null)

  // Handle designer onboarding
  const handleOnboardingSubmit = async () => {
    if (!displayName.trim()) {
      setOnboardingError('Please enter a display name')
      return
    }

    setOnboardingLoading(true)
    setOnboardingError('')

    try {
      await becomeDesigner(displayName.trim(), bio.trim())
      setShowOnboarding(false)
    } catch (error) {
      setOnboardingError(error.message || 'Failed to create designer profile')
    } finally {
      setOnboardingLoading(false)
    }
  }

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file')
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image must be less than 10MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setUploadedImage(e.target?.result)
      setDesignMethod('upload')
      setStep(2)
    }
    reader.readAsDataURL(file)
  }

  // Handle AI generation (placeholder)
  const handleGenerateAI = async () => {
    if (!aiPrompt.trim()) {
      setError('Please enter a description for your design')
      return
    }

    setIsGenerating(true)
    setError('')

    try {
      // TODO: Integrate with actual AI service
      // For now, show a placeholder
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Placeholder: In production, this would be the generated image URL
      setGeneratedImage('/placeholder-generated.png')
      setDesignMethod('ai')
      setStep(2)
    } catch (error) {
      setError('Failed to generate design. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  // Handle tag input
  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      if (tags.length >= 5) {
        setError('Maximum 5 tags allowed')
        return
      }
      if (!tags.includes(tagInput.trim().toLowerCase())) {
        setTags([...tags, tagInput.trim().toLowerCase()])
      }
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  // Handle design submission
  const handleSubmit = async () => {
    if (!designTitle.trim()) {
      setError('Please enter a design title')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const imageUrl = designMethod === 'ai' ? generatedImage : uploadedImage

      // Upload image to Supabase Storage
      // TODO: Implement actual image upload

      // Create design submission in database
      const { data, error: submitError } = await supabase
        .schema('products')
        .from('designs')
        .insert({
          designer_id: user.id,
          title: designTitle.trim(),
          description: designDescription.trim(),
          image_url: imageUrl, // This would be the uploaded URL
          ai_prompt: designMethod === 'ai' ? aiPrompt : null,
          tags: tags,
          status: 'pending_review',
        })
        .select()
        .single()

      if (submitError) throw submitError

      // Refresh designer profile to update slots
      await refreshDesignerProfile()

      // Navigate to success or dashboard
      navigate('/dashboard', { state: { submitted: true } })
    } catch (error) {
      setError(error.message || 'Failed to submit design. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentImage = designMethod === 'ai' ? generatedImage : uploadedImage

  // Onboarding modal for new designers
  if (showOnboarding && !isDesigner) {
    return (
      <div className="relative min-h-screen">
        <AnimatedBackground />

        <div className="min-h-screen flex items-center justify-center px-4 pt-20">
          <motion.div
            className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full border border-white/10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Welcome to the Studio</h2>
              <p className="text-gray-400">Let's set up your designer profile</p>
            </div>

            {onboardingStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Display Name *
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="How should we credit your designs?"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                    maxLength={50}
                  />
                  <p className="text-gray-500 text-xs mt-2">This will appear on all your designs</p>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Bio (optional)
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself and your style..."
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
                    maxLength={500}
                  />
                </div>

                {onboardingError && (
                  <p className="text-red-400 text-sm mb-4">{onboardingError}</p>
                )}

                <button
                  onClick={handleOnboardingSubmit}
                  disabled={onboardingLoading}
                  className="w-full py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-xl transition-colors disabled:opacity-50"
                >
                  {onboardingLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Creating Profile...
                    </span>
                  ) : (
                    'Start Creating'
                  )}
                </button>

                <p className="text-center text-gray-500 text-sm mt-4">
                  You'll start with <span className="text-purple-400 font-semibold">1 design slot</span>.
                  Earn more by selling!
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    )
  }

  // Check if user can submit
  if (isDesigner && !canSubmitDesign) {
    return (
      <div className="relative min-h-screen">
        <AnimatedBackground />

        <div className="min-h-screen flex items-center justify-center px-4 pt-20">
          <motion.div
            className="text-center max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m5-10V7a5 5 0 00-10 0v4a5 5 0 005 5h0a5 5 0 005-5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">All Slots Used</h2>
            <p className="text-gray-400 mb-6">
              You've used all {designSlots} of your design slots at the <span className="text-purple-400 capitalize">{designerLevel}</span> level.
              Make sales to unlock more slots!
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              View Dashboard
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
            <span className="text-gray-400 text-sm">
              {designSlots - (designerProfile?.progress?.designs_submitted || 0)} slots remaining
            </span>
            <Link
              to="/dashboard"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            {['Create', 'Preview', 'Details', 'Submit'].map((label, i) => (
              <div key={label} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-colors ${
                  step > i + 1 ? 'bg-purple-500 text-white' :
                  step === i + 1 ? 'bg-purple-500/20 text-purple-400 border-2 border-purple-500' :
                  'bg-white/5 text-gray-500'
                }`}>
                  {step > i + 1 ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span className={`ml-2 text-sm hidden sm:block ${step === i + 1 ? 'text-white' : 'text-gray-500'}`}>
                  {label}
                </span>
                {i < 3 && (
                  <div className={`w-12 sm:w-20 h-0.5 mx-2 ${step > i + 1 ? 'bg-purple-500' : 'bg-white/10'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Error Display */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 flex items-center gap-3"
              >
                <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-400">{error}</p>
                <button onClick={() => setError('')} className="ml-auto text-red-400 hover:text-red-300">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 1: Create */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Create Your Design</h1>
                <p className="text-gray-400">Use AI to generate or upload your own artwork</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* AI Generation */}
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white">AI Generate</h3>
                  </div>

                  <p className="text-gray-400 text-sm mb-4">
                    Describe your design idea and let AI create it for you
                  </p>

                  <textarea
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="A minimalist geometric wolf howling at the moon, white lines on transparent background..."
                    rows={4}
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none mb-4"
                  />

                  <button
                    onClick={handleGenerateAI}
                    disabled={isGenerating || !aiPrompt.trim()}
                    className="w-full py-3 bg-purple-500 hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Generate Design
                      </>
                    )}
                  </button>
                </div>

                {/* Upload */}
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white">Upload Artwork</h3>
                  </div>

                  <p className="text-gray-400 text-sm mb-4">
                    Upload your own design (PNG, JPG, or SVG)
                  </p>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer hover:border-cyan-500/50 transition-colors"
                  >
                    <svg className="w-10 h-10 text-gray-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-gray-400 text-sm">Click to upload or drag and drop</p>
                    <p className="text-gray-500 text-xs mt-1">Max 10MB</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Preview */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Preview Your Design</h1>
                <p className="text-gray-400">See how it looks on different products</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Product Preview */}
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="aspect-square bg-gray-800 rounded-xl flex items-center justify-center overflow-hidden mb-4">
                    {currentImage ? (
                      <img
                        src={currentImage}
                        alt="Design preview"
                        className="max-w-[60%] max-h-[60%] object-contain"
                      />
                    ) : (
                      <div className="text-gray-500">No image</div>
                    )}
                  </div>

                  <p className="text-center text-gray-400 text-sm">
                    Preview on {selectedProduct.name}
                  </p>
                </div>

                {/* Product Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Select Product Type</h3>
                  <div className="space-y-3">
                    {productTemplates.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => setSelectedProduct(product)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                          selectedProduct.id === product.id
                            ? 'bg-purple-500/10 border-purple-500'
                            : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">
                            {product.id === 'tshirt' ? '👕' : product.id === 'hoodie' ? '🧥' : '👔'}
                          </span>
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-medium text-white">{product.name}</p>
                          <p className="text-gray-400 text-sm">Starting at ${product.basePrice}</p>
                        </div>
                        {selectedProduct.id === product.id && (
                          <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-xl transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Details */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Design Details</h1>
                <p className="text-gray-400">Add information about your design</p>
              </div>

              <div className="max-w-xl mx-auto space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={designTitle}
                    onChange={(e) => setDesignTitle(e.target.value)}
                    placeholder="Give your design a catchy name"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                    maxLength={100}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description (optional)
                  </label>
                  <textarea
                    value={designDescription}
                    onChange={(e) => setDesignDescription(e.target.value)}
                    placeholder="Tell the story behind your design..."
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
                    maxLength={500}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tags (press Enter to add)
                  </label>
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="Add relevant tags..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />

                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                        >
                          #{tag}
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="hover:text-white"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    disabled={!designTitle.trim()}
                    className="flex-1 py-3 bg-purple-500 hover:bg-purple-600 disabled:opacity-50 text-white font-semibold rounded-xl transition-colors"
                  >
                    Review
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Submit */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Review & Submit</h1>
                <p className="text-gray-400">Make sure everything looks good</p>
              </div>

              <div className="max-w-2xl mx-auto">
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="aspect-square bg-gray-800 rounded-xl flex items-center justify-center overflow-hidden">
                      {currentImage && (
                        <img
                          src={currentImage}
                          alt="Design preview"
                          className="max-w-[60%] max-h-[60%] object-contain"
                        />
                      )}
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{designTitle}</h3>
                      {designDescription && (
                        <p className="text-gray-400 text-sm mb-4">{designDescription}</p>
                      )}

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Product</span>
                          <span className="text-white">{selectedProduct.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Method</span>
                          <span className="text-white">{designMethod === 'ai' ? 'AI Generated' : 'Uploaded'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Your Royalty</span>
                          <span className="text-purple-400 font-semibold">~$3.50/sale</span>
                        </div>
                      </div>

                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-white/5 text-gray-400 rounded text-xs"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6">
                  <div className="flex gap-3">
                    <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-sm">
                      <p className="text-amber-300 font-medium mb-1">Review Process</p>
                      <p className="text-amber-200/70">
                        Your design will be reviewed within 24-48 hours. We check for quality,
                        originality, and compliance with our guidelines.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 py-3 bg-purple-500 hover:bg-purple-600 disabled:opacity-50 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Design
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
