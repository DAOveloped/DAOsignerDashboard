import "./App.css";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Designers from "./pages/Designers";
import SignIn from "./pages/SignIn";
import {
  createHashRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  const router = createHashRouter(
    createRoutesFromElements(
      <>
        {/* Main layout with Navbar */}
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="designers" element={<Designers />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        {/* Standalone pages without Navbar */}
        <Route path="signin" element={<SignIn />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
