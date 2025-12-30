import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getSubtotal,
    getItemCount,
  } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-gray-900 border-l border-gray-800 z-50 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white">
                Your Cart ({getItemCount()})
              </h2>
              <button
                onClick={closeCart}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4 opacity-50">-</div>
                  <p className="text-gray-400 mb-6">Your cart is empty</p>
                  <button
                    onClick={closeCart}
                    className="btn-secondary"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      className="flex gap-4 pb-6 border-b border-gray-800"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                    >
                      {/* Image */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-2xl opacity-30">T</span>
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium truncate">
                          {item.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {item.variantTitle}
                        </p>
                        <p className="text-purple-400 font-medium mt-1">
                          ${item.price.toFixed(2)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 rounded border border-gray-700 text-gray-400 hover:text-white hover:border-purple-500 transition-colors text-sm"
                          >
                            -
                          </button>
                          <span className="text-white w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded border border-gray-700 text-gray-400 hover:text-white hover:border-purple-500 transition-colors text-sm"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto text-gray-400 hover:text-red-400 transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-gray-800 space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-xl font-bold text-white">
                    ${getSubtotal().toFixed(2)}
                  </span>
                </div>
                <p className="text-gray-500 text-sm">
                  Shipping calculated at checkout
                </p>

                {/* Checkout Button */}
                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="block w-full btn-primary py-4 text-center font-semibold"
                >
                  Proceed to Checkout
                </Link>

                {/* Continue Shopping */}
                <button
                  onClick={closeCart}
                  className="w-full py-3 text-gray-400 hover:text-white transition-colors text-center"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
