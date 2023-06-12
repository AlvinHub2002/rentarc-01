import React, { useState } from 'react';
import './Admin.css';
import  { useEffect } from 'react';
import axios from 'axios';
import '../Product_Listing/ProductList.css'

const VerifiedProducts = () => {
  const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchData();
      }, []);
 
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3000/AdminPortal');
          setProducts(response.data);
        } catch (error) {
          console.error(error);
        }
      };

  return (
    <div className='prolis'>
    <h2 className='products-for-rent'>verified Products</h2>
  <div className='listing'>
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
  );
};

const UnverifiedProducts = () => {
    return(
      <h2>unverified product</h2>
    )
};

const AdminPortal = () => {
  const [selectedContent, setSelectedContent] = useState('dashboard');

  const handleContentChange = (content) => {
    setSelectedContent(content);
  };

  let content;
  if (selectedContent === 'verified-products') {
    content = <VerifiedProducts />;
  } else if (selectedContent === 'unverified-products') {
    content = <UnverifiedProducts />;
  } else {
    content = <h2>Dashboard</h2>;
  }

  return (
    <div className="admin-portal">
      <div className="sidebar-admin-portal">
        <div className="logo-admin-portal">
          {/* Logo */}
        </div>
        <nav className="sidebar-nav-admin-portal">
          <ul>
            <li>
              <button
                onClick={() => handleContentChange('dashboard')}
                className={selectedContent === 'dashboard' ? 'active' : ''}
              >
                <span className="button-text-admin-portal">Dashboard</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleContentChange('verified-products')}
                className={selectedContent === 'verified-products' ? 'active' : ''}
              >
                <span className="button-text-admin-portal">Verified Products</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleContentChange('unverified-products')}
                className={selectedContent === 'unverified-products' ? 'active' : ''}
              >
                <span className="button-text-admin-portal">Unverified Products</span>
              </button>
            </li>
            
          </ul>
        </nav>
      </div>
      <div className="main-content-admin-portal">
        <header className="header-admin-portal">
          <div className="header-container-admin-portal">
            <h1 className="header-title-admin-portal">Admin Portal</h1>
          </div>
        </header>
        <div className="contentadmin-portal">{content}</div>
      </div>
    </div>
  );
};

export default AdminPortal;
