import React from 'react'
import './Signup.css'
import logo from './logo.png'
import { Link } from 'react-router-dom';
function Signup() {
  return (
    <div className='signup-page'>
        <form className='form'>
            <p className='title'>Register</p>
            <p className='message'>Signup now to enjoy RentArc</p>
            <div className='flex'>
                <label>
                    <input required placeholder='' type='text' className='input'/>
                    <span>Firstname</span>
                </label>
                <label>
                    <input required placeholder='' type='text' className='input'/>
                    <span>Lastname</span>
                </label>
            </div>
            <label>
                <input required placeholder='' type='email' className='input'/>
                <span>Email</span>
            </label>
            <label>
            <input required placeholder='' type='password' className='input'/>
                <span>Password</span>
            </label>
            <label>
            <input required placeholder='' type='password' className='input'/>
                <span>Confirm password</span>
            </label>
            <button type='submit' className='submit'>Submit</button>
            <p className='signin'>
                Already have an account? <span><Link to='/Login'>Sign in</Link></span>
            </p>
        </form>
        <div className='logo'>
            <img src={logo} alt="" />
        </div>
        <div className='foot'>
            <p>RentArc</p>
        </div>
    </div>
  )
}

export default Signup
