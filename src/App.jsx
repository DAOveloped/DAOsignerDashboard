import "./App.css";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Designers from "./pages/Designers";
import SignIn from "./pages/SignIn";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Submit from "./pages/Submit";
import Studio from "./pages/Studio";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  createHashRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const router = createHashRouter(
    createRoutesFromElements(
      <>
        {/* Main layout with Navbar */}
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="designers" element={<Designers />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="submit" element={<Submit />} />
        </Route>
        {/* Standalone pages without Navbar */}
        <Route path="signin" element={<SignIn />} />
        {/* Protected designer pages */}
        <Route
          path="studio"
          element={
            <ProtectedRoute>
              <Studio />
            </ProtectedRoute>
          }
        />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </>
    )
  );

  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
