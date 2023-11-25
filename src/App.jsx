import './App.css'
import Home from './pages/Home'
import Contact from './pages/Contact'
import { createHashRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { NavLink } from "react-router-dom"
import BlockchainMatrix from './pages/BlockchainMatrix'
import Navbar from './components/NavBar'

function App() {
  const router = createHashRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="about" element={<BlockchainMatrix />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    )
  );

  return (
    <RouterProvider router={router}>
      <header className="w-100">
        <nav className="flex justify-between p-4 items-center flex-row top-0">
          <h1 className="text-lg font-bold">Crypto Policy DAO</h1>
          <div>
            <NavLink className="mr-5" to="/">Home</NavLink>
            <NavLink className="mr-5" to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>
        </nav>
      </header>
    </RouterProvider>
  );
}

export default App;

