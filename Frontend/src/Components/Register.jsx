import React, { useState } from 'react'
import axios from 'axios';
import '../Styles/Register.css'
import { Link } from 'react-router-dom';


const Register = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    const body = {
      name,
      email,
      password
    }

    console.log(body);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/register`, body);
      
      console.log(response.data);
      alert('Registration successful');
    } catch(error) {
      console.error('Registration error:', error);
      alert('Registration failed');
    }

  }

  return (
    <div className='container'>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label htmlFor="name" className="nameSet-label">Your name</label>
          <input type="text" name="name" className="form-control" id="name" placeholder="John" onChange={(e)=> setName(e.target.value)}/>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="emailSet-label">Your email</label>
          <input type="email" name="email" className="form-control" id="email" placeholder="name@company.com" onChange={(e)=> setEmail(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="passwordSet-label">Password</label>
          <input type="password" name="password" className="form-control" id="password" onChange={(e)=>setPassword(e.target.value)} required />
        </div>

        <div className="confirm">
          <span><Link to={'/login'}>Already have an account?</Link></span>
        </div>

        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  )
}

export default Register