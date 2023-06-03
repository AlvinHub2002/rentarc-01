import React from 'react'
import  { useState,useEffect } from 'react';
import './Categorypage.css'
import axios from 'axios';
import Header from '../Common/Header';



function Categorypage() {

    const [date, setDate] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState('');


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

      const filterProductsByPrice = () => {
        if (selectedPrice === '') {
          return products; 
        } else  {
          return products.filter(product => product.price <= selectedPrice);
        }
      };






  return (
    <div className='category-page'>
      <Header/>
      <h2 className='category-products-for-rent'>{selectedCategory}</h2>
    <div className='category-listing'>
    
      <div className='category-filters'>
    <aside>
          <h2 >Filters</h2>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
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
          {filterProductsByPrice().map((product) => (
            <div className="category-product-box" key={product.id}>
              <img className="category-product-image" src={product.images[0].url} alt={product.name} />
              <h3 className="category-product-name">{product.brand}</h3>
              <p className="category-product-title">{product.title}</p>
              <p className="category-roduct-price">Rs.{product.price}/day</p>
            </div>
          ))}
        </section>
    </div>
    </div>
  )
}

export default Categorypage
