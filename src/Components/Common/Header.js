import React from 'react'
import profile from './profile.png'
import axios from 'axios'
import Logo from './logo.png'
import './Header.css'
import { Link } from 'react-router-dom'

function Header() {
    const handleLogout = async () => {
        try {
          await axios.post('http://localhost:3000/Navbar');
          window.location.href = '/';
        } catch (error) {
          console.error('Logout failed:', error);
        }
      };



  return (
    <div >
          <header class="header">
			<nav class="nav container">
				<a href="amazon.com" class="nav__logo">
					<img src={Logo} alt="" class="nav__logo-image" />
				</a>
        <p className='lname'>RentArc</p>
        <div className='content-header'>
          <Link to='/Navbar'>Home</Link>
          <a href='amazom.com'>Contact us</a>
          </div>
          <div className='buttons-header'>
          <button class="button-header" aria-label="login" onClick={handleLogout}>Log out</button>
				<Link to={'/Profile'}>
          <img className='profile-icon-header' src={profile} alt='amazon.com'></img>
        </Link>
        </div>
			</nav>
		</header>
    </div>
  )
}

export default Header
