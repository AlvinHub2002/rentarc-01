import React, { useState,useEffect} from 'react';
import './Post.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const districtsInKerala = [
  'Alappuzha',
  'Ernakulam',
  'Idukki',
  'Kannur',
  'Kasaragod',
  'Kollam',
  'Kottayam',
  'Kozhikode',
  'Malappuram',
  'Palakkad',
  'Pathanamthitta',
  'Thiruvananthapuram',
  'Thrissur',
  'Wayanad'
];


const Post = () => {
  const history=useNavigate();

  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [district, setDistrict] = useState('');
  const [place, setPlace] = useState('');
  const [contact, setContact] = useState('');
  const [postDate, setPostDate] = useState('');
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

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US');
    setPostDate(formattedDate);
  }, []);

  // useEffect(() => {
  //   const username=localStorage.getItem('LoggedIn');
  // }, []);
  // console.log(username)


 const handleSubmit =async (event)=>{
  event.preventDefault();
  const formData = {
    category,
    brand,
    title,
    description,
    price,
    district,
    place,
    contact,
    images,
    postDate,
    username: localStorage.getItem('LoggedIn'),
  };
  console.log(formData.username)


  try{
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to submit your product',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ok',
      cancelButtonText: 'Cancel',
    });
    if(result.isConfirmed){
  
    await axios.post('http://localhost:3000/Post', formData, {
     
    })

    .then(res=>{
      if(res.data==='perfect'){
        Swal.fire('Submitted!', 'Product has been Submitted for verification.', 'success');
        history('/product-list')
      }
      else{
        Swal.fire('Error!', 'Failed to submit you product.', 'error');
      }
    })

  }
}
  catch (error) {
    console.error(error);
    // Handle the error
  }

  };

  return (
    <div className='post'>
    <form onSubmit={handleSubmit} method='POST' encType="multipart/form-data">
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
          <label htmlFor="location">District:</label>
          <select
            id="location"
            value={district}
            name="location"
            onChange={(e) => setDistrict(e.target.value)}
          >
            <option value="">Select a location</option>
            {districtsInKerala.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>


        <div>
        <label htmlFor="contact">Place:</label>
        <input
          type="text"
          id="place"
          name='place'
          value={place}
          onChange={(e) => setPlace(e.target.value)}
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

      <div>
          <label htmlFor="postDate">Post Date:</label>
          <input
            type="text"
            id="postDate"
            name="postDate"
            value={postDate}
            readOnly
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
