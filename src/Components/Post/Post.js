import React, { useState } from 'react';
import './Post.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Post = () => {
  const history=useNavigate();

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
    const reader = new FileReader();
  
    reader.onload = () => {
      const base64Image = reader.result;
      setImages((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages[index] = base64Image;
        return updatedImages;
      });
    };
  
    reader.readAsDataURL(file);
  };
  console.log(images)



 const handleSubmit =async (event)=>{
  event.preventDefault();
  const formData = {
    category,
    brand,
    title,
    description,
    price,
    location,
    contact,
    images 
  };
//  console.log(formData.image)
// console.log(formData.images)
  try{
  
    await axios.post('http://localhost:3000/', formData, {
     
    })

    .then(res=>{
      if(res.data==='perfect'){
          alert('Product added successfully')
          history('/product-list')
      }
      else{
        alert('failed to add product')
      }
    })

  }
  
  catch (error) {
    console.error(error);
    // Handle the error
  }

  };

  return (
    <div className='post'>
    <form onSubmit={handleSubmit} method='POST' enctype="multipart/form-data">
    <h1 className='product-detail-heading'>Product Details</h1>
      <div className='product-details'>
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={category}
          name='category'
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          <option value="Photography and Videography">Photography and Videography</option>
          <option value="Power Tools">Power Tools</option>
          <option value="Home Accessories">Home Accessories</option>
          <option value="Gadgets">Gadgets</option>
          <option value="Medical Equipments">Medical Equipments</option>
          <option value="Camping and Outdoor">Camping and Outdoor</option>


          {/* Add more options as needed */}
        </select>
      </div>

      <div>
        <label htmlFor="brand">Brand:</label>
        <input
          type="text"
          id="brand"
          name='brand'
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          name='dscription'
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div>
        <label htmlFor="price">Rent per day:</label>
        <input
          type="number"
          id="price"
          name='price'
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
                name='image'
                multiple
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
          name='location'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="contact">Contact no:</label>
        <input
          type="text"
          id="contact"
          name='contact'
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

export default Post;
