import React from 'react'
import './App.css'
import Post from './Components/Post/Post'
import Navbar from './Components/Navbar/Navbar'
import Login from './Components/Login/Login'
import { Routes, Route } from 'react-router-dom';
import ProductDetail from './Components/Product_detail/ProductDetail';
import ProductList from './Components/Product_Listing/ProductList';
import Signup from './Components/Signup/Signup'
import Categorypage from './Components/Category_list/Categorypage'
import AdminPortal from './Components/Admin/Admin'
import Confirmation from './Components/Confirmation/Confirmation'
import Profile from './Components/Profile/Profile'
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
      </Routes>
  </div>
)
}
export default App
