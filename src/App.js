import React from 'react'
import Login from './Components/Login/Login'
import { Routes, Route } from 'react-router-dom';
import Signup from './Components/Signup/Signup'
function App() {
  return (
    // <div>
    //   <Login/>
    //   <Signup/>
    // </div>
  <div className='app'>
    <Routes>
      <Route path='/' element={<Signup/>} />
      <Route path='/Login' element={<Login/>} />
    </Routes>
  </div>
  )
}
export default App
