import React from 'react'
import logo from './logo.png'
import validation from './Validation'
import { Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import './Login.css'
import axios from 'axios'
import avatar from'./avatar.png'
// import { render } from '@testing-library/react';
function Login() {

    const navigate=useNavigate();

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')


    const [errors,seterrors]=useState({});

    async function submit(e){
        e.preventDefault();

        seterrors(validation(email,password));
        if(Object.keys(errors).length===0){
          try{
             await axios.post('http://localhost:3000/',{
                email,password
             })
             .then(res=>{
                if(res.data==='success'){
                    navigate('/Navbar')
                }
                else if(res.data==='wrongpass'){
                    alert("wrong credentials")
                }
                else if(res.data==='notexist'){
                    alert("not registered")
                }
             })

             .catch(e=>{
                alert('wrong details')
                console.log(e);
             })
        }
        catch(e){
            console.log(e)
        }
    }

    }



  return (
    <div className='login-page'>
    <div className='login'>
        <div className='avatar'>
            <img src={avatar} alt="" />
        </div>
        <h2>Login</h2>
        <h3>Welcome back </h3>
        <form className='login-form' action='POST'>
            <div className='textbox'>
                <input type='email' onChange={e => setEmail(e.target.value)}  placeholder='Username' name='email' />
                {errors.email && <p className='error'>{errors.email}</p>}
            </div>
            <div className='textbox'>
                <input type="password"  required onChange={e => setPassword(e.target.value)}  placeholder='password' name='password' />
                {errors.password && <p className='error'>{errors.password}</p>}
            </div>
            <button type="submit"  onClick={submit}>Login</button>
            <Link to='/Signup'>Register for an account </Link>
        </form>
    </div>
    <div className='under'>
    <div className='logo'>
            <img src={logo} alt="" />
        </div>
        <div className='foot'>
            <p>RentArc</p>
        </div>
        </div>
    </div>
  )
}

export default Login
