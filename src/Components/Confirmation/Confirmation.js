import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Confirmation.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Common/Header'

function Confirmation() {
  const history=useNavigate()

  const [product, setProduct] = useState(null);
  const [name, setName] = useState('');
  const [rentedPeriod, setRentedPeriod] = useState({
    fromDate: '',
    toDate: '',
  });

  useEffect(() => {
    const productId = localStorage.getItem('productId');
    if (productId) {
      fetchProductDetails(productId);
    }
  }, []);

  const fetchProductDetails = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:3000/Confirmation/${productId}`);
      setProduct(response.data.product);
      setName(`${response.data.renter.Firstname} ${response.data.renter.Lastname}`);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handleFromDateChange = (e) => {
    setRentedPeriod((prevPeriod) => ({
      ...prevPeriod,
      fromDate: e.target.value,
    }));
  };

  const handleToDateChange = (e) => {
    setRentedPeriod((prevPeriod) => ({
      ...prevPeriod,
      toDate: e.target.value,
    }));
  };

  const calculateTotalPrice = () => {

    if (product && rentedPeriod.fromDate && rentedPeriod.toDate) {
      const { fromDate, toDate } = rentedPeriod;
      const from = new Date(fromDate);
      const to = new Date(toDate);
      const days = Math.ceil((to - from) / (1000 * 60 * 60 * 24));
  
      return product.price * days;
    }
    return 0;
  };


  const initiatePayment = async () => {
    const productId = localStorage.getItem('productId');
    console.log(productId)
    const headers = {
      'LoggedIn': localStorage.getItem('LoggedIn'),
      'RentedPeriod': JSON.stringify({
        fromDate: rentedPeriod.fromDate, 
        toDate: rentedPeriod.toDate, 
      })
        };
    const response = await axios.post(`http://localhost:3000/Confirmation/${productId}`, {
      amount: calculateTotalPrice() * 100},{headers});

    const options = {
      key: 'rzp_test_oiCrE3lrqCUw7w',
      amount: response.data.amount,
      currency: response.data.currency,
      name: 'RentArc',
      description: 'Payment for Product Rental',
      order_id: response.data.id,
      handler: function (response) {
        console.log('Payment Successful:', response);
        history('/product-list')
      },
      prefill: {
        name: 'Alvin',
        email: 'alvin@gmail.com',
        contact: '9744901994',
      },
    };
    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };



  return (
    <div>
      <Header/>
      <div className="confirm">
        <div className="confirmation-page-main">
          <h1>Product Confirmation</h1>
          {product && (
            <div className="confirmation-page">
              <div className="confirmation-product-details">
                <div className="product-image-container-confirm">
                  <img src={product.images[0].url} alt="" className="product-image-confirm" />
                </div>
                <div className="product-info-main-confirm">
                  <div className="product-info-confirm">
                    <h2 className="product-name-confirm">{product.brand}</h2>
                    <h3 className="product-title-confirm">{product.title}</h3>
                    <p className="rent-per-day-confirm">{`Rent per Day: Rs.${product.price}`}</p>
                    <p className="owner-confirm">Owner: {name}</p>
                    <p className="contact-confirm">Contact: {product.contact}</p>
                    <p className="location-confirm">Location: {`${product.place}, ${product.district}`}</p>
                    <div className="rented-period-confirm">
                      <label htmlFor="fromDate">From Date:</label>
                      <input
                        type="date"
                        id="fromDate"
                        value={rentedPeriod.fromDate}
                        onChange={handleFromDateChange}
                      />
                      <label htmlFor="toDate">To Date:</label>
                      <input
                        type="date"
                        id="toDate"
                        value={rentedPeriod.toDate}
                        onChange={handleToDateChange}
                      />
                    </div>
                  </div>
                </div>
                <p className="total-price-confirm" >{`Total Price: Rs.${calculateTotalPrice()}`}</p>
                <div className="confirmation-butt">
                  <button onClick={initiatePayment}>Confirm & Pay</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
