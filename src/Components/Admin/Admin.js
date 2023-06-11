import React, { useState } from 'react';
import './Admin.css';

const VerifiedProducts = () => {
  return <h2>Verified Products Page</h2>;
};

const UnverifiedProducts = () => {
  return <h2>Unverified Products Page</h2>;
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
