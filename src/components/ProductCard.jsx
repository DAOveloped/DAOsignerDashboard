import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProductCard = ({
  id,
  title,
  price,
  image,
  category,
  isNew = false,
  isFeatured = false,
}) => {
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
              onClick={(e) => {
                e.preventDefault();
                // Add to cart logic will be added with Printify integration
                console.log('Add to cart:', id);
              }}
            >
              +
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
