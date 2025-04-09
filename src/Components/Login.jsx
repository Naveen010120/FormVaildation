import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import loginImage from '../assets/login-image.avif'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export default function Login() {
     let [formValues,setFormValue]=useState({
       
        email:'',
        password:'',
      })
      let navigate=useNavigate()
      let handleChange=(e)=>{
        let {name,value}=e.target;
        setFormValue(prev=>({
          ...prev,
          [name]:value
        }))
      }
      let handleSubmit=(e)=>{
          e.preventDefault();
          
          let emailError=document.getElementById('emailError');
          let passwordError=document.getElementById('passwordError');
          
          let {email,password}=formValues;
          
          let vaildatingData=JSON.parse(localStorage.getItem('validedFormData'))
          let vaild=true;
          console.log(vaildatingData)
          let filteringVaildatingData=vaildatingData.find(item=>item.email==email && item.password==password)
          console.log(filteringVaildatingData)
          
          if(!/\S+@\S+\.\S+/.test(email) ){
              emailError.innerHTML='enter vailded email';
              vaild=false
    
        }
       
        if(password.length<6){
          passwordError.innerText='password length should be more then 6 letters';
          vaild=false
        }
       if(!filteringVaildatingData){
        toast.error('login failed');
        vaild=false
       }
      if(vaild){
        toast.success('Login successfull')
        setTimeout(()=>{

            navigate('/home')
        },2000)
      }

    
      }
  return (
    <>
    <main>
    <ToastContainer position="top-right" autoClose={3000} />
    <div className="register-image" style={{maxHeight:'400px',overflow:'hidden'}}>
        <img src={loginImage} alt="" style={{height:'100%'}}/>
      </div>
   
     <div className="container">
          <h1>Login Form</h1>
            <form onSubmit={handleSubmit}>
              
              <input type="email" name="email" placeholder='Email' value={formValues.email} onChange={handleChange}/>  <span id='emailError'></span>
              <input type="password" name="password"  placeholder='Password' value={formValues.password} onChange={handleChange}/> <span id='passwordError'></span>
             
              <input type="submit" value="SingUp" />
            <div className="exist-content">
            <p>Create new account ? <Link to={'/'}>click here </Link></p>
            </div>
            </form>
          </div>
          </main>
          </>

  )
}
