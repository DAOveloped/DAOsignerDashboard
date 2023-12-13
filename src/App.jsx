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
import BlockchainMatrix from "./pages/BlockchainMatrix";
import Contribute from "./pages/Contribute";
import Matrix from "./pages/Matrix";
import Treasury from "./pages/Treasury";

function App() {
  const router = createHashRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="blockchainmatrix" element={<BlockchainMatrix />} />
        <Route path="contribute" element={<Contribute />} />
        <Route path="matrix" element={<Matrix />} />
        <Route path="treasury" element={<Treasury />} />
      </Route>
    )
  );

  return (
    <RouterProvider router={router}>
      <header>
        <nav>
          <h1>Crypto Policy DAO</h1>
          <div>
            <NavLink to="/">Home</NavLink>
          </div>
        </nav>
      </header>
    </RouterProvider>
  );
}

export default App;
