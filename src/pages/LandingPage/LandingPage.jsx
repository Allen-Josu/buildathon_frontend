import React from 'react'
import Signup from '../../components/Auth/SignUp/SignUp'
import Login from '../../components/Auth/Login/Login'
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Home from '../home';




export default function LandingPage() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
