import React from 'react'
import './App.css'
import Post from './Components/Post/Post'
// import Hero from './Components/Heropage/Hero'
// import Navbar from './Components/Navbar/Navbar'
// import Login from './Components/Login/Login'
import { Routes, Route } from 'react-router-dom';
import ProductList from './Components/Product_Listing/ProductList';
// import Signup from './Components/Signup/Signup'
function App() {
  return (
  <div className='app'>
    <Routes>
      <Route path='/' element={<Post/>} />
      <Route path='/product-list' element={<ProductList/>} />
    </Routes>
  </div>

  // <div className='app'>
  //   
  // </div>
)
}
export default App
