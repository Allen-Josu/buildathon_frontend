import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { useUserStore } from '../../store/userStore';
import ToastNotification from '../../modals/Toast';

const BASE_URL = import.meta.env.VITE_URL;

function Login() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ studentId: '', password: '' });
  const [serverError, setServerError] = useState('');
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const validateForm = () => {
    const newErrors = { studentId: '', password: '' };
    let isValid = true;

    // Student ID validation
    if (!studentId.trim()) {
      newErrors.studentId = 'Student ID is required';
      isValid = false;
    } else if (!/^\d{8}$/.test(studentId)) {
      newErrors.studentId = 'Student ID must be exactly 8 digits';
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    } else if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
      newErrors.password = 'Password must contain letters and numbers';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/users/login?role=user`, { studentId, password });
      setUser(response.data.results);
      setToastMessage('Login successful!');
      setToastOpen(true);
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setServerError(
        err.response?.data?.message ||
        'Login failed. Please check your credentials and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-zinc-800 flex justify-center items-center p-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-center text-2xl font-bold text-violet-700 pb-6">
            Login
          </h2>
          {serverError && (
            <div className="bg-red-100 text-red-700 text-sm rounded-lg p-3 mb-4">
              {serverError}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="studentId" className="block text-gray-700 font-medium mb-2">
                Student ID
              </label>
              <input
                type="text"
                autoComplete="off"
                className={`w-full px-4 py-2 bg-gray-50 border-2 border-violet-700 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                  errors.studentId ? 'border-red-500' : ''
                }`}
                id="studentId"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
              {errors.studentId && (
                <p className="text-red-500 text-sm mt-1">{errors.studentId}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                autoComplete="current-password"
                className={`w-full px-4 py-2 bg-gray-50 border-2 border-violet-700 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                  errors.password ? 'border-red-500' : ''
                }`}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-violet-700 text-white font-bold text-base py-3 rounded-lg hover:bg-violet-800 transition-all duration-300 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div className="mt-6 text-center text-sm">
            <p>
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="text-violet-700 font-bold hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
      <ToastNotification open={toastOpen} setOpen={setToastOpen} message={toastMessage} />
    </div>
  );
}

export default Login;