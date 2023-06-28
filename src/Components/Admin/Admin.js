import React, { useState } from 'react';
import './Admin.css';
import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Product_Listing/ProductList.css'
import Swal from 'sweetalert2';
import Headers from '../Common/Header'


const AdminPortal = () => {
  const [selectedContent, setSelectedContent] = useState('');
  const [products, setProducts] = useState([]);
  const [unverified, setUnverified] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [user,setUser]=useState([]);
  const history =useNavigate();



useEffect(() => {
  fetchData();
}, []);

const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:3000/AdminPortal');
    // setUserDetails(response.data.profile);
    setProducts(response.data.productData);
    setUnverified(response.data.unverifiedProduct)
    setAdmin(response.data.admin)
    setUser(response.data.user)
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

const Dashboard=()=> {
  return(
    
    <div>
      
      <div className='admin-dash'>
      <p>Name:<br/> <br/> {`${admin?.Firstname} ${admin?.Lastname}`}</p>
      <hr/>
        <p>Email:<br/> <br/>  {admin.email}</p>
        <hr/>
        
      </div>
 
    </div>
  );
}

const Users = () => {

  const handleDeleteUser = async (usermail) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to delete this user.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
      });
      if (result.isConfirmed) {
        await axios.delete('http://localhost:3000/AdminPortal',{
          data:{currentmail : usermail},
        }
        );
        Swal.fire('Deleted!', 'User has been deleted successfully.', 'success');
        // Fetch updated user list
        fetchData();
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error!', 'Failed to delete user.', 'error');
    }
  };

  return (
    <div className="users-content">
      <h2>Users</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user) => (
            <tr key={user.id}>
              <td>{user.Firstname}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="action-button" onClick={() => handleDeleteUser(user.email)} >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



  const handleContentChange = (content) => {
    setSelectedContent(content);
  };

  let content;
   if (selectedContent === 'dashboard') {
    // content = <Dashboard />;
   }
  else if (selectedContent === 'verified-products') {
    content = <VerifiedProducts />;
  } else if (selectedContent === 'unverified-products') {
    content = <UnverifiedProducts />;
  } else if (selectedContent === 'users') {
    content = <Users/>
  }
  else {
    content = <Dashboard />;
  }

  return (
    <div className="admin-portal">
      <Headers/>
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
            <li>
              <button
                onClick={() => handleContentChange('users')}
                 className={selectedContent === 'users' ? 'active' : ''}
                >
                  <span className="button-text-admin-portal">Users</span>
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
        <div className="contentadmin-portal">{content}
        {selectedContent === 'dashboard' && <Dashboard userDetails={admin} />}
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
