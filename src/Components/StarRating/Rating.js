import React, { useState,useEffect } from 'react';
import './Rating.css'; // Import the CSS file for styling
import axios from 'axios';


const Rating = () => {
  const [rating, setRating] = useState(0);
  const [ratingComment, setRatingComment] = useState('');
  const [product, setProduct] = useState(null);


  useEffect(() => {
    const productId = localStorage.getItem('productId');
    if (productId) {
      fetchProductDetails(productId);
    }
  }, []);



  const fetchProductDetails = async (productId) => {
    try {
        console.log('hai')
      const response = await axios.get(`http://localhost:3000/Rating/${productId}`);
      setProduct(response.data);
    //   setName(`${response.data.renter.Firstname} ${response.data.renter.Lastname}`);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handleRatingChange = (value) => {
    setRating(value);
    let comment = '';
    switch (value) {
      case 1:
        comment = 'Bad';
        break;
      case 2:
        comment = 'Average';
        break;
      case 3:
        comment = 'Good';
        break;
      case 4:
        comment = 'Very Good';
        break;
      case 5:
        comment = 'Excellent';
        break;
      default:
        comment = '';
    }

    setRatingComment(comment);
  };

  const handleSubmit = () => {
    console.log('Rating:', rating);
  };

  return (
    <div className='rating-page-main'>
        <h2> Rate the product</h2>
        {product &&(
    <div className="rating-page">
        
        <div className='rating-contents'>
      <div className="rating-product-image">
        <img src={product.images[0].url} alt="Product"  className='rating-product-image-given'/>
      </div>
      <div className="rating-section">
        <h2>{product.title}</h2>
        <div className="rating-values">
          <button
            className={rating === 1 ? 'active' : ''}
            onClick={() => handleRatingChange(1)}
          >
            1
          </button>
          <button
            className={rating === 2 ? 'active' : ''}
            onClick={() => handleRatingChange(2)}
          >
            2
          </button>
          <button
            className={rating === 3 ? 'active' : ''}
            onClick={() => handleRatingChange(3)}
          >
            3
          </button>
          <button
            className={rating === 4 ? 'active' : ''}
            onClick={() => handleRatingChange(4)}
          >
            4
          </button>
          <button
            className={rating === 5 ? 'active' : ''}
            onClick={() => handleRatingChange(5)}
          >
            5
          </button>
        </div>
        <p className='comment'>{ratingComment}</p>
        <div className='rating-submit'>
        <button onClick={handleSubmit} className='rating-submit-button'>Submit</button>
        </div>
      </div>
      </div>
    </div>
    )}
    </div>
  );
};

export default Rating;
