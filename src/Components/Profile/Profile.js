import React, { useEffect, useState } from 'react';
import "./Profile.css";
import axios from 'axios';

function Profile() {
  const [activeTab, setActiveTab] = useState("personel");
  const [userDetails, setUserDetails] = useState(null);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const loggedin = localStorage.getItem('LoggedIn');
    if (loggedin) {
      fetchUserDetails(loggedin);
    }
  }, []);  

  const fetchUserDetails = async (loggedin) => {
    try {
      const response = await axios.get(`http://localhost:3000/Profile?loggedin=${loggedin}`); 
      setUserDetails(response.data.profile);
      setProducts(response.data.ownedproduct )
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
                <p>Phone: <br/><br/>{userDetails.email}</p>
                <hr/>
                <p>Address: <br/><br/>{userDetails.email}</p>
                <hr/>

                {/* Add more user details here */}
              </div>
              </div>
            )}

            {activeTab === "products" && Array.isArray(products) && products.length > 0 && (
              <div>
                <div className='personal-info'>
                <h1 className="mphead-personal-info">My Products</h1>
                <div className='listing-admin'>
                <section id="productList">
                {products.map((product) => (
                  <div className="product-box" key={product._id} >
                   <img className="product-image" src={product.images[0]?.url} alt={product.name} />
                   <h3 className="product-name">{product.brand}</h3>
                    <p className="product-title">{product.title}</p>
                    <p className="product-price">Rs.{product.price}/day</p>
          </div>
        ))}
      </section>
  </div>
                  </div>
              </div>
            )}

            {activeTab === "rentals" && (
              <div>
                <div className='personal-info'>
                <h1 className="mphead-personal-info">My Rentals</h1>
                </div>
              </div>
            )}

            {activeTab === "cart" && (
              <div>
                <div className='personal-info'>
                <h1 className="mphead-personal-info">Cart items</h1>
                </div>
              </div>
            )}

            {activeTab === "payment" && (
              <div> 
                <div className='personal-info'>
                <h1 className="mphead-personal-info">Payments</h1>
                <div className='personal-info-details'>
                <p></p>
                <hr/>
                
              </div>
                  </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
