import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from '../../Common/Header';
// import Header from  '\setProduct/Components/Common/Header.js'
import './Unverified.css'
function Unverified() {
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
          const response = await axios.get(`http://localhost:3000/Unverified/${productId}`);
          setProduct(response.data.product);
          setName(`${response.data.renter.Firstname} ${response.data.renter.Lastname}`);
          setEmail(response.data.renter.email);
        } catch (error) {
          console.error(error);
             
        }
      };


      const verifyProduct= async () => {
        try {
          const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to verify this product',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Verify',
            cancelButtonText: 'Cancel',
          });
          if(result.isConfirmed){
          const headers = {
            'productId': localStorage.getItem('productId'),
              };
          await axios.post('http://localhost:3000/Unverified',product, {
            headers
          })

          .then(res=>{
            if(res.data==='perfect'){
              Swal.fire('Verified!', 'Product has been verified.', 'success');
            }
            else{
              Swal.fire('Error!', 'Failed to verify the product.', 'error');
            }
          })
            }
           } catch (error) {
          console.error(error);
        }
      };

      const unverifyProduct= async () => {
        try {
          const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to unverify this product',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'unverify',
            cancelButtonText: 'Cancel',
          });
          if(result.isConfirmed){
          const headers = {
            'productId': localStorage.getItem('productId'),
              };
          await axios.delete('http://localhost:3000/Unverified', {
            headers,
            data:product,
          })

          .then(res=>{
            if(res.data==='Product deleted successfully from the unverified collection'){
              Swal.fire('UnVerified!', 'Product has been declained.', 'success');
            }
            else{
              Swal.fire('Error!', 'Failed to unverify the product.', 'error');
            }
          })
            }
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
          <p className='product-detail-card-location'>Available Quantity : {product.quantity}</p>
          <p className='product-detail-card-price'>Rent per day:<span className='product-detail-card-price-span'> Rs.{product.price}</span></p>
          <p className='product-detail-card-location'>District: {product.district}</p>
          <p className='product-detail-card-location'>Place: {product.place}</p>
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

        
        </div>
        <div className='rent-button-main'>
        <button className="rent-button" onClick={verifyProduct}>Verify Product</button><br/>
        <button className="rent-button" onClick={unverifyProduct}>UnVerify Product</button>

        </div>
    </div>
  )
}

export default Unverified
