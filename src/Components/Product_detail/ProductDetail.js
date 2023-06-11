import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Common/Header';
// import { useParams } from 'react-router-dom';
import './ProductDetail.css'
function ProductDetail() {
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [name, setName] = useState('')
    const [email,setEmail]=useState('')


    useEffect(() => {
      const productId = localStorage.getItem('productId');
      if (productId) {
        fetchProductDetails(productId);
      }
    }, []);


      const fetchProductDetails = async (productId) => {
        try {
          const response = await axios.get(`http://localhost:3000/Product_detail/${productId}`);
          setProduct(response.data.product);
          setName(`${response.data.renter.Firstname} ${response.data.renter.Lastname}`);
          setEmail(response.data.renter.email);
        } catch (error) {
          console.error(error);
             
        }
      };

    
      const handleImageSelect = (image) => {
        setSelectedImage(image);
      };

      if (!product) {
        return <div>Loading...</div>;
      }

  return (
    <div className='product-details-main'>
      <Header/>
        <div className="product-details-container">
      <div className="product-image-container">
        <div className='thumbnail-container'>
        <div className="thumbnail-images">
          {product.images.map((image) => (
            <img
              key={image.id}
              src={image.url}
              alt={`Product Thumbnail ${image.id}`}
              className={selectedImage === image.url ? 'selected' : ''}
              onMouseEnter={() => handleImageSelect(image.url)}
            />
          ))}
        </div>
        </div>
        <div className='main-image-container'>
        <div className="main-image">
          <img src={selectedImage || product.images[0].url} alt="Product" />
        </div>
        </div>
      </div>
      <div className="product-info-container">
        <div className="product-details-display">

          <h2>{product.brand}</h2>
          <p className='product-detail-card-title'>{product.title}</p>
          <p className='product-detail-card-price'>Rent per day:<span className='product-detail-card-price-span'> Rs.{product.price}</span></p>
          <p className='product-detail-card-location'>Location: {product.location}</p>
        </div>
        <div className='renter-details-main'>
        <div className="renter-details">
          <h3>Renter Details:</h3>
          <p>Name: {name}</p>
          <p>Contact: {product.contact}</p>
          <p>Email: {email}</p>
        </div>
        </div>
      </div>
    </div>
    <div className='below-details-container'>
    <div className='product-description-main'>
        <div className="product-description">
          <h3>Description:</h3>
          <p>{product.description}</p>
        </div>
        </div>

        <div className='rent-button-main'>
        <button className="rent-button">Rent Now</button>
        </div>
        </div>
    </div>
  )
}

export default ProductDetail
