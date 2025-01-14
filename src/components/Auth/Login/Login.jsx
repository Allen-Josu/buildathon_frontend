import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [studentId, setStudentId] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    // Example: Form submission or API call
    const formData = {
      studentId,
      password,
    }
    console.log("Login Attempt:", formData)

    // Navigate to home page
    navigate('/home')
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Login</h2>
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
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>
              <div>
                <p>
                  Don't have an account? Register your account{' '}
                  <Link to="/register">here</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
