import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedBackground from '../components/AnimatedBackground';
import Footer from '../components/Footer';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { getProductById, fetchProduct, products, loading: productsLoading } = useProducts();
  const { addItem, openCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  // Fetch product details
  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError(null);

      // First try to get from cached products
      let productData = getProductById(id);

      if (!productData && !productsLoading) {
        // If not in cache, fetch directly
        try {
          productData = await fetchProduct(id);
        } catch (err) {
          setError('Product not found');
          setLoading(false);
          return;
        }
      }

      if (productData) {
        setProduct(productData);
        // Set default variant
        if (productData.variants && productData.variants.length > 0) {
          const defaultVariant = productData.variants.find(v => v.isDefault) || productData.variants[0];
          setSelectedVariant(defaultVariant);
        }
      }

      setLoading(false);
    };

    loadProduct();
  }, [id, getProductById, fetchProduct, products, productsLoading]);

  // Handle add to cart
  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    addItem(product, selectedVariant, quantity);
    setAddedToCart(true);

    // Reset "added" state after 2 seconds
    setTimeout(() => setAddedToCart(false), 2000);
  };

  // Handle buy now
  const handleBuyNow = () => {
    handleAddToCart();
    openCart();
  };

  // Get images for current variant
  const getVariantImages = () => {
    if (!product || !product.images) return [];

    if (selectedVariant) {
      // Filter images that include this variant, or show all if none match
      const variantImages = product.images.filter(img =>
        img.variantIds && img.variantIds.includes(selectedVariant.id)
      );
      if (variantImages.length > 0) return variantImages;
    }

    return product.images;
  };

  const currentImages = getVariantImages();

  if (loading || productsLoading) {
    return (
      <div className="relative min-h-screen">
        <AnimatedBackground />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
            <p className="text-gray-400 mt-4">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="relative min-h-screen">
        <AnimatedBackground />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-6xl mb-4">!</div>
            <h2 className="text-2xl font-bold text-white mb-4">Product Not Found</h2>
            <p className="text-gray-400 mb-6">{error || "The product you're looking for doesn't exist."}</p>
            <Link to="/shop" className="btn-primary">
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />

      {/* Breadcrumb */}
      <section className="pt-24 pb-8">
        <div className="container mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-white transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-purple-400">{product.title}</span>
          </nav>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <motion.div
                className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/30 to-cyan-900/30"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {currentImages.length > 0 ? (
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selectedImage}
                      src={currentImages[selectedImage]?.src}
                      alt={product.title}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </AnimatePresence>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-8xl opacity-30">T</span>
                  </div>
                )}
              </motion.div>

              {/* Thumbnail Gallery */}
              {currentImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {currentImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? 'border-purple-500'
                          : 'border-transparent hover:border-purple-500/50'
                      }`}
                    >
                      <img
                        src={img.src}
                        alt={`${product.title} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Badges */}
              <div className="flex gap-2">
                {product.isNew && (
                  <span className="px-3 py-1 text-xs font-semibold bg-green-500 text-white rounded-full">
                    NEW
                  </span>
                )}
                {product.isFeatured && (
                  <span className="px-3 py-1 text-xs font-semibold bg-purple-500 text-white rounded-full">
                    FEATURED
                  </span>
                )}
              </div>

              {/* Title & Category */}
              <div>
                <span className="text-sm text-purple-400 uppercase tracking-wider">
                  {product.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">
                  {product.title}
                </h1>
              </div>

              {/* Price */}
              <div className="text-3xl font-bold gradient-text">
                {product.priceRange ? (
                  <>${product.priceRange.min.toFixed(2)} - ${product.priceRange.max.toFixed(2)}</>
                ) : (
                  <>${selectedVariant?.price.toFixed(2) || product.price.toFixed(2)}</>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <div
                  className="text-gray-400 prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              )}

              {/* Variant Selector */}
              {product.variants && product.variants.length > 1 && (
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-300">
                    Select Option
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => {
                          setSelectedVariant(variant);
                          setSelectedImage(0); // Reset to first image of variant
                        }}
                        className={`px-4 py-2 rounded-lg border transition-all ${
                          selectedVariant?.id === variant.id
                            ? 'border-purple-500 bg-purple-500/20 text-white'
                            : 'border-gray-700 text-gray-400 hover:border-purple-500/50'
                        }`}
                      >
                        {variant.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-300">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-700 text-white hover:border-purple-500 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-white font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-10 h-10 rounded-lg border border-gray-700 text-white hover:border-purple-500 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <motion.button
                  onClick={handleAddToCart}
                  className={`flex-1 py-4 rounded-lg font-semibold transition-all ${
                    addedToCart
                      ? 'bg-green-500 text-white'
                      : 'btn-secondary'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!selectedVariant}
                >
                  {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
                </motion.button>
                <motion.button
                  onClick={handleBuyNow}
                  className="flex-1 btn-primary py-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!selectedVariant}
                >
                  Buy Now
                </motion.button>
              </div>

              {/* Product Details */}
              <div className="pt-6 border-t border-gray-800 space-y-4">
                <h3 className="font-semibold text-white">Product Details</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>* Print-on-demand production</li>
                  <li>* High-quality printing</li>
                  <li>* Ships within 2-5 business days</li>
                  <li>* 30-day return policy</li>
                </ul>
              </div>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="pt-4">
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs bg-gray-800 text-gray-400 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
