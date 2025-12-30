import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getTransformedProducts, getProduct, transformProduct } from '../utils/printify';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState(['All']);

  // Fetch all products from Printify
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const transformedProducts = await getTransformedProducts();
      setProducts(transformedProducts);

      // Extract unique categories
      const uniqueCategories = ['All', ...new Set(transformedProducts.map(p => p.category))];
      setCategories(uniqueCategories);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch a single product by ID
  const fetchProduct = useCallback(async (productId) => {
    try {
      const product = await getProduct(productId);
      return transformProduct(product);
    } catch (err) {
      console.error('Failed to fetch product:', err);
      throw err;
    }
  }, []);

  // Get product by ID from cached products
  const getProductById = useCallback((productId) => {
    return products.find(p => p.id === productId);
  }, [products]);

  // Filter products by category
  const getProductsByCategory = useCallback((category) => {
    if (category === 'All') return products;
    return products.filter(p => p.category === category);
  }, [products]);

  // Search products
  const searchProducts = useCallback((query) => {
    if (!query) return products;
    const lowerQuery = query.toLowerCase();
    return products.filter(p =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery) ||
      p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }, [products]);

  // Get featured products
  const getFeaturedProducts = useCallback(() => {
    return products.filter(p => p.isFeatured);
  }, [products]);

  // Get new products
  const getNewProducts = useCallback(() => {
    return products.filter(p => p.isNew);
  }, [products]);

  // Initial fetch
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const value = {
    products,
    loading,
    error,
    categories,
    fetchProducts,
    fetchProduct,
    getProductById,
    getProductsByCategory,
    searchProducts,
    getFeaturedProducts,
    getNewProducts,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
