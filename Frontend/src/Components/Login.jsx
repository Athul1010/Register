import React, { useState } from 'react'
import axios from 'axios';
import '../Styles/Login.css'
import { Link } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/login`, {
                email,
                password
            });
            alert(response.data); // Assuming the backend sends a response like "Login Successfully" or error messages
            // Handle success or display a message to the user


            alert('login successfully')
            
            

        } catch (error) {
            console.error('Error:', error.response.data); // Log the error or display an error message to the user
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-6 col-lg-8 col-md-10 col-sm-12">
                    <h1>Login</h1>
                    <div className="login-wrapper">
                        <h4 className='signIn_form'>Sign in to your account</h4>
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label htmlFor="email" className="email-label">Your email</label>
                                <input type="email" className="form-control" id="email" placeholder="name@company.com" onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="password-label">Password</label>
                                <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            {/* <div className="form-mark">
                                        <div className="remember">
                                            <input type="checkbox" name="" id="checkbox" />
                                            <label htmlFor="checkbox">Remember me</label>
                                        </div>
                                        <div className="forget-password">
                                            <span>Forget password?</span>
                                        </div>
                                    </div> */}

                            <div className="confirm">
                                <span><Link to={'/'}>Register</Link></span>
                            </div>

                            <button type="submit" className="signIn-button">Sign In</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login