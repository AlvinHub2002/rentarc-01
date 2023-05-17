import React from 'react'
import logo from './logo.png'
import './Login.css'
import avatar from'./avatar.png'
function Login() {
  return (
    <div className='login-page'>
    <div className='login'>
        <div className='avatar'>
            <img src={avatar} alt="" />
        </div>
        <h2>Login</h2>
        <h3>Welcome back </h3>
        <form className='login-form'>
            <div className='textbox'>
                <input type='email' placeholder='Username'/>
            </div>
            <div className='textbox'>
                <input type="password" placeholder='password'/>
            </div>
            <button type="submit">Login</button>
            <a href='amazom.com'>Forgot credentials?</a>
        </form>
    </div>
    <div className='logo'>
            <img src={logo} alt="" />
        </div>
        <div className='foot'>
            <p>RentArc</p>
        </div>
    </div>
  )
}

export default Login
