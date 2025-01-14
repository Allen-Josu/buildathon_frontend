import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [studentId, setStudentId] = useState("") 
  const [course, setCourse] = useState("")
  const department = "DCA"
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    // You can add additional validation or API calls here
    const formData = {
      name,
      email,
      password,
      studentId,
      course,
      department
    }
    console.log("Form Submitted:", formData)

    // Navigate to the home page
    navigate("/home")
  }

  return (
    <div className="container-fluid mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Sign Up</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    name="name"
                    autoComplete="off"
                    className="form-control"
                    id="username"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    autoComplete="off"
                    className="form-control"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="studentId" className="form-label">
                    Student ID
                  </label>
                  <input
                    type="text"
                    name="studentId"
                    autoComplete="off"
                    className="form-control"
                    id="studentId"
                    onChange={(e) => setStudentId(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="course" className="form-label">
                    Course
                  </label>
                  <input
                    type="text"
                    name="course"
                    autoComplete="off"
                    className="form-control"
                    id="course"
                    onChange={(e) => setCourse(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="department" className="form-label">
                    Department
                  </label>
                  <input
                    type="text"
                    name="department"
                    className="form-control"
                    id="department"
                    defaultValue={department}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    className="form-control"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-success w-100">
                  Sign Up
                </button>
              </form>
              <div>
                <p>
                  Already have an account? Click <Link to="/login">here</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
