import React, { useState } from 'react';
import './PopupDisclaimer.css';
import { useNavigate } from 'react-router-dom';

const PopupDisclaimer = () => {
const history=useNavigate();
  const handleClose = () => {
    history('/Navbar')
  };

  return (
    <div className= 'popup-disclaimer'>
      <div className="popup-content">
        <h2 className="popup-title">Disclaimer</h2>
        <div className="popup-message">
          <p>
            Thank you for visiting our rental website. Before proceeding, please take note of the following important points:
          </p>
          <ul>
            <li>Read the terms and conditions carefully before making any rental agreements.</li>
            <li>Verify the details of the rental item, including its condition, features, and any additional charges.</li>
            <li>Ensure that you have proper identification and meet any age or eligibility requirements.</li>
            <li>Inspect the rental item thoroughly before accepting it and report any damages or issues immediately.</li>
            <li>Adhere to the specified rental duration and return the item on time to avoid any penalties.</li>
          </ul>
        </div>
        <div className="popup-footer">
          <button className="popup-button" onClick={handleClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default PopupDisclaimer;
