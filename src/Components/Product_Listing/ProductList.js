import React from 'react'
import  { useState,useEffect } from 'react';
import './ProductList.css'
import axios from 'axios';
import Header from '../Common/Header';
function ProductList() {

    const [date, setDate] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState('');


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

      const filterProductsByPrice = () => {
        if (selectedPrice === '') {
          return products; 
        } else  {
          return products.filter(product => product.price <= selectedPrice);
        }
      };


  return (
    <div>
      <Header/>
      <h2 className='products-for-rent'>Products for Rent</h2>
    <div className='listing'>
    
      <div className='filters'>
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
        <section id="productList">
          {filterProductsByPrice().map((product) => (
            <div className="product-box" key={product.id}>
              <img className="product-image" src={product.images[0].url} alt={product.name} />
              <h3 className="product-name">{product.brand}</h3>
              <p className="product-title">{product.title}</p>
              <p className="product-price">Rs.{product.price} /day</p>
            </div>
          ))}
        </section>
    </div>
    </div>
  )
}

export default ProductList
