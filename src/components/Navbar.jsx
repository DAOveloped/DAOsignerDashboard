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
              style={{ color: "var(--button-background)", backgroundColor: "var(--button-text)" }}
            >
              Select Theme
            </button>
            {showThemes && (
              <div className="absolute z-10 top-10 right-0 bg-white border border-gray-300 rounded-md shadow-lg">
                <button
                  className="block w-full py-2 text-left px-4 hover:bg-gray-200"
                  style={{ backgroundColor: '#ECF4D6', color: '#265073' }}
                  onClick={() => selectTheme('original')}
                >
                  Original
                </button>
                <button
                  className="block w-full py-2 text-left px-4 hover:bg-gray-200"
                  style={{ backgroundColor: '#ffef96', color: '#0d8f4e' }}
                  onClick={() => selectTheme('lemonade')}
                >
                  Lemonade
                </button>
                <button
                  className="block w-full py-2 text-left px-4 hover:bg-gray-200"
                  style={{ backgroundColor: '#EEF5FF', color: '#70a1ff' }}
                  onClick={() => selectTheme('calm')}
                >
                  Calm
                </button>
                <button
                  className="block w-full py-2 text-left px-4 hover:bg-gray-200"
                  style={{
                    backgroundColor: '#a4e2c6',
                    color: '#70a1ff',
                  }}
                  onClick={() => selectTheme('summer')}
                >
                  Summer
                </button>
                <button
                  className="block w-full py-2 text-left px-4 hover:bg-gray-200"
                  style={{
                    backgroundColor: '#f0f5ff',
                    color: '#e0ecff',
                  }}
                  onClick={() => selectTheme('winter')}
                >
                  Winter
                </button>
                <button
                  className="block w-full py-2 text-left px-4 hover:bg-gray-200"
                  style={{
                    backgroundColor: 'linear-gradient(260deg, #023E8A, #0077B6)',
                    color: '#DBF9FF',
                  }}
                  onClick={() => selectTheme('ocean-city')}
                >
                  Ocean City
                </button>
                <button
                  className="block w-full py-2 text-left px-4 hover:bg-gray-200"
                  style={{
                    backgroundColor: 'linear-gradient(259deg, #e4ddd0, #887c68, #8d8479)',
                    color: '#8d8479',
                  }}
                  onClick={() => selectTheme('coffee')}
                >
                  Coffee
                </button>
                <button
                  className="block w-full py-2 text-left px-4 hover:bg-gray-200"
                  style={{
                    backgroundColor: 'linear-gradient(260deg, #0A043C, #243B55)',
                    color: '#FFB400',
                  }}
                  onClick={() => selectTheme('styling')}
                >
                  Styling
                </button>
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

            <NavLink className="mr-10" to="/" activeClassName="active-link">
              <span style={{ color: 'var(--nav1)' }}>Home</span>
            </NavLink>
            <NavLink className="mr-10" to="/about" activeClassName="active-link">
              <span style={{ color: 'var(--nav2)' }}>Blockchain Regulation Matrix</span>
            </NavLink>
            <NavLink className="mr-10" to="/contact" activeClassName="active-link">
              <span style={{ color: 'var(--nav3)' }}>Reducing Bureaucratic Friction</span>
            </NavLink>
            <NavLink className="mr-10" to="/contribute" activeClassName="active-link">
              <span style={{ color: 'var(--nav4)' }}>Join and Contribute</span>
            </NavLink>
            <NavLink className="mr-10" to="/futureTopics" activeClassName="active-link">
              <span style={{ color: 'var(--nav5)' }}>Future Topics</span>
            </NavLink>
            <NavLink className="mr-10" to="/matrix" activeClassName="active-link">
              <span style={{ color: 'var(--nav5)' }}>Matrix</span>
            </NavLink>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
