import { useState, useEffect } from 'react';
import { FaSignInAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/auth';
import Spinner from '../components/Spinner';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/dashboard');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-gray-800 overflow-y-auto">
      <div className="min-h-screen flex flex-col">
        {/* Optional Header - Uncomment if needed */}
        {/* <Header /> */}
        
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
            {/* Header with dark gradient */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 text-center border-b border-gray-700">
              <div className="flex justify-center mb-4">
                <FaSignInAlt className="text-gray-300 text-4xl" />
              </div>
              <h1 className="text-2xl font-bold text-gray-100">Welcome Back</h1>
              <p className="text-gray-400 mt-1">Please enter your credentials to login</p>
            </div>

            <div className="p-8">
              <form onSubmit={onSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all text-gray-100 placeholder-gray-400"
                      id="email"
                      name="email"
                      value={email}
                      onChange={onChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all text-gray-100 placeholder-gray-400 pr-12"
                      id="password"
                      name="password"
                      value={password}
                      onChange={onChange}
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <div className="flex justify-end mt-1">
                    <a href="/forgot-password" className="text-sm text-gray-400 hover:text-gray-300">
                      Forgot password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <Spinner small white />
                        <span className="ml-2">Logging in...</span>
                      </span>
                    ) : (
                      <>
                        <FaSignInAlt className="mr-2" />
                        Login
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center text-sm text-gray-400">
                  Don't have an account?{' '}
                  <a href="/register" className="font-medium text-gray-300 hover:text-white">
                    Sign up
                  </a>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Login;