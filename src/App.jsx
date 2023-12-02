import './App.css'
import Home from './pages/Home'
import { createHashRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { NavLink } from "react-router-dom"
import Navbar from './components/NavBar'
import BlockchainMatrix from './pages/BlockchainMatrix'
import Contribute from './pages/Contribute'
import Hover from './pages/Hover'
import ButtonRow from './pages/ButtonRow'
import Row from './pages/Row'

function App() {
  const router = createHashRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="blockchainmatrix" element={<BlockchainMatrix />} />
        <Route path="contribute" element={<Contribute />} />
        <Route path="hover" element={<Hover />} />
        <Route path="buttonrow" element={<ButtonRow />} />
        <Route path="row" element={<Row />} />
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
          </div>
        </nav>
      </header>
    </RouterProvider>
  );
}

export default App;

