import { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import '../App.css';

export default function Navbar() {
  const [showThemes, setShowThemes] = useState(false); 

  const toggleThemes = () => {
    setShowThemes(!showThemes); 
  };

  const selectTheme = (selectedTheme) => {
    document.documentElement.setAttribute('data-theme', selectedTheme);
    setShowThemes(false); 
  };


    const handleClickOutside = (event) => {
      const toggleButtonElement = document.querySelector('.relative');
      if (!toggleButtonElement.contains(event.target)) {
        setShowThemes(false);
      }
    };
  

    useEffect(() => {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }, []);
  
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
                  className="block w-full py-2 text-left px-4 original-button-hover"
                  style={{ color: '#067288' }}
                  onClick={() => selectTheme('original')}
                >
                  Original
                </button>
                <button
                  className="block w-full py-2 text-left px-4 mountain-dew-button-hover"
                  style={{ color: '#336633' }}
                  onClick={() => selectTheme('mountain-dew')}
                >
                  Mountain Dew
                </button>
                <button
                  className="block w-full py-2 text-left px-4 lemonade-button-hover"
                  style={{color: '#0c6d2c' }}
                  onClick={() => selectTheme('lemonade')}
                >
                  Lemonade
                </button>
                <button
                  className="block w-full py-2 text-left px-4 defi-degen-button-hover"
                  style={{ color: '#7FFF00' }}
                  onClick={() => selectTheme('sprinkles')}
                >
                  Sprinkles
                </button>
                <button
                  className="block w-full py-2 text-left px-4 breezy-button-hover"
                  style={{ color: '#317988' }}
                  onClick={() => selectTheme('breezy')}
                >
                  Breezy
                </button>
                <button
                  className="block w-full py-2 text-left px-4 summer-button-hover"
                  style={{
                    color: '#70a1ff',
                  }}
                  onClick={() => selectTheme('summer')}
                >
                  Summer
                </button>
                <button
                  className="block w-full py-2 text-left px-4 ocean-city-button-hover"
                  style={{ color: '#90D1F9' }}
                  onClick={() => selectTheme('ocean-city')}
                >
                  Ocean City
                </button>

                <button
                  className="block w-full py-2 text-left px-4 styling-button-hover"
                  style={{
                    color: '#466cdd',
                  }}
                  onClick={() => selectTheme('styling')}
                >
                  Styling
                </button>
                <button
                  className="block w-full py-2 text-left px-4 coffee-button-hover"
                  style={{
                    color: '#7a5f56',
                  }}
                  onClick={() => selectTheme('coffee')}
                >
                  Coffee
                </button>
                <button
                  className="block w-full py-2 text-left px-4 halloween-button-hover"
                  style={{ color: '#FFB166'}}
                  onClick={() => selectTheme('halloween')}
                >
                  Halloween
                </button>

                <button
                  className="block w-full py-2 text-left px-4 moonlit-button-hover"
                  style={{ color: '#99FFFF'}}
                  onClick={() => selectTheme('moonlit')}
                >
                  Moonlit
                </button>
                <button
                  className="block w-full py-2 text-left px-4 street-light-button-hover"
                  style={{ color: '#def5b9'}}
                  onClick={() => selectTheme('street-light')}
                >
                  Street Light
                </button>
                <button
                  className="block w-full py-2 text-left px-4 neon-night-button-hover"
                  style={{ color: '#00FF00'}}
                  onClick={() => selectTheme('neon-night')}
                >
                  Neon Night
                </button>
                <button
                  className="block w-full py-2 text-left px-4 neon-night-button-hover"
                  style={{ color: '#00FF00'}}
                  onClick={() => selectTheme('cyberpunk')}
                >
                  Cyberpunk
                </button>
                <button
                  className="block w-full py-2 text-left px-4 mountain-dew-button-hover"
                  style={{ color: '#336633' }}
                  onClick={() => selectTheme('mountain-dew')}
                >
                  Mountain Dew
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
              <span style={{ color: 'var(--nav3)' }}>Bureaucratic Friction</span>
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
            <NavLink className="mr-10" to="/hover" activeClassName="active-link">
              <span style={{ color: 'var(--nav5)' }}>Hover</span>
            </NavLink>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <style>
        {`
          .original-button-hover:hover {
            background-color: #f1faee;
          }
          .winter-button-hover:hover {
            background: linear-gradient(260deg, #f0f5ff, #afc9ff, #e0ecff);
            color: #067288;
          }
          .lemonade-button-hover:hover {
            background: linear-gradient(264deg, #f3e598, #f5f5dc, #fff8dc);
            color: #f0e68c;
          }
          .breezy-button-hover:hover {
            background: linear-gradient(259deg, #EEF5FF, #9EB8D9, #7C93C3);
          }
          .summer-button-hover:hover {
            background: linear-gradient(264deg, #effad3, #70a1ff, #a4e2c6);
          }
          .coffee-button-hover:hover {
            background: linear-gradient(260deg, #54442b, #141204, #262a10);
          }
          .ocean-city-button-hover:hover {
            background: linear-gradient(260deg, #023E8A, #0077B6);

          }
          .halloween-button-hover:hover {
            background: linear-gradient(260deg, #000000, #3D0842);
          }
          .moonlit-button-hover:hover {
            background: linear-gradient(260deg, #000033, #191970);
          }
          .street-light-button-hover:hover {
            background: linear-gradient(260deg, #333333, #000000);
          }
          .neon-night-button-hover:hover {
            background: linear-gradient(260deg, #000000, #0D0D0D);
          }
          .styling-button-hover:hover {
            background: linear-gradient(260deg, #0A043C, #243B55);
          }
        `}
      </style>
    </div>
  );
}
