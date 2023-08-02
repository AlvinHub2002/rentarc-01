import React from 'react'
import  { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductList.css'
import axios from 'axios';
import Header from '../Common/Header';

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


function ProductList() {

    const [location, setLocation] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState('');
    const history =useNavigate();


    useEffect(() => {
        fetchData();
      }, []);
 
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3000/product-list');
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
    <div className='prolis'>
      <Header/>
      <h2 className='products-for-rent'>Products for Rent</h2>
    <div className='listing'>
    
      <div className='filters'>
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
        <section id="productList">
          {applyFilters().map((product) => (
            <div className="product-box" key={product._id} onClick={()=>handleProductClick(product._id)}>
              <img className="product-image" src={product.images[0]?.url} alt={product.name} />
              <h3 className="product-name">{product.brand}</h3>
              <p className="product-title">{product.title}</p>
              <p className="product-title">Available Quantity : {product.quantity}</p>
              <p className='product-title'>Rating : {product.averageRating}/5</p>
              <p className="product-price">Rs.{product.price}/day</p>
            </div>
          ))}
        </section>
    </div>
    </div>
  )
}

export default ProductList
