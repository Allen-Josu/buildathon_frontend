import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_URL;

function Login() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading state
    setError(''); // Clear previous errors

    try {
      // Replace with your backend login API endpoint
console.log(studentId,password);

const response = await axios.get(`${BASE_URL}/users?entity=users`, {
  params: {
    studentId: studentId,
    password: password,
  },
});

      console.log(response.status);
      

      // Assuming the API returns a success message and token
      // const { token } = response.data;

      // Save token in localStorage or context
      // localStorage.setItem('authToken', token);

      // Redirect to the home page
      alert('Login successful!');
      navigate('/');
    } catch (err) {
      // Handle errors and set error messages
      setError(
        err.response?.data?.message ||
        'Login failed. Please check your credentials and try again.'
      );
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div
      style={{
        backgroundColor: 'black',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-4">
            <div
              className="card"
              style={{
                backgroundColor: 'white',
                color: 'black',
                borderRadius: '10px',
              }}
            >
              <div className="card-body">
                <h2 className="card-title text-center pb-4">Login</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="studentId" className="form-label">
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
                        backgroundColor: '#f1f1f1',
                        border: '1px solid #6a0dad', // Added border
                        borderRadius: '5px', // Optional: adds rounded corners
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
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
                        backgroundColor: '#f1f1f1',
                        border: '1px solid #6a0dad', // Added border
                        borderRadius: '5px', // Optional: adds rounded corners
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn w-100 mt-4"
                    style={{
                      backgroundColor: '#6a0dad',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                    disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                </form>
                <div className="mt-3 text-center">
                  <p>
                    Don't have an account? Register your account{' '}
                    <Link to="/signup" style={{ color: '#6a0dad', fontWeight: 'bold' }}>
                      here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
