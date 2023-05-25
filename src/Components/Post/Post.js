import React, { useState } from 'react';
import './Post.css'
const PostProductForm = () => {
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [images, setImages] = useState([]);

  const handleImageUpload = (event, index) => {
    const file = event.target.files[0];
    const uploadedImage = URL.createObjectURL(file);
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = uploadedImage;
      return updatedImages;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform logic to post the product data
  };

  return (
    <div className='post'>
    <form onSubmit={handleSubmit}>
    <h1 className='product-detail-heading'>Product Details</h1>
      <div className='product-details'>
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Furniture">Furniture</option>
          {/* Add more options as needed */}
        </select>
      </div>

      <div>
        <label htmlFor="brand">Brand:</label>
        <input
          type="text"
          id="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className="image-upload-container">
        <label htmlFor="images">Upload Images:</label>
        <div className="upload-box-container">
          {Array.from(Array(5), (_, index) => (
            <div className="upload-box" key={index}>
              {images[index] && (
                <img className="image-preview" src={images[index]} alt="Preview" />
              )}
              <input
                type="file"
                id={`image-upload-${index}`}
                accept="image/*"
                onChange={(e) => handleImageUpload(e, index)}
              />
              <label htmlFor={`image-upload-${index}`}><span>+</span></label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="contact">Contact:</label>
        <input
          type="text"
          id="contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </div>
      <div className='post-button'>
      <button type="submit">Post</button>
      </div>
    </form>
    </div>
  );
};

export default PostProductForm;
