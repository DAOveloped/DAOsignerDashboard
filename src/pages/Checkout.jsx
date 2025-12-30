import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedBackground from '../components/AnimatedBackground';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { createOrder, calculateShipping } from '../utils/printify';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getSubtotal, clearCart, getLineItemsForOrder } = useCart();

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Confirmation
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shippingCost, setShippingCost] = useState(null);
  const [orderId, setOrderId] = useState(null);

  // Form state
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  // Calculate shipping when shipping info is complete
  const handleCalculateShipping = async () => {
    if (!shippingInfo.address1 || !shippingInfo.city || !shippingInfo.zip || !shippingInfo.country) {
      setError('Please fill in all required shipping fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const lineItems = getLineItemsForOrder();
      const addressTo = {
        first_name: shippingInfo.firstName,
        last_name: shippingInfo.lastName,
        email: shippingInfo.email,
        phone: shippingInfo.phone,
        address1: shippingInfo.address1,
        address2: shippingInfo.address2,
        city: shippingInfo.city,
        region: shippingInfo.state,
        zip: shippingInfo.zip,
        country: shippingInfo.country,
      };

      const shippingResult = await calculateShipping(lineItems, addressTo);
      setShippingCost(shippingResult.standard / 100); // Convert cents to dollars
      setStep(2);
    } catch (err) {
      console.error('Shipping calculation failed:', err);
      // For demo purposes, set a default shipping if API fails
      setShippingCost(5.99);
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  // Submit order
  const handleSubmitOrder = async () => {
    setLoading(true);
    setError(null);

    try {
      const lineItems = getLineItemsForOrder();

      const orderData = {
        external_id: `dao-${Date.now()}`,
        label: `Order ${Date.now()}`,
        line_items: lineItems,
        shipping_method: 1, // Standard shipping
        send_shipping_notification: true,
        address_to: {
          first_name: shippingInfo.firstName,
          last_name: shippingInfo.lastName,
          email: shippingInfo.email,
          phone: shippingInfo.phone,
          address1: shippingInfo.address1,
          address2: shippingInfo.address2,
          city: shippingInfo.city,
          region: shippingInfo.state,
          zip: shippingInfo.zip,
          country: shippingInfo.country,
        },
      };

      const order = await createOrder(orderData);
      setOrderId(order.id);
      clearCart();
      setStep(3);
    } catch (err) {
      console.error('Order submission failed:', err);
      setError('Failed to submit order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const subtotal = getSubtotal();
  const total = subtotal + (shippingCost || 0);

  if (items.length === 0 && step !== 3) {
    return (
      <div className="relative min-h-screen">
        <AnimatedBackground />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-6xl mb-4">-</div>
            <h2 className="text-2xl font-bold text-white mb-4">Your Cart is Empty</h2>
            <p className="text-gray-400 mb-6">Add some products to your cart to checkout.</p>
            <Link to="/shop" className="btn-primary">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />

      {/* Header */}
      <section className="pt-24 pb-8">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
            Checkout
          </h1>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    s <= step
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-800 text-gray-500'
                  }`}
                >
                  {s === 3 && step === 3 ? '!' : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-16 h-0.5 mx-2 ${
                      s < step ? 'bg-purple-500' : 'bg-gray-800'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-8 mt-2 text-sm text-gray-400">
            <span className={step >= 1 ? 'text-purple-400' : ''}>Shipping</span>
            <span className={step >= 2 ? 'text-purple-400' : ''}>Payment</span>
            <span className={step >= 3 ? 'text-purple-400' : ''}>Confirmation</span>
          </div>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {error && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
                  {error}
                </div>
              )}

              {/* Step 1: Shipping */}
              {step === 1 && (
                <motion.div
                  className="card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-xl font-bold text-white mb-6">
                    Shipping Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={shippingInfo.firstName}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={shippingInfo.lastName}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={shippingInfo.email}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm text-gray-400 mb-2">Address Line 1 *</label>
                      <input
                        type="text"
                        name="address1"
                        value={shippingInfo.address1}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm text-gray-400 mb-2">Address Line 2</label>
                      <input
                        type="text"
                        name="address2"
                        value={shippingInfo.address2}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">State/Province *</label>
                      <input
                        type="text"
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">ZIP/Postal Code *</label>
                      <input
                        type="text"
                        name="zip"
                        value={shippingInfo.zip}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Country *</label>
                      <select
                        name="country"
                        value={shippingInfo.country}
                        onChange={handleInputChange}
                        className="form-input"
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="DE">Germany</option>
                        <option value="FR">France</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={handleCalculateShipping}
                    disabled={loading}
                    className="w-full btn-primary py-4 mt-6"
                  >
                    {loading ? 'Calculating Shipping...' : 'Continue to Payment'}
                  </button>
                </motion.div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <motion.div
                  className="card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-xl font-bold text-white mb-6">
                    Payment Information
                  </h2>

                  <div className="p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg mb-6">
                    <p className="text-yellow-400 text-sm">
                      <strong>Demo Mode:</strong> This is a demonstration. In production,
                      integrate with Stripe or another payment processor here.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Card Number</label>
                      <input
                        type="text"
                        placeholder="4242 4242 4242 4242"
                        className="form-input"
                        disabled
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="form-input"
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">CVC</label>
                        <input
                          type="text"
                          placeholder="123"
                          className="form-input"
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 btn-secondary py-4"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmitOrder}
                      disabled={loading}
                      className="flex-1 btn-primary py-4"
                    >
                      {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Confirmation */}
              {step === 3 && (
                <motion.div
                  className="card text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="text-6xl mb-4">!</div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Order Confirmed!
                  </h2>
                  <p className="text-gray-400 mb-6">
                    Thank you for your order. You will receive a confirmation email shortly.
                    {orderId && (
                      <span className="block mt-2 text-purple-400">
                        Order ID: {orderId}
                      </span>
                    )}
                  </p>
                  <Link to="/shop" className="btn-primary">
                    Continue Shopping
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Order Summary */}
            {step !== 3 && (
              <div className="lg:col-span-1">
                <div className="card sticky top-24">
                  <h2 className="text-xl font-bold text-white mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-xl opacity-30">T</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white text-sm font-medium truncate">
                            {item.title}
                          </h3>
                          <p className="text-gray-400 text-xs">{item.variantTitle}</p>
                          <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-white font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-800 pt-4 space-y-3">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Shipping</span>
                      <span>
                        {shippingCost !== null ? `$${shippingCost.toFixed(2)}` : 'Calculated next'}
                      </span>
                    </div>
                    <div className="flex justify-between text-white font-bold text-lg pt-3 border-t border-gray-800">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
