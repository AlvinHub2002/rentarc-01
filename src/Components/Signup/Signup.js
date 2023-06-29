import React from 'react'
import './Signup.css'
import axios from 'axios'
import { useEffect,useState } from 'react';
import logo from './logo.png'
import { Link,useNavigate } from 'react-router-dom';
import validation from './Validate_signup'
import Swal from 'sweetalert2';
import jwtDecode from 'jwt-decode';
import { post } from 'jquery';

function Signup() {

    const history=useNavigate();
    const [errors,seterrors]=useState({}); 
    const [Firstname,setFirstname]=useState('')
    const [Lastname,setLastname]=useState('')
    const [email,setEmail]=useState('')

    const [mail,setmail]=useState('')
    const [Fname,setFname]=useState('')
    const [Lname,setLname]=useState('')
    const [pass,setPass]=useState('')

    const [password,setPassword]=useState('')
    const [Confirm,setConfirm]=useState('')
    

    function handleCallbackResponse(response) {

        console.log("Encoded JNT ID Token: " + response.credential);
        var userObject = jwtDecode(response.credential);
        console.log(userObject)
        setFname(userObject.given_name)
        setLname(userObject.family_name)
        setmail(userObject.email)
        // console.log(email)
        // document.getElementById("signindiv").hidden=false;
        
      }

      useEffect(() => {
        if (mail&&Fname&&Lname) {
          handlegooglesignin();
        }
      }, [mail],[Fname],[Lname]);

      const handlegooglesignin = async () => {
        try {
            let postData = {
                Fname,
                Lname,
                mail,
                pass: '', // No password for Google signup
              };
              
          console.log(postData)
      
          await axios.delete('http://localhost:3000/Signup',{data:postData})
          .then(res=>{
            if(res.data==='exist'){
                Swal.fire('Error!', 'Email already exists.', 'error');
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
           
        catch (e) {
          console.log(e);
        }
      };

      useEffect(() => {
        if (window.google && window.google.accounts) {
          window.google.accounts.id.initialize({
            client_id: "129975762983-2qahfu9eqlhdtinrpcsdaa1sj6h244q4.apps.googleusercontent.com",
            callback: handleCallbackResponse,
          });
    
          window.google.accounts.id.renderButton(
            document.getElementById("signindiv"),
            { theme: 'outline', size: "large",width: "100%" }
          );
        }
      }, []);


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
            <div className='signup-divider'>
                    <div className='signup-divider-line'></div>
                    <div className='signup-divider-text'>OR</div>
                    <div className='signup-divider-line'></div>
            </div>
            <div id="signindiv"></div>
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
