import React, { useEffect } from 'react';
import {useState} from 'react';
import Convertor from './Convertor';
import axios from 'axios';

const blueBack = {
    backgroundColor:"#0a146e",
    minHeight:"40vh"
  }

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('token'));

  //auth api call
  const userAuthentication = async (t) =>{
    try{
      let tok = t;
    const response = await axios.post('http://127.0.0.1:3500/protected',{},{
      headers:{
      'Accept':'application/json',
      'Content-Type':'application/json',
      'x-access-token' : tok
    }})
     if(response){
      setIsLoggedIn(response.data.success)
     }

  }catch(err){
    setIsLoggedIn(false)
  }
  } 

  useEffect(() =>{
    userAuthentication(token)
  },[token])
  
    
  return (
    <main style = {{position:"relative"}} >
        <div className="container-fluid text-center text-white " style={blueBack}>
            <p className="h1">
                Xe Currency Convertor
            </p>
            <p className='diplay-3'>
                check live foreign currency exchange
            </p>
        </div>
        {(isLoggedIn)&&<Convertor/>}
    </main>
  )
}

export default Main
