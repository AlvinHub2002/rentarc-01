import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Post from './Components/Post/Post'
import Navbar from './Components/Navbar/Navbar'
import Login from './Components/Login/Login'
import ProductDetail from './Components/Product_detail/ProductDetail';
import ProductList from './Components/Product_Listing/ProductList';
import Signup from './Components/Signup/Signup'
import Categorypage from './Components/Category_list/Categorypage'
import AdminPortal from './Components/Admin/Admin'
import Confirmation from './Components/Confirmation/Confirmation'
import Profile from './Components/Profile/Profile'
import Unverified from './Components/Admin/AdminUnverifiedProduct/Unverified'
import MyProduct_detail from './Components/Profile/MyProduct-detail/MyProduct_detail'
import Rating from './Components/StarRating/Rating';
import MyRental_detail from './Components/Profile/MyRental_detail/MyRental_detail';
import AboutUs from './Components/AboutUs/AboutUs';
import PopupDisclaimer from './Components/PopupDisclaimer/PopupDisclaimer';

function App() {
  return (
  <div className='app'>
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/Signup' element={<Signup/>} />
      <Route path='/Navbar' element={<Navbar/>} />
      <Route path='/Post' element={<Post/>} />
      <Route path='/product-list' element={<ProductList/>} />
      <Route path='/Product_detail/:id' element={<ProductDetail/>} />
      <Route path='/Categorypage' element={<Categorypage/>} />
      <Route path='/AdminPortal' element={<AdminPortal/>} />
      <Route path='/AdminPortal' element={<AdminPortal/>} />
      <Route path='/Confirmation/:id' element={<Confirmation/>} />
      <Route path='/Profile' element={<Profile/>} />
      <Route path='/Unverified/:id' element={<Unverified/>} />
      <Route path='/MyProduct_detail/:id' element={<MyProduct_detail/>} />
      <Route path='/Rating/:id' element={<Rating/>} />
      <Route path='/MyRental_detail/:id' element={<MyRental_detail/>} />
      <Route path='/AboutUs' element={<AboutUs/>} />
      <Route path='/Disclaimer' element={<PopupDisclaimer/>} />


      </Routes>
  </div>
)
}
export default App
