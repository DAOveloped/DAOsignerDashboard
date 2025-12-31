import { useRef, useEffect, useState } from 'react'

// Product template configurations
// These define where the design should be placed on each product type
const productConfigs = {
  tshirt: {
    name: 'T-Shirt',
    // Print area as percentage of template dimensions
    printArea: { x: 25, y: 20, width: 50, height: 45 },
    colors: {
      black: '#1a1a2e',
      white: '#f5f5f5',
      gray: '#4a5568',
      navy: '#1e3a5f',
    }
  },
  hoodie: {
    name: 'Hoodie',
    printArea: { x: 28, y: 28, width: 44, height: 38 },
    colors: {
      black: '#1a1a2e',
      white: '#f5f5f5',
      gray: '#4a5568',
      navy: '#1e3a5f',
    }
  },
  longsleeve: {
    name: 'Long Sleeve',
    printArea: { x: 25, y: 22, width: 50, height: 42 },
    colors: {
      black: '#1a1a2e',
      white: '#f5f5f5',
      gray: '#4a5568',
    }
  },
}

/**
 * ProductMockup Component
 * Renders a design on a product template with customizable position, scale, and rotation
 */
export default function ProductMockup({
  designImage,
  productType = 'tshirt',
  productColor = 'black',
  designScale = 75,
  designPosition = 'center', // 'top', 'center', 'bottom'
  designRotation = 0,
  className = '',
  onMockupGenerated = null, // Callback with data URL of generated mockup
}) {
  const canvasRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mockupDataUrl, setMockupDataUrl] = useState(null)

  const config = productConfigs[productType] || productConfigs.tshirt
  const bgColor = config.colors[productColor] || config.colors.black

  useEffect(() => {
    if (!designImage) {
      setIsLoading(false)
      return
    }

    generateMockup()
  }, [designImage, productType, productColor, designScale, designPosition, designRotation])

  const generateMockup = async () => {
    setIsLoading(true)

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const size = 800 // Canvas size

    canvas.width = size
    canvas.height = size

    // Draw neutral gray background (not the product color)
    ctx.fillStyle = '#1f2937'
    ctx.fillRect(0, 0, size, size)

    // Draw product shape filled with selected color
    drawProductShape(ctx, productType, size, bgColor)

    // Load and draw the design
    try {
      const designImg = await loadImage(designImage)

      // Calculate print area
      const printArea = config.printArea
      const printX = (printArea.x / 100) * size
      const printY = (printArea.y / 100) * size
      const printWidth = (printArea.width / 100) * size
      const printHeight = (printArea.height / 100) * size

      // Calculate design dimensions maintaining aspect ratio
      const aspectRatio = designImg.width / designImg.height
      let drawWidth = printWidth * (designScale / 100)
      let drawHeight = drawWidth / aspectRatio

      if (drawHeight > printHeight * (designScale / 100)) {
        drawHeight = printHeight * (designScale / 100)
        drawWidth = drawHeight * aspectRatio
      }

      // Calculate position
      let drawX = printX + (printWidth - drawWidth) / 2
      let drawY = printY + (printHeight - drawHeight) / 2

      // Adjust for position preference
      if (designPosition === 'top') {
        drawY = printY + printHeight * 0.1
      } else if (designPosition === 'bottom') {
        drawY = printY + printHeight - drawHeight - printHeight * 0.1
      }

      // Apply rotation
      ctx.save()
      ctx.translate(drawX + drawWidth / 2, drawY + drawHeight / 2)
      ctx.rotate((designRotation * Math.PI) / 180)
      ctx.translate(-(drawX + drawWidth / 2), -(drawY + drawHeight / 2))

      // Draw the design
      ctx.drawImage(designImg, drawX, drawY, drawWidth, drawHeight)
      ctx.restore()

      // Generate data URL
      const dataUrl = canvas.toDataURL('image/png')
      setMockupDataUrl(dataUrl)

      if (onMockupGenerated) {
        onMockupGenerated(dataUrl)
      }
    } catch (error) {
      console.error('Error generating mockup:', error)
    }

    setIsLoading(false)
  }

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })
  }

  const drawProductShape = (ctx, type, size, color) => {
    const centerX = size / 2
    const padding = size * 0.08

    // Determine if color is light or dark for contrast
    const isLightColor = isColorLight(color)
    const shadowColor = isLightColor ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.3)'
    const highlightColor = isLightColor ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'
    const outlineColor = isLightColor ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.1)'

    if (type === 'tshirt') {
      // Draw filled t-shirt shape
      ctx.beginPath()
      ctx.moveTo(centerX - size * 0.08, padding + size * 0.05)
      ctx.quadraticCurveTo(centerX, padding, centerX + size * 0.08, padding + size * 0.05)
      ctx.lineTo(size - padding - size * 0.15, padding + size * 0.05)
      ctx.lineTo(size - padding, padding + size * 0.2)
      ctx.lineTo(size - padding, padding + size * 0.35)
      ctx.lineTo(size - padding - size * 0.15, padding + size * 0.3)
      ctx.lineTo(size - padding - size * 0.15, size - padding)
      ctx.lineTo(padding + size * 0.15, size - padding)
      ctx.lineTo(padding + size * 0.15, padding + size * 0.3)
      ctx.lineTo(padding, padding + size * 0.35)
      ctx.lineTo(padding, padding + size * 0.2)
      ctx.lineTo(padding + size * 0.15, padding + size * 0.05)
      ctx.closePath()
      ctx.fillStyle = color
      ctx.fill()

      // Add shadow for depth
      ctx.fillStyle = shadowColor
      ctx.beginPath()
      ctx.moveTo(size - padding - size * 0.15, padding + size * 0.3)
      ctx.lineTo(size - padding - size * 0.15, size - padding)
      ctx.lineTo(size - padding - size * 0.18, size - padding)
      ctx.lineTo(size - padding - size * 0.18, padding + size * 0.32)
      ctx.closePath()
      ctx.fill()

      // Add highlight
      ctx.fillStyle = highlightColor
      ctx.beginPath()
      ctx.moveTo(padding + size * 0.15, padding + size * 0.3)
      ctx.lineTo(padding + size * 0.15, size - padding)
      ctx.lineTo(padding + size * 0.18, size - padding)
      ctx.lineTo(padding + size * 0.18, padding + size * 0.32)
      ctx.closePath()
      ctx.fill()

      // Outline
      ctx.strokeStyle = outlineColor
      ctx.lineWidth = 2
      ctx.stroke()

    } else if (type === 'hoodie') {
      // Draw filled hoodie shape
      ctx.beginPath()
      ctx.moveTo(centerX - size * 0.15, padding + size * 0.08)
      ctx.quadraticCurveTo(centerX - size * 0.2, padding - size * 0.05, centerX, padding - size * 0.02)
      ctx.quadraticCurveTo(centerX + size * 0.2, padding - size * 0.05, centerX + size * 0.15, padding + size * 0.08)
      ctx.lineTo(size - padding - size * 0.12, padding + size * 0.1)
      ctx.lineTo(size - padding, padding + size * 0.25)
      ctx.lineTo(size - padding, padding + size * 0.45)
      ctx.lineTo(size - padding - size * 0.12, padding + size * 0.4)
      ctx.lineTo(size - padding - size * 0.12, size - padding)
      ctx.lineTo(padding + size * 0.12, size - padding)
      ctx.lineTo(padding + size * 0.12, padding + size * 0.4)
      ctx.lineTo(padding, padding + size * 0.45)
      ctx.lineTo(padding, padding + size * 0.25)
      ctx.lineTo(padding + size * 0.12, padding + size * 0.1)
      ctx.closePath()
      ctx.fillStyle = color
      ctx.fill()
      ctx.strokeStyle = outlineColor
      ctx.lineWidth = 2
      ctx.stroke()

      // Kangaroo pocket
      ctx.beginPath()
      ctx.moveTo(centerX - size * 0.18, size * 0.65)
      ctx.lineTo(centerX + size * 0.18, size * 0.65)
      ctx.quadraticCurveTo(centerX + size * 0.2, size * 0.75, centerX, size * 0.78)
      ctx.quadraticCurveTo(centerX - size * 0.2, size * 0.75, centerX - size * 0.18, size * 0.65)
      ctx.fillStyle = shadowColor
      ctx.fill()
      ctx.stroke()

      // Hood drawstrings
      ctx.strokeStyle = outlineColor
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(centerX - size * 0.03, padding + size * 0.12)
      ctx.lineTo(centerX - size * 0.03, padding + size * 0.25)
      ctx.moveTo(centerX + size * 0.03, padding + size * 0.12)
      ctx.lineTo(centerX + size * 0.03, padding + size * 0.25)
      ctx.stroke()

    } else if (type === 'longsleeve') {
      // Draw filled long sleeve shape
      ctx.beginPath()
      ctx.moveTo(centerX - size * 0.08, padding + size * 0.05)
      ctx.quadraticCurveTo(centerX, padding, centerX + size * 0.08, padding + size * 0.05)
      ctx.lineTo(size - padding - size * 0.12, padding + size * 0.05)
      ctx.lineTo(size - padding + size * 0.05, padding + size * 0.5)
      ctx.lineTo(size - padding, padding + size * 0.55)
      ctx.lineTo(size - padding - size * 0.12, padding + size * 0.45)
      ctx.lineTo(size - padding - size * 0.12, size - padding)
      ctx.lineTo(padding + size * 0.12, size - padding)
      ctx.lineTo(padding + size * 0.12, padding + size * 0.45)
      ctx.lineTo(padding, padding + size * 0.55)
      ctx.lineTo(padding - size * 0.05, padding + size * 0.5)
      ctx.lineTo(padding + size * 0.12, padding + size * 0.05)
      ctx.closePath()
      ctx.fillStyle = color
      ctx.fill()
      ctx.strokeStyle = outlineColor
      ctx.lineWidth = 2
      ctx.stroke()

    } else if (type === 'sweatshirt') {
      // Draw filled sweatshirt (similar to hoodie but no hood)
      ctx.beginPath()
      ctx.moveTo(centerX - size * 0.1, padding + size * 0.06)
      ctx.quadraticCurveTo(centerX, padding + size * 0.02, centerX + size * 0.1, padding + size * 0.06)
      ctx.lineTo(size - padding - size * 0.12, padding + size * 0.08)
      ctx.lineTo(size - padding, padding + size * 0.25)
      ctx.lineTo(size - padding, padding + size * 0.45)
      ctx.lineTo(size - padding - size * 0.12, padding + size * 0.4)
      ctx.lineTo(size - padding - size * 0.12, size - padding)
      ctx.lineTo(padding + size * 0.12, size - padding)
      ctx.lineTo(padding + size * 0.12, padding + size * 0.4)
      ctx.lineTo(padding, padding + size * 0.45)
      ctx.lineTo(padding, padding + size * 0.25)
      ctx.lineTo(padding + size * 0.12, padding + size * 0.08)
      ctx.closePath()
      ctx.fillStyle = color
      ctx.fill()
      ctx.strokeStyle = outlineColor
      ctx.lineWidth = 2
      ctx.stroke()

      // Crew neck collar
      ctx.beginPath()
      ctx.moveTo(centerX - size * 0.1, padding + size * 0.06)
      ctx.quadraticCurveTo(centerX, padding + size * 0.1, centerX + size * 0.1, padding + size * 0.06)
      ctx.strokeStyle = shadowColor
      ctx.lineWidth = 4
      ctx.stroke()
    }
  }

  // Helper to determine if a color is light
  const isColorLight = (hexColor) => {
    if (!hexColor || hexColor === 'black') return false
    if (hexColor === 'white') return true

    const hex = hexColor.replace('#', '')
    if (hex.length !== 6) return false

    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)

    // Calculate perceived brightness
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness > 128
  }

  return (
    <div className={`relative ${className}`}>
      {/* Hidden canvas for rendering */}
      <canvas
        ref={canvasRef}
        className="hidden"
      />

      {/* Display the mockup */}
      <div className="aspect-square rounded-xl overflow-hidden bg-gray-800 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {mockupDataUrl ? (
          <img
            src={mockupDataUrl}
            alt={`${config.name} mockup`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: bgColor }}
          >
            {!designImage && (
              <span className="text-gray-500 text-sm">No design</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// Export product configs for use elsewhere
export { productConfigs }
