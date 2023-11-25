import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function Navbar() {
  const [showThemes, setShowThemes] = useState(false); // State to manage visibility of themes

  const toggleThemes = () => {
    setShowThemes(!showThemes); // Toggle the visibility of themes
  };

  const selectTheme = (selectedTheme) => {
    document.documentElement.setAttribute('data-theme', selectedTheme);
    setShowThemes(false); // Close the theme options after selection
  };
  
  return (
    <div className="h-full">
      <header className="w-100">
        <nav className="flex justify-between p-4 items-center flex-row top-0">
          <div className="relative">
            <button
              className="px-3 py-1 mr-4 bg-gray-200 rounded-md"
              onClick={toggleThemes}
            >
              Select Theme
            </button>
            {showThemes && (
              <div className="absolute z-10 top-10 right-0 bg-white border border-gray-300 rounded-md shadow-lg">

                <button
                  className="block w-full py-2 text-left px-4 hover:bg-gray-200"
                  onClick={() => selectTheme('lemonade')}
                >
                  Lemonade
                </button>
                <button
                  className="block w-full py-2 text-left px-4 hover:bg-gray-200"
                  onClick={() => selectTheme('calm')}
                >
                  Calm
                </button>
                <button
                  className="block w-full py-2 text-left px-4 hover:bg-gray-200"
                  onClick={() => selectTheme('summer')}
                >
                  Summer
                </button>
                <button
                  className="block w-full py-2 text-left px-4 hover:bg-gray-200"
                  onClick={() => selectTheme('winter')}
                >
                  Winter
                </button>
                <button
                  className="block w-full py-2 text-left px-4 hover:bg-gray-200"
                  onClick={() => selectTheme('ocean-city')}
                >
                  Ocean City
                </button>
                <button
                  className="block w-full py-2 text-left px-4 hover:bg-gray-200"
                  onClick={() => selectTheme('coffee')}
                >
                  Coffee
                </button>
                <button
                  className="block w-full py-2 text-left px-4 hover:bg-gray-200"
                  onClick={() => selectTheme('mocha')}
                >
                  Mocha
                </button>

                <button
                  className="block w-full py-2 text-left px-4 hover:bg-gray-200"
                  onClick={() => selectTheme('styling')}
                >
                  Styling
                </button>
                {/* New themes added */}
                <button
                  className="block w-full py-2 text-left px-4 hover:bg-gray-200"
                  onClick={() => selectTheme('halloween')}
                >
                  Halloween
                </button>

                <button
                  className="block w-full py-2 text-left px-4 hover:bg-gray-200"
                  onClick={() => selectTheme('moonlit')}
                >
                  Moonlit
                </button>
                <button
                  className="block w-full py-2 text-left px-4 hover:bg-gray-200"
                  onClick={() => selectTheme('street-light')}
                >
                  Street Light
                </button>
                <button
                  className="block w-full py-2 text-left px-4 hover:bg-gray-200"
                  onClick={() => selectTheme('neon-night')}
                >
                  Neon Night
                </button>
              </div>
            )}
          </div>
          <div>
            <NavLink className="mr-5" to="/">
              Home
            </NavLink>
            <NavLink className="mr-5" to="/about">
              Blockchain Regulation Matrix
            </NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
