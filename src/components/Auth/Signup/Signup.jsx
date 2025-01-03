import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Signup() {

  const [name,setName] = useState()
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const navigate = useNavigate()


  const handleSubmit = (e)=>{
    e.preventDefault()
    navigate("/home")
  }

  return (
    <div className="container-fluid mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Sign Up</h2>
              <form onSubmit={handleSubmit} > 
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Username
                  </label>
                  <input type="text" name='name' autoComplete='off' className="form-control" id="username" onChange={(e)=>setName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input type="email" name='email' className="form-control" autoComplete='off' id="email" onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input type="password" name='password' className="form-control" autoComplete='current-password' id="password" onChange={(e)=>setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-success w-100">
                  Sign Up
                </button>
              </form>
              <div>
                <p>Already have an account? then click <Link to="/login" > here </Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup