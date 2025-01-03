import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



function Login() {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e)=>{
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
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input type="email" autoComplete='off' className="form-control" value={email} id="username" onChange={(e)=>setEmail(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  autoComplete='current-password'
                  id="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
            <div>
                <p>
                    don't have an account ? register your account <Link to="/register">here</Link>
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