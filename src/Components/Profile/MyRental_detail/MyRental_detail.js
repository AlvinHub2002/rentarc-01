import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
// import Header from '../Common/Header';
// import { useParams } from 'react-router-dom';
import './MyRental_detail.css'
function MyRental_detail() {
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [name, setName] = useState('')
    const [email,setEmail]=useState('')
    const history=useNavigate();

    useEffect(() => {
      const productId = localStorage.getItem('productId');
      if (productId) {
        fetchProductDetails(productId);
      }
    }, []);


      const fetchProductDetails = async (productId) => {
        try {
          const response = await axios.get(`http://localhost:3000/MyRental_detail/${productId}`);
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


      const deleteProduct = async () => {
        const productId = localStorage.getItem('productId');
        const loggedin=localStorage.getItem('LoggedIn')
        console.log(loggedin)
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You are about to cancel your order',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Ok',
                cancelButtonText: 'Cancel',
              });
          if (result.isConfirmed) {
            await axios.delete(`http://localhost:3000/MyRental_detail/${productId}`,{
              data:{loggedin:loggedin},
            })
              .then(res => {
                if (res.data === 'Product deleted successfully') {
                Swal.fire('Cancelled!', 'Product has been cancelled.', 'success');
                history('/Profile');
                } else if (res.data === 'Failed to delete product') {
                    Swal.fire('Error!', 'Failed to cancel your order.', 'error');
                }
              })
              .catch(e => {
                alert('Something went wrong');
                console.log(e);
              });
          }
        } catch (error) {
          console.error(error);
        }
      };
      

      const handleRatingClick=async()=>{
        history('/Rating/:id')
      }

  return (
    <div className='product-details-main'>
      {/* <Header/> */}
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
          <p className='product-detail-card-location'>Rating: {product.averageRating} / 5</p>
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

        <div className='rent-button-main'>
        <button className="rent-button" onClick={handleRatingClick}>Rate this product</button><br/>
        <button className="rent-button" onClick={deleteProduct}>Cancel order</button>

        </div>
        </div>
    </div>
  )
}

export default MyRental_detail