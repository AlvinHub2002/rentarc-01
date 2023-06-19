import React, { useState } from 'react';
import './Admin.css';
import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Product_Listing/ProductList.css'


const AdminPortal = () => {
  const [selectedContent, setSelectedContent] = useState('');
  const [products, setProducts] = useState([]);
  const [unverified, setUnverified] = useState([]);
  const history =useNavigate();



useEffect(() => {
  fetchData();
}, []);

const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:3000/AdminPortal');
    setProducts(response.data.productData);
    setUnverified(response.data.unverifiedProduct)
  } catch (error) {
    console.error(error);
  }
};

const handleProductClick = (id) => {
  localStorage.setItem('productId',id);
  history('/Product_detail/:id')
};

const handleUnverifiedProductClick=(id)=>{
  localStorage.setItem('productId',id);
  history('/Unverified/:id')
}


const VerifiedProducts = () => {

  return (
    <div className='prolis-admin'>
    <h2 className='verified-product'>Verified Products</h2>
  <div className='listing-admin'>
      <section id="productList">
        {products.map((product) => (
          <div className="product-box" key={product._id} onClick={()=>handleProductClick(product._id)}>
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
  return (
    <div className='prolis-admin'>
    <h2 className='verified-product'>Unverified Products</h2>
  <div className='listing-admin'>
      <section id="productList">
        {unverified.map((product) => (
          <div className="product-box" key={product._id} onClick={()=>handleUnverifiedProductClick(product._id)}>
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

const Dashboard=()=>{

}



  const handleContentChange = (content) => {
    setSelectedContent(content);
  };

  let content;
   if (selectedContent === 'dashboard') {
    content = <Dashboard />;
   }
  else if (selectedContent === 'verified-products') {
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
