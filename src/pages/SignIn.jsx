import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";
import { useAuth } from "../context/AuthContext";

export default function SignIn() {
  const { signInWithGoogle, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionType, setConnectionType] = useState(null); // 'google' | 'wallet'
  const [error, setError] = useState(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, loading, navigate]);

  // Handle Google sign-in with Supabase
  const handleGoogleSignIn = async () => {
    setIsConnecting(true);
    setConnectionType("google");
    setError(null);

    try {
      await signInWithGoogle();
      // Supabase will redirect to the callback URL, then to dashboard
    } catch (err) {
      console.error('Google sign-in error:', err);
      setError(err.message || "Failed to sign in with Google. Please try again.");
      setIsConnecting(false);
      setConnectionType(null);
    }
  };

  // TODO: Implement inDemniFi wallet connection
  const handleWalletConnect = async () => {
    setIsConnecting(true);
    setConnectionType("wallet");
    setError(null);

    try {
      // TODO: Implement inDemniFi wallet connection
      // Reference: https://indemnifi.me
      console.log("inDemniFi wallet connect clicked - to be implemented");

      // Simulate loading for demo
      await new Promise(resolve => setTimeout(resolve, 1500));

      setError("Wallet connection coming soon!");
    } catch (err) {
      setError("Wallet connection not yet implemented");
    } finally {
      setIsConnecting(false);
      setConnectionType(null);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <AnimatedBackground />

      <div className="relative z-10 w-full max-w-md mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          {/* Logo */}
          <Link to="/" className="inline-block mb-8">
            <img
              src="/images/logo.png"
              alt="DAOsigner"
              className="h-16 w-auto mx-auto"
            />
          </Link>

          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-400">
            Sign in to access your designer dashboard
          </p>
        </motion.div>

        {/* Sign In Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4"
        >
          {/* inDemniFi Wallet Button */}
          <button
            onClick={handleWalletConnect}
            disabled={isConnecting}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold text-white hover:from-purple-500 hover:to-cyan-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConnecting && connectionType === "wallet" ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Connecting...
              </>
            ) : (
              <>
                {/* Wallet Icon */}
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
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                Connect with inDemniFi Wallet
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative flex items-center gap-4 py-2">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="text-gray-500 text-sm">or</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isConnecting}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white/5 border border-white/10 rounded-xl font-semibold text-white hover:bg-white/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConnecting && connectionType === "google" ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Signing in...
              </>
            ) : (
              <>
                {/* Google Icon */}
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </>
            )}
          </button>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center"
          >
            {error}
          </motion.div>
        )}

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl"
        >
          <h3 className="text-purple-400 font-semibold mb-2 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Why inDemniFi Wallet?
          </h3>
          <p className="text-gray-400 text-sm">
            We use{" "}
            <a
              href="https://indemnifi.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 underline"
            >
              inDemniFi
            </a>{" "}
            for secure Web3 authentication and wallet management. Your royalty payments
            are sent directly to your connected wallet on Base L2.
          </p>
        </motion.div>

        {/* Designer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-500 text-sm">
            Want to become a designer?{" "}
            <Link to="/about" className="text-purple-400 hover:text-purple-300">
              Learn more
            </Link>
          </p>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <Link
            to="/"
            className="text-gray-500 hover:text-gray-300 text-sm flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
