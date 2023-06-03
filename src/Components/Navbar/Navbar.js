import React from 'react'
import Logo from './logo.png'
import cat from'./category-image.png'
import "./Navbar.css"
import cd4 from './card4.png'
import cd3 from './card3.png'
import cd2 from './card2.png'
import cd1 from './card1.png'
import cart from './cart.png'
import car1 from './rent6.png'
import car2 from './rent5.png'
import car3 from './rent4.png'
import profile from './profile.png'
import store from './Buy at online shop - 2004x1500 1.png'
import { useEffect} from 'react';
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Navbar() {

  const history=useNavigate();

  const [selectedCategory, setSelectedCategory] = useState('');



  useEffect(() => {
    const headerEl = document.querySelector('.header');

    const isScrolling = () => {
      const windowPosition = window.scrollY > 800;
      headerEl.classList.toggle('header--active', windowPosition);
    }

    window.addEventListener('scroll', isScrolling);

    return () => {
      window.removeEventListener('scroll', isScrolling);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/Navbar');
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };



  const handleRentNowClick = () => {
    history('/product-list');
  };

  const handleGiveforrent = () => {
    history('/Post');
  };

  const handlemore = () => {
    history('/product-list');
  };


  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    localStorage.setItem('selectedCategory', category);
    history('/Categorypage');
  };

  // useEffect(() => {
  //   return () => {
  //     localStorage.removeItem('selectedCategory');
  //   };
  // }, []);



  return (
    <div className='home-page'>
  {/* -----------------------------------------------------------------NavBar------------------------------------------------------------------------------------------------ */}
       <header class="header">
			<nav class="nav container">
				<a href="amazon.com" class="nav__logo">
					<img src={Logo} alt="" class="nav__logo-image" />
				</a>
        <p className='lname'>RentArc</p>
        <div className='content'>
          <a href='amazom.com'>Home</a>
          <a href='amazom.com'>Contact us</a>
          </div>
          <div className='buttons'>
          <button class="button" aria-label="login" onClick={handleLogout}>Log out</button>
				<a href='amazon.com'>
          <img className='profile-icon' src={profile} alt='amazon.com'></img>
        </a>
        </div>
			</nav>
		</header>
  {/* -----------------------------------------------------------Hero section------------------------------------------------------------------------------------------------------ */}
    <section className='hero'>
       <div class="hero-content">
          <h1>A Complete Rental Website for you</h1>
          <p>RentArc enables one to rent different products near them . We also provide functionality to give your products for rent to others</p>
       <div class="buttons-hero">
          <button className='rent' onClick={handleRentNowClick} >Rent Now</button>
          <button className='give' onClick={handleGiveforrent}>Give for rent</button>
       </div>
     </div>
  <div class="store">
    <img src={store} alt=""></img>
  </div>
    </section>
  {/* ---------------------------------------------------------------------Section-2---------------------------------------------------------------------------------------------- */}
    <section className='sect1'>
    <div className="search-bar">
    <input type="text" placeholder="Search..."></input>
  </div>


  <div class="dropdown">
  <button class="dropdown-button">Categories</button>
  <img src={cat} alt=''></img>
  <div class="dropdown-content">
          <option value="Photography and Videography" onClick={() => handleCategorySelection('Photography and Videography')}>Photography and Videography</option>
          <option value="Power Tools" onClick={() => handleCategorySelection('Power Tools')}>Power Tools</option>
          <option value="Home Accessories" onClick={() => handleCategorySelection('Home Accessories')}>Home Accessories</option>
          <option value="Gadgets" onClick={() => handleCategorySelection('Gadgets')}>Gadgets</option>
          <option value="Medical Equipments" onClick={() => handleCategorySelection('Medical Equipments')}>Medical Equipments</option>
          <option value="Camping and Outdoor" onClick={() => handleCategorySelection('Camping and Outdoor')}>Camping and Outdoor</option>
  </div>
  </div>
  <div className='cart'>
    <a href='amazon.com'>
    <img src={cart} alt=''></img>
    </a>
  </div>
  <div className='carousal'>
  <div className='container'>
  <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" src={car1} alt="First slide"></img>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100 " src={car2} alt="Second slide"></img>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100 " src={car3} alt="Third slide"></img>
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
  </div>
  </div>
  <div className='card-heading'>
    <h1 className='card-head'>Top products to rent</h1>
  </div>
  <div className='cards'>
  <div class="card1">

    <div class="imgBox">
        <img src={cd1}
            alt="mouse corsair" class="gopro"></img>
    </div>

    <div class="contentBox">
        <h3>VIRTUOSO RGB WIRELESS</h3>
        <h2 class="price">61.<small>98</small> €</h2>
        <a href="amazon.com" class="rent">Rent</a>
    </div>
</div>

<div class="card2">

<div class="imgBox">
    <img src={cd2}
        alt="mouse corsair" class="headset"></img>
</div>

<div class="contentBox">
    <h3>VIRTUOSO RGB WIRELESS</h3>
    <h2 class="price">61.<small>98</small> €</h2>
    <a href="amazon.com" class="rent">Rent</a>
</div>
</div>

<div class="card3">

<div class="imgBox">
    <img src={cd3}
        alt="mouse corsair" class="washer"></img>
</div>

<div class="contentBox">
    <h3>VIRTUOSO RGB WIRELESS</h3>
    <h2 class="price">61.<small>98</small> €</h2>
    <a href="amazon.com" class="rent">Rent</a>
</div>
</div>

<div class="card4">

<div class="imgBox">
    <img src={cd4}
        alt="mouse corsair" class="speaker"></img>
</div>

<div class="contentBox">
    <h3>VIRTUOSO RGB WIRELESS</h3>
    <h2 class="price">61.<small>98</small> €</h2>
    <a href="amazon.com" class="rent">Rent</a>
</div>
</div>

<div className='more'>
  <button className='more-button' onClick={handlemore}>More <i class='fas fa-angle-right'></i></button>
</div>

</div>
    </section>
    <section className='sect2'>

    <footer class="top">
        <img src="logo.svg" alt='' />
        <div class="links">
          <div className='footer-section'>
            <h2>Section</h2>
            <a href='amazom.com'>Home</a>
            <a href='amazon'>Categories</a>
            <a href='amazon.com'>Profile</a>
          </div>
          <div className='about'>
            <h2 className='footer-about'>Contact Details</h2>
            <p className='address'>Address: 123 Main Street, City, Country</p>
            <p className='phone'>Phone: (123) 456-7890</p>
            <p className='email'>Email: info@example.com</p>
          </div>
        </div>
      </footer>
      <footer class="bottom">
        <div class="legal">
          <p className='rights'> © 2023 All rights reserved </p>
          <div className='terms'>
          <p> License </p>
          <p> Terms </p>
          <p> Privacy </p>
          </div>
        </div>
        <div class="links">
          <p class="fa-brands fa-github"></p>
          <p class="fa-brands fa-linkedin"></p>
          <p class="fa-brands fa-docker"></p>
        </div>
        <div className='about-us'>
          <a className='us' href='amazon.com'>About Us</a>
        </div>

        <div className='brand'>

          <img src={Logo} alt=''></img>
          <h1 className='brand-name'>RentArc</h1>

        </div>
      </footer>

      </section>
    </div>

  )
}

export default Navbar
