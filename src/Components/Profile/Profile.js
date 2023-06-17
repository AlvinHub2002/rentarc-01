import React, { useEffect, useState } from 'react';
import "./Profile.css";
import axios from 'axios';

function Profile() {
  const [activeTab, setActiveTab] = useState("personel");
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const loggedin = localStorage.getItem('LoggedIn');
    if (loggedin) {
      fetchUserDetails(loggedin);
    }
  }, []);  

  const fetchUserDetails = async (loggedin) => {
    try {
      const response = await axios.get(`http://localhost:3000/Profile?loggedin=${loggedin}`); 
      setUserDetails(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="container-fluid-profile">
        <div>
          <div className="sidebar-profile">
            {userDetails &&(
            <div>
              <h5 className="side-profile" onClick={() => handleTabClick("personel")}>Hello {userDetails.Firstname} </h5>
              <br /><br /><hr />

              <h5 className="side-profile" onClick={() => handleTabClick("products")}>My Products</h5>
              <br /><br /><hr />

              <h5 className="side-profile" onClick={() => handleTabClick("rentals")}>My Rentals</h5>
              <br /><br /><hr />

              <h5 className="side-profile" onClick={() => handleTabClick("cart")}>Cart</h5>
              <br /><br /><hr />

              <h5 className="side-profile" onClick={() => handleTabClick("payment")}>Payment</h5>
              <br /><br />
            </div>
            )} 
          </div>
          <div className="mainprt-profile">
            {activeTab === "personel" && userDetails && (
              <div className='personal-info'>
                <h1 className="mphead-personal-info">Personal Information</h1>
                <div className='personal-info-details'>
                <p>Name: <br/><br/>{`${userDetails.Firstname} ${userDetails.Lastname}`}</p>
                <hr/>
                <p>Email: <br/><br/>{userDetails.email}</p>
                <hr/>
                {/* Add more user details here */}
              </div>
              </div>
            )}

            {activeTab === "products" && (
              <div>
                <h5 className="mphead">My Products</h5>
                {/* Display user's products */}
              </div>
            )}

            {activeTab === "rentals" && (
              <div>
                <h5 className="mphead">My Rentals</h5>
                {/* Display user's rentals */}
              </div>
            )}

            {activeTab === "cart" && (
              <div>
                <h5 className="mphead">Cart Items</h5>
                {/* Display user's cart items */}
              </div>
            )}

            {activeTab === "payment" && (
              <div>
                <h5 className="mphead">Payments</h5>
                {/* Display user's payment history */}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
