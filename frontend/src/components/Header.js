import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/auth';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <header className="w-full bg-gray-800 border-b border-gray-700 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div>
            <Link 
              to="/" 
              className="text-2xl font-bold text-gray-100 hover:text-white transition-colors"
            >
              Countries
            </Link>
          </div>
          <nav>
            <ul className="flex space-x-4 sm:space-x-6">
              {user ? (
                <li>
                  <button
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                    onClick={onLogout}
                  >
                    <FaSignOutAlt className="text-lg" />
                    <span className="font-medium hidden sm:inline">Logout</span>
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      to="/"
                      className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                    >
                      <FaSignInAlt className="text-lg" />
                      <span className="font-medium hidden sm:inline">Login</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                    >
                      <FaUser className="text-lg" />
                      <span className="font-medium hidden sm:inline">Register</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;