import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { useUserStore } from '../../store/userStore';

const BASE_URL = import.meta.env.VITE_URL;

function Login() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${BASE_URL}/users/login?role=user`, { studentId, password })
      setUser(response.data.results)
      alert('Login successful!');
      navigate("/")
    } catch (err) {
      setError(
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
      <div
        style={{
          backgroundColor: '#27272A',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
        }}
      >
        <div
          className="card shadow-lg"
          style={{
            maxWidth: '400px',
            width: '100%',
            backgroundColor: '#ffffff',
            borderRadius: '15px',
            padding: '2rem',
          }}
        >
          <h2
            className="text-center pb-4"
            style={{
              fontSize: '1.75rem',
              fontWeight: 'bold',
              color: '#6d28d9',
            }}
          >
            Login
          </h2>
          {error && (
            <div
              className="alert alert-danger"
              style={{
                fontSize: '0.875rem',
                marginBottom: '1rem',
                borderRadius: '8px',
                padding: '0.75rem',
              }}
            >
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="studentId"
                className="form-label"
                style={{ fontWeight: '500', color: '#333' }}
              >
                Student ID
              </label>
              <input
                type="text"
                autoComplete="off"
                className="form-control"
                value={studentId}
                id="studentId"
                onChange={(e) => setStudentId(e.target.value)}
                style={{
                  backgroundColor: '#f9f9f9',
                  border: '2px solid #6d28d9',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  fontSize: '1rem',
                }}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="password"
                className="form-label"
                style={{ fontWeight: '500', color: '#333' }}
              >
                Password
              </label>
              <input
                type="password"
                className="form-control"
                autoComplete="current-password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  backgroundColor: '#f9f9f9',
                  border: '2px solid #6d28d9',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  fontSize: '1rem',
                }}
              />
            </div>
            <button
              type="submit"
              className="btn w-100 mt-4"
              style={{
                backgroundColor: '#6d28d9',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '1rem',
                padding: '0.75rem',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
              }}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div
            className="mt-3 text-center"
            style={{
              fontSize: '0.9rem',
              marginTop: '1.5rem',
            }}
          >
            <p>
              Don&apos;t have an account?{' '}
              <Link
                to="/signup"
                style={{
                  color: '#6d28d9',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                }}
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
