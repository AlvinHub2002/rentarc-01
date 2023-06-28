import React from 'react'
import './Signup.css'
import axios from 'axios'
import { useState} from 'react';
import logo from './logo.png'
import { Link,useNavigate } from 'react-router-dom';
import validation from './Validate_signup'
import Swal from 'sweetalert2';

function Signup() {

    const history=useNavigate();
    const [errors,seterrors]=useState({});


    const [Firstname,setFirstname]=useState('')
    const [Lastname,setLastname]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [Confirm,setConfirm]=useState('')



    async function submit(e){
        e.preventDefault();
            seterrors(validation(Firstname,Lastname,email,password,Confirm));
            if(Object.keys(errors).length===0){
            try{
                const result = await Swal.fire({
                    title: 'RentArc',
                    text: 'You are about to create an account',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Ok',
                    cancelButtonText: 'Cancel',
                  });
                  if(result.isConfirmed){
             await axios.post('http://localhost:3000/Signup',{
                Firstname,Lastname,email,password
             })
             .then(res=>{
                if(res.data==='exist'){
                    Swal.fire('Error!', 'Emial already exists.', 'error');
                }
                else if(res.data==='perfect'){
                    Swal.fire('Created!', 'Account created .', 'success');
                    history('/')
                }
                else if(res.data==='incomplete'){
                    Swal.fire('Error!', 'Failed to create account.', 'error');
                }
             })

             .catch(e=>{
                alert('wrong details of signup')
                console.log(e);
             })
        }
    }
        catch(e){
            console.log(e)
        }
    }

    }


  return (
    <div className='signup-page'>
        <form className='form'>
            <p className='title'>Register</p>
            <p className='message'>Signup now to enjoy RentArc</p>
            <div className='flex'>
                <label>
                    <input required  onChange={(e)=>{setFirstname(e.target.value)}}  placeholder='' type='text' className='input' name='Firstname'/>
                    <span>Firstname</span>
                    {errors.Firstname && <p className='error'>{errors.Firstname}</p>}
                </label>
                <label>
                    <input required onChange={(e)=>{setLastname(e.target.value)}}  placeholder='' type='text' className='input' name='Lastname'/>
                    <span>Lastname</span>
                    {errors.Lastname && <p className='error'>{errors.Lastname}</p>}
                </label>
            </div>
            <label>
                <input required  onChange={(e)=>{setEmail(e.target.value)}} placeholder='' type='email' className='input' name='Email'/>
                <span>Email</span>
                {errors.email && <p className='error'>{errors.email}</p>}
            </label>
            <label>
            <input required onChange={(e)=>{setPassword(e.target.value)}}  placeholder='' type='password' className='input' name='password'/>
                <span>Password</span>
                {errors.password && <p className='error'>{errors.password}</p>}
            </label>
            <label>
            <input required  onChange={(e)=>{setConfirm(e.target.value)}} placeholder='' type='password' className='input' name='Confirm'/>
                <span>Confirm password</span>
                {errors.Confirm && <p className='error'>{errors.Confirm}</p>}
            </label>
            <button type='submit' className='submit' onClick={submit}>Submit</button>
            <p className='signin'>
                Already have an account? <span><Link to='/'>Sign in</Link></span>
            </p>
        </form>
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

export default Signup
