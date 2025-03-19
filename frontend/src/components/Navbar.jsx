import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

function Navbar({ hideButtons = false }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const capitalize = (name) =>
    typeof name === 'string' && name
      ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
      : 'Guest';

  return (
    <nav className="h-16 fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-pink-500 to-rose-700 shadow-lg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
        <h1
          onClick={() => navigate('/')}
          className="text-3xl font-bold cursor-pointer tracking-wide text-white drop-shadow-md"
        >
          Skin<span className="text-yellow-300">Kart</span>
        </h1>
        
        <div className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => navigate('/')}
            className="text-lg font-semibold cursor-pointer hover:text-yellow-300 transition"
          >
            Home
          </button>
          {!hideButtons && (
            <button
              onClick={() => navigate('/products')}
              className="text-lg font-semibold cursor-pointer hover:text-rose-300 transition"
            >
              Add Product
            </button>
          )}
          <div className="text-lg font-medium text-gray-300">
            Hello,{' '}
            <span className="text-yellow-300">
              {user ? capitalize(user.name) : 'Guest'} 😊
            </span>
          </div>
          {!hideButtons && user && (
            <button onClick={() => navigate('/cart')}>
              <img
                width="32"
                height="32"
                className="invert cursor-pointer hover:opacity-75 transition"
                src="https://img.icons8.com/fluency-systems-regular/48/fast-cart.png"
                alt="shopping-cart"
              />
            </button>
          )}
          <div className="relative">
            <img
              src="https://img.icons8.com/fluency-systems-regular/48/user--v1.png"
              alt="user"
              className={`w-10 h-10 ${user ? 'bg-pink-500' : 'bg-rose-400'} rounded-full p-1 cursor-pointer hover:opacity-75 transition`}
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-black/80 border border-rose-500 rounded-md shadow-lg backdrop-blur-md">
                {user ? (
                  <>
                    <button
                      onClick={() => navigate('/profile')}
                      className="block w-full px-4 py-2 text-left text-gray-300 hover:bg-rose-700"
                    >
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-red-400 hover:bg-rose-700"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => navigate('/signup')}
                      className="block w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700"
                    >
                      Signup
                    </button>
                    <button
                      onClick={() => navigate('/login')}
                      className="block w-full px-4 py-2 text-left text-gray-300 hover:bg-rose-700"
                    >
                      Login
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gray-800 absolute top-16 left-0 w-full py-4 shadow-lg">
          <div className="flex flex-col space-y-4 items-center">
            <button
              onClick={() => navigate('/')}
              className="text-lg font-semibold text-white hover:text-yellow-300 transition"
            >
              Home
            </button>
            {!hideButtons && (
              <button
                onClick={() => navigate('/products')}
                className="text-lg font-semibold text-white hover:text-yellow-300 transition"
              >
                Add Product
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;