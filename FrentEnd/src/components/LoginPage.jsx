import React from 'react';
import logo from '../images/logo.jpg';
import { useState } from 'react';
import{Link} from 'react-router-dom'
import axios from 'axios';
import {useForm} from 'react-hook-form'
import { useHistory } from 'react-router-dom'


const LoginPage = ({Auth}) => {
  const [phone_number, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [toast,setToast] = useState('')


  //useForm
  const {register, handleSubmit, watch, formState:{errors}} = useForm();
  

  let history = useHistory();

  const signIn = async() => {
   
    try{
      const response = await axios.post('http://127.0.0.1:3500/user/signin', {
        password:password,
        phone_number:phone_number
        })
        if(response.data.message){
         localStorage.setItem("token", response.data.message);
         
          history.push('/home')
        }
    }catch(err){
      console.log(err)
      if(err.message){
        console.log(err.message);
        setToast(err.message);
      }
      if(err.response.data.message){
        setToast(err.response.data.message)
      }
      else{
        setToast('')
      }
     console.log(err.response.data.message);
    }
  }
  return (
    <section>
        <div className="container wrapper   d-flex">
            <div className="container-sm col-lg-6 mt-5 justify-content-center card">
                <div className="logo container mt-3 ">
                  <div className="conatainer">
                    <div className="container">
                    <img src = {logo} alt = "logo" className='' width = "50px" height = "50px" />
                    </div>
                  </div>
                </div>
                <div className="container header">
                  <div className="container mt-3">
                  <h3>Login</h3>
                  </div>
                  <div className="container pt-3">
                  <p>Please provide your credentials below.</p>
                  </div>
                </div>
                <form onSubmit={ handleSubmit(signIn) }>
                <div className="container-fluid">
                  
                <div className="container">
                  <div className="mb-3">
                    <label for="phone_number" className="form-label">Phone_number</label>
                    <input type="number" onKeyDown={(evt) =>{ ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}} className="form-control" id="phone_number"value={phone_number} {...register("phone_number", {required:true})} onChange = {(e) => {setPhoneNumber( e.target.value )}} placeholder=""/>
                  </div>
                  
                    {errors.phone_number && <div className="alert alert-danger ">Phone number is required.</div>}
                     
                  </div>
                  
                  <div className="container">
                  <div className="mb-3">
                    <label for="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password"{...register("password", {required:true})} value={password}
                    onChange = {(e) => {setPassword( e.target.value );}} placeholder="*********"/>
                  </div> 
                    {errors.password && <div className="alert alert-danger">Password is required.</div>}
                  </div>
                  <div className="container mb-3 mt-5">
                    <input type="submit" className="btn btn-primary w-100 d-block"  value={ 'Sign In' } />
                  </div>
                </div>
                <div className="container text-center pb-3">
                    <Link to = "/signup" >
                        <a href="">Create New Account</a>
                    </Link>
                </div>
                <div className="container">
                    {toast&&<div className="alert alert-danger">{toast}</div>}
                </div>
                </form>
            </div>
            
        </div>
    </section>
  )
}

export default LoginPage
