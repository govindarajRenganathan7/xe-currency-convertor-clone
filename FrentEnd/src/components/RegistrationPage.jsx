import React from 'react';
import logo from '../images/logo.jpg';
import { useState } from 'react';
import{Link} from 'react-router-dom'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import { useHistory } from "react-router-dom"


const RegistrationPage = () => {
  let history = useHistory();

  
  const [user_name, setName] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState('');

  //use form
  const {register, handleSubmit, watch, formState:{errors}} = useForm();

const RegisterUser = async() => {
  try{
    const response = await axios.post('http://127.0.0.1:3500/user/signup', 
    {
      user_name,
      password,
      email,
      phone_number
    }
    )
    if(response.data.message){
    setToast(response.data.message)
    
    history.push('/')
  }
  }catch(err){
    
    if (err.response.data.message){
      setToast(err.response.data.message)
    }
    return console.log(err)
  }
  

}

  return (
    <section className='d-flex'>
        
        <div className="container wrapper justify-content-center">
            <div className="container-sm col-lg-6 mt-5 card">
                <div className="logo container mt-3 ">
                  <div className="conatainer">
                    <div className="container">
                    <img src = {logo} alt = "logo" className='' width = "50px" height = "50px" />
                    </div>
                  </div>
                </div>
                <div className="container header">
                  <div className="container">
                  <h3>Create Your Account</h3>
                  </div>
                  <div className="container">
                  <p>Please provide your credentials below.</p>
                  </div>
                </div>
                <form onSubmit={handleSubmit(RegisterUser)}>
                <div className="container-fluid">
                  
                  <div className="container">
                  <div className="mb-3">
                    <label htmlFor="user_name" className="form-label">Name</label>
                    < input type="text" className="form-control" id="user_name" {...register("user_name", {required:true})} onChange={e => setName(e.target.value) } value={user_name} placeholder="Name" />
                  </div>
                  {errors.user_name && <div className='alert alert-danger'>User name is required.</div>}
                  </div>
                  <div className="container">
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="Password" className="form-control" id="password"{...register("password", {required:true})} onChange={e => setPassword(e.target.value)} value={password} placeholder="*********"/>
                  </div> 
                  {errors.password && <div className="alert alert-danger">Password is required.</div>}
                  </div>
                    
                  <div className="container">
                  <div className="mb-3">
                    <label htmlFor="phone_number" className="form-label">Phone_number</label>
                    <input type="number" className="form-control" id="phone_number" onKeyDown={(evt) =>{ ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}} value={phone_number}{...register("phone_number", {required:true})} onChange={e => setPhoneNumber(e.target.value)} placeholder=""/>
                  </div> 
                  {errors.phone_number && <div className="alert alert-danger">Phone Number is required.</div>}
                  </div>
                  <div className="container">
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={email} {...register("email", {required:true})}onChange={e => setEmail(e.target.value)} placeholder="name@example.com"/>
                  </div> 
                  {errors.email && <div className="alert alert-danger">Email is required.</div>}                 
                  </div>
                  
                  <div className="container mb-3">
                    <input type="submit" className="btn btn-primary w-100 d-block" value={ 'Register' } />
                  </div>
                </div>
                  <div className="container">
                  {(toast) ? <div className="alert alert-danger">{toast}</div>: ''}
                  </div>
                </form>
                <div className="container text-center pb-3">
                    <Link to = "/signin" >
                        Already have an account?<a href="">SignIn</a>
                    </Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default RegistrationPage
