import "./App.css";
import Home from "./pages/Home";
import {
  createHashRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { NavLink } from "react-router-dom";
import Navbar from "./components/Navbar";
import Treasury from "./pages/Dashboard";
import Dashboard from "./pages/Dashboard";

function App() {
  const router = createHashRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="treasury" element={<Treasury />} />
      </Route>
    )
  );

  return (
    <RouterProvider router={router}>
      <header>
        <nav>
          <h1>DAOsigner Apparel</h1>
          <div>
            <NavLink to="/">Home</NavLink>
          </div>
        </nav>
      </header>
    </RouterProvider>
  );
}

export default App;
