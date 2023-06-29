import React from 'react'
import Logo from './logo.png'
import cat from'./category-image.png'
import "./Navbar.css"
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
import { Link } from 'react-router-dom'


function Navbar() {

  const history=useNavigate();

  const [selectedCategory, setSelectedCategory] = useState('');
  const [topProducts, setTopProducts] = useState([]);




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



  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Navbar');
        const products = response.data;
  
        const sortedProducts = products.sort((a, b) => b.averageRating - a.averageRating);
  
        // Get the top 4 products
        const top4Products = sortedProducts.slice(0, 4);
  
        setTopProducts(top4Products);
        console.log(topProducts)
      } catch (error) {
        console.error('Error fetching top products:', error);
      }
    };
  
    fetchTopProducts();
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

  const handleProductClick = (id) => {
    localStorage.setItem('productId',id);
    history('/Product_detail/:id')
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
        <Link to={'/Navbar'}>Home</Link>
          <Link to={'/AboutUs'}>About Us</Link>
          </div>
          <div className='buttons'>
          <button class="button" aria-label="login" onClick={handleLogout}>Log out</button>
				<Link to={'/Profile'}>
          <img className='profile-icon' src={profile} alt='amazon.com'></img>
        </Link>
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
  {topProducts.length>0 &&(
    <div className='cards'>
 
  <div class="card1">

    <div class="imgBox">
        <img src={topProducts[0].images[0].url}
            alt="mouse corsair" class="gopro"></img>
    </div>

    <div class="contentBox">
        <h3>{topProducts[0].brand}</h3>
        <h2 class="price">Rs.{topProducts[0].price}/day</h2>
        <button class="rent"  key={topProducts[0]._id} onClick={()=>handleProductClick(topProducts[0]._id)} >Rent</button>
    </div>
</div>

<div class="card2">

<div class="imgBox">
    <img src={topProducts[1].images[0].url}
        alt="mouse corsair" class="headset"></img>
</div>

<div class="contentBox">
    <h3>{topProducts[1].brand}</h3>
    <h2 class="price">Rs.{topProducts[1].price}/day</h2>
    <button class="rent"  key={topProducts[1]._id} onClick={()=>handleProductClick(topProducts[1]._id)}>Rent</button>
</div>
</div>

<div class="card3">

<div class="imgBox">
    <img src={topProducts[2].images[0].url}
        alt="mouse corsair" class="washer"></img>
</div>

<div class="contentBox">
    <h3>{topProducts[2].brand}</h3>
    <h2 class="price">Rs.{topProducts[2].price}/day</h2>
    <button class="rent"  key={topProducts[2]._id} onClick={()=>handleProductClick(topProducts[2]._id)}>Rent</button>
</div>
</div>

<div class="card4">

<div class="imgBox">
    <img src={topProducts[3].images[0].url}
        alt="mouse corsair" class="speaker"></img>
</div>

<div class="contentBox">
    <h3>{topProducts[3].brand}</h3>
    <h2 class="price">Rs.{topProducts[3].price}/day</h2>
    <button class="rent"  key={topProducts[3]._id} onClick={()=>handleProductClick(topProducts[3]._id)}>Rent</button>
</div>
</div>


<div className='more'>
  <button className='more-button' onClick={handlemore}>More <i class='fas fa-angle-right'></i></button>
</div>

</div>
)}
    </section>
    <section className='sect2'>

    <footer class="top">
        <img src="logo.svg" alt='' />
        <div class="links">
          <div className='footer-section'>
            <h2>Section</h2>
            <a href='amazom.com'>Home</a>
            <Link to={'/Disclaimer'}>Disclaimer</Link>
            <a href='amazon.com'>Profile</a>
          </div>
          <div className='about'>
            <h2 className='footer-about'>Contact Details</h2>
            <p className='address'>Address: SJCET Palai</p>
            <p className='phone'>Phone:+91 9744901994</p>
            <p className='email'>Email: myrentarc@gmail.com</p>
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
