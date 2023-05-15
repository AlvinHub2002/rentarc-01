import React from 'react'
import Logo from './logo.png'
import "./Navbar.css"
function Navbar() {
  return (
    <div className='navbar'>
        <div className='nav-contents'>
            <img className='logo' src={Logo} alt="logo" />
            <h1 className='logo-name'> RentArc</h1>
            <ul className='content-list'>
                <li className='home'><a href="/">Home</a></li>
                <li className='contact'><a href="/">Contact us</a></li>
            </ul>
            <div className='buttons'>
                <button className='login'>Login</button>
                <button className='signup'>Sign up</button>

            </div>
       </div>
    </div>

  )
}

export default Navbar
