import React from 'react'
import logo from './logo.png'
import Swal from 'sweetalert2';
import validation from './Validation'
import { Link, useNavigate} from 'react-router-dom';
import { useEffect,useState } from 'react';
import jwtDecode from 'jwt-decode';
import './Login.css'
import axios from 'axios'
import avatar from'./avatar.png'
// import { render } from '@testing-library/react';
function Login() {

    const navigate=useNavigate();

    const [email,setEmail]=useState('')
    const [mail,setmail]=useState('')
    const [password,setPassword]=useState('')


    const [errors,seterrors]=useState({});
    // const [user,setUser]=useState({}); 

    function handleCallbackResponse(response) {
        console.log("Encoded JNT ID Token: " + response.credential);
        var userObject = jwtDecode(response.credential);
        console.log(userObject)
        console.log(userObject.email)
        setmail(userObject.email)
        console.log(email)
    
    }

    

    useEffect(() => {
        if (window.google && window.google.accounts) {
            window.google.accounts.id.initialize({
            client_id: "129975762983-2qahfu9eqlhdtinrpcsdaa1sj6h244q4.apps.googleusercontent.com",
            callback: handleCallbackResponse,
        });

      window.google.accounts.id.renderButton(
            document.getElementById("signindiv"),
            { theme: 'outline', size: "large", },
        );
    }
  }, []);

  useEffect(() => {
    if (mail) {
      handlegooglesignin();
    }
  }, [mail]);

  const handlegooglesignin = async () => {
    try {
      let postData = {
        mail,
        password: '', // No password for Google signup
      };
      console.log(postData)
  
      await axios.delete('http://localhost:3000/',{data:postData})
      .then(res=>{
        if(res.data==='success-user'){
            Swal.fire('RentArc!', 'Welcome to RentArc.', 'success');
            localStorage.setItem('LoggedIn', mail);
            navigate('/Navbar')
        }
        else if(res.data==='success-admin'){
            Swal.fire('RentArc!', 'Welcome to RentArc.', 'success');
            localStorage.setItem('LoggedIn', mail);
            navigate('/AdminPortal')
        }

        else if(res.data==='wrongpass'){
            Swal.fire('Error!', 'Wrong credentials.', 'error');
        }
        else if(res.data==='notexist'){
            Swal.fire('Error!', 'Not registered.', 'error');
        }
     })

     .catch(e=>{
        alert('wrong details')
        console.log(e);
     })
}
       
    catch (e) {
      console.log(e);
    }
  };


  async function submit(e){
    e.preventDefault();

    seterrors(validation(email,password));
    if(Object.keys(errors).length===0){
      try{
         await axios.post('http://localhost:3000/',{
            email,password
         })
         .then(res=>{
            if(res.data==='success-user'){
                Swal.fire('RentArc!', 'Welcome to RentArc.', 'success');
                localStorage.setItem('LoggedIn', email);
                navigate('/Navbar')
            }
            else if(res.data==='success-admin'){
                Swal.fire('RentArc!', 'Welcome to RentArc.', 'success');
                localStorage.setItem('LoggedIn', email);
                navigate('/AdminPortal')
            }

            else if(res.data==='wrongpass'){
                Swal.fire('Error!', 'Wrong credentials.', 'error');
            }
            else if(res.data==='notexist'){
                Swal.fire('Error!', 'Not registered.', 'error');
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
            <button type="submit" onClick={submit}>Login</button><br /><br /><br />
            <div className='login-divider'>
                <div className='login-divider-line'></div>
                <div className='login-divider-text'>OR</div>
                <div className='login-divider-line'></div>
            </div>
            <div id="signindiv"></div>
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
