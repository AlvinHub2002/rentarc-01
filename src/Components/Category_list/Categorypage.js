import React from 'react'
import  { useState,useEffect } from 'react';
import './Categorypage.css'
import axios from 'axios';
import Header from '../Common/Header';
import { useNavigate } from 'react-router-dom';


const districtsInKerala = [
  'Alappuzha',
  'Ernakulam',
  'Idukki',
  'Kannur',
  'Kasaragod',
  'Kollam',
  'Kottayam',
  'Kozhikode',
  'Malappuram',
  'Palakkad',
  'Pathanamthitta',
  'Thiruvananthapuram',
  'Thrissur',
  'Wayanad'
];

function Categorypage() {

    const [location, setLocation] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState('');

    const history =useNavigate();


    useEffect(() => {
        fetchData();
      }, [selectedCategory]);

      useEffect(() => {
        const category = localStorage.getItem('selectedCategory');
        setSelectedCategory(category || '');
      }, []);

      useEffect(() => {
        localStorage.setItem('selectedCategory', selectedCategory);
      }, [selectedCategory]);
 
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3000/Categorypage',{
             headers: {
          'x-selected-category': selectedCategory,
        },
          });
          setProducts(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      const applyFilters = () => {
        let filteredProducts = products;
      
        if (location !== '') {
          filteredProducts = filteredProducts.filter((product) => product.district === location);
        }
      
        if (selectedPrice !== '') {
          filteredProducts = filteredProducts.filter((product) => product.price <= selectedPrice);
        }
      
        return filteredProducts;
      };


      const handleProductClick = (id) => {
        localStorage.setItem('productId',id);
        history('/Product_detail/:id')
      };



  return (
    <div className='category-page'>
      <Header/>
      <h2 className='category-products-for-rent'>{selectedCategory}</h2>
    <div className='category-listing'>
    
      <div className='category-filters'>
    <aside>
          <h2 >Filters</h2>
          <label htmlFor="date">Location</label>
          <select
            id="location"
            value={location}
            name="location"
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Select a location</option>
            {districtsInKerala.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
          <label htmlFor="price">Price below:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
          />
          {/* <button onClick={filterProductsByPrice}>Apply Filter</button> */}
        </aside>
        </div>
        <section id="categoryList">
          {applyFilters().map((product) => (
            <div className="category-product-box" key={product._id}  onClick={()=>handleProductClick(product._id)}>
              <img className="category-product-image" src={product.images[0]?.url} alt={product.name} />
              <h3 className="category-product-name">{product.brand}</h3>
              <p className="category-product-title">{product.title}</p>
              <p className="category-product-title"> Available Qunatity : {product.quantity}</p>
              <p className="category-roduct-price">Rs.{product.price}/day</p>
            </div>
          ))}
        </section>
    </div>
    </div>
  )
}

export default Categorypage
