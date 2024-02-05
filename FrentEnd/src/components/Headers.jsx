import React from 'react'
import logo from '../images/logo.jpg'

import {
  Link
} from "react-router-dom";


function Headers() {
  const blueBack = {
    backgroundColor:"#0a146e",
  }
  const sticky = {
    position:"sticky",
    top:0
  }
  const white = {
    color:"white !important"
  }
 
  return (

    <header className="container-fluid" style={blueBack} >
      <div className="container-fluid header2" style={sticky}>
      <nav className="navbar navbar-expand-lg text-white navbar-light"  style={blueBack}>
            <a className="navbar-brand text-white image-fulid d-block " href="#"><img src={logo} width="60px" height="60px" alt="brand-logo-img" /></a>
            

            <div className=" container-fluid-sm d-felx collapse navbar-collapse " id="navbarSupportedContent">
              <ul className='navbar-nav pe-5'>
                <li className="nav-item text-white">
                  <a className="nav-link text-white" href="#">Persional</a>
                </li>
                <li className="nav-item text-white">
                  <a className="nav-link text-white" href="">|</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#"  data-toggle="dropdown">
                    Business
                  </a>
                </li>

              </ul>
              <ul className="navbar-nav mr-auto d-flex justify-content-arround ps-5">

                <li className="nav-item active ps-5">
                  <a className="nav-link text-white" href="#"> <span className="sr-only">(current)</span></a>
                </li>

                <li className="nav-item text-white">
                  <a className="nav-link text-white" href="#">SendMoney</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#"  data-toggle="dropdown">
                    Convertor
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">Currency</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">Tools</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">Resources</a>
                </li>
              </ul>
              <ul className='navbar-nav ps-2'>
                <Link to="/">
                <li className="nav-item">
                  <a href="" className="nav-link text-white">SignIn</a>
                </li>
                </Link>
                <Link to="/signup">
                <li className="nav-item">
                  <a href="" className="nav-link text-white">Register</a>
                </li>
                </Link>
              </ul>
              
              
            </div>
</nav>
      </div>
    </header>
  )
}

export default Headers
