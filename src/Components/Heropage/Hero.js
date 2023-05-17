import React from 'react'
import './Hero.css'
import store from './Buy at online shop - 2004x1500 1.png'
function Hero() {
  return (
    <div className='hero'>
      <section className='section1'>
        <div className='hero__content'>
                <p className='heading'>A Complete Rental Website for you</p>
                <img className='store' src={store} alt="" />
                <p className='description'>RentArc enables one to rent different products near them . We also provide functionality to give your products for rent to others </p>
                <button className='rent'>Rent Now</button>
                <button className='give'>Give for rent</button>
        </div> 
      </section> 
      <section className='section2'>
      <div class="input-group">
          <input type="text" class="form-control" placeholder="Search this blog"></input>
          <div class="input-group-append">
             <button class="btn btn-secondary" type="button">
               <i class="fa fa-search"></i>
              </button>
          </div>
  </div>  
        
        </section>  
      
    </div>
  )
}

export default Hero
