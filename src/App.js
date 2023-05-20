import React from 'react'
import './App.css'
// import Hero from './Components/Heropage/Hero'
import Navbar from './Components/Navbar/Navbar'
// import Login from './Components/Login/Login'
// import { Routes, Route } from 'react-router-dom';
// import Signup from './Components/Signup/Signup'
function App() {
  return (
  // <div className='app'>
  //   <Routes>
  //     <Route path='/' element={<Signup/>} />
  //     <Route path='/Login' element={<Login/>} />
  //   </Routes>
  // </div>
  <div className='app'>
   <Navbar/>
   {/* <Hero/> */}
   </div>
)
}
export default App
