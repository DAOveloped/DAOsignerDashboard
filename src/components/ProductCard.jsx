import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({
  id,
  title,
  price,
  image,
  category,
  isNew = false,
  isFeatured = false,
  variants = [],
  blueprintId,
  printProviderId,
}) => {
  const { addItem, openCart } = useCart();

  // Get the default variant or first available variant
  const getDefaultVariant = () => {
    if (!variants || variants.length === 0) return null;
    const defaultVariant = variants.find(v => v.isDefault);
    return defaultVariant || variants[0];
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const variant = getDefaultVariant();
    if (!variant) {
      // No variants available, navigate to product page instead
      console.log('No variants available for quick add');
      return;
    }

    // Create product object for cart
    const product = {
      id,
      title,
      image,
      blueprintId,
      printProviderId,
    };

    addItem(product, variant, 1);
    openCart();
  };

  return (
    <motion.div
      className="product-card"
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link to={`/product/${id}`}>
        {/* Image Container */}
        <div className="product-image">
          {/* Badges */}
          <div className="absolute top-3 left-3 z-10 flex gap-2">
            {isNew && (
              <span className="px-3 py-1 text-xs font-semibold bg-green-500 text-white rounded-full">
                NEW
              </span>
            )}
            {isFeatured && (
              <span className="px-3 py-1 text-xs font-semibold bg-purple-500 text-white rounded-full">
                FEATURED
              </span>
            )}
          </div>

          {/* Quick View Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="btn-primary text-sm py-2 px-4">
              Quick View
            </span>
          </motion.div>

          {/* Product Image */}
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/30 to-cyan-900/30">
              <span className="text-6xl opacity-30">T</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="product-info">
          {category && (
            <span className="text-xs text-purple-400 uppercase tracking-wider mb-1 block">
              {category}
            </span>
          )}
          <h3 className="product-title line-clamp-2">{title}</h3>
          <div className="flex items-center justify-between mt-3">
            <span className="product-price">
              ${typeof price === 'number' ? price.toFixed(2) : price}
            </span>
            <motion.button
              className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 hover:bg-purple-500 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleQuickAdd}
              title={variants.length > 0 ? "Add to cart" : "View product"}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
