import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Local storage key for cart persistence
const CART_STORAGE_KEY = 'daosigner_cart';

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (err) {
      console.error('Failed to load cart from storage:', err);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error('Failed to save cart to storage:', err);
    }
  }, [items]);

  // Add item to cart
  const addItem = useCallback((product, variant, quantity = 1) => {
    setItems(currentItems => {
      // Check if this exact product + variant combination already exists
      const existingIndex = currentItems.findIndex(
        item => item.productId === product.id && item.variantId === variant.id
      );

      if (existingIndex >= 0) {
        // Update quantity of existing item
        const newItems = [...currentItems];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + quantity,
        };
        return newItems;
      }

      // Add new item
      return [...currentItems, {
        id: `${product.id}-${variant.id}-${Date.now()}`,
        productId: product.id,
        variantId: variant.id,
        title: product.title,
        variantTitle: variant.title,
        price: variant.price,
        image: product.image,
        quantity,
        blueprintId: product.blueprintId,
        printProviderId: product.printProviderId,
        sku: variant.sku,
      }];
    });
  }, []);

  // Remove item from cart
  const removeItem = useCallback((itemId) => {
    setItems(currentItems => currentItems.filter(item => item.id !== itemId));
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((itemId, quantity) => {
    if (quantity < 1) {
      removeItem(itemId);
      return;
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  }, [removeItem]);

  // Clear entire cart
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // Get total number of items
  const getItemCount = useCallback(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  // Get cart subtotal
  const getSubtotal = useCallback(() => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [items]);

  // Toggle cart drawer
  const toggleCart = useCallback(() => {
    setIsCartOpen(prev => !prev);
  }, []);

  const openCart = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  // Format items for Printify order
  const getLineItemsForOrder = useCallback(() => {
    return items.map(item => ({
      product_id: item.productId,
      variant_id: item.variantId,
      quantity: item.quantity,
    }));
  }, [items]);

  const value = {
    items,
    isCartOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemCount,
    getSubtotal,
    toggleCart,
    openCart,
    closeCart,
    getLineItemsForOrder,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
