import React from 'react'
import './App.css'
// import Hero from './Components/Heropage/Hero'
import Navbar from './Components/Navbar/Navbar'
import Login from './Components/Login/Login'
import { Routes, Route } from 'react-router-dom';
import Signup from './Components/Signup/Signup'
function App() {
  return (
  <div className='app'>
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/Signup' element={<Signup/>} />
      <Route path='/Navbar' element={<Navbar />} />
    </Routes>
  </div>
)
}
export default App
