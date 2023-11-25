import React, { useEffect, useState } from 'react'
import logo from './favicon.png'
import api from '../api/axiosConfig'
import './Navbar.css'
import Cookies from 'universal-cookie';

const Navbar = () => {

  const [User,setData] = useState()
  const [admin,setAdmin] = useState(false)
    
  const handleMenuClick = () => {
    const x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  };

  const logout=() =>{
    const removeCookie = (name) => {
        const expirationDate = new Date(0);
        document.cookie = `${name}=; expires=${expirationDate.toUTCString()}; path=/`;
    };
    removeCookie('userId');
    window.location.href='http://localhost:8080/nivak/cars/login?logout';
  }


  const getUserData=async ()=>{
    const cookies = new Cookies();
    const cookieValue = cookies.get('userId');
    const response = await api.get(`/nivak/cars/user/${cookieValue}`)
    const datas = response.data
    if (datas?.role === 'admin') {
      setAdmin(true)
    }
    setData(datas)
  }

  useEffect(()=>{
    getUserData();
  })

  return (
    <div>
        <div className="topnav" id="myTopnav">
            <a href="/"><img src={logo} alt="logo" className="active logo"/></a>
            <div className="left-content">
            {admin && <a href="/addcar">AddCar</a>}  
            <a href="/profile">Profile</a>
            <a href="#" onClick={logout}>Logout</a>
            </div>
            <a href="javascript:void(0);" className="icon" onClick={handleMenuClick}>
          <i className="fa fa-bars"></i>
        </a>
        </div>
    </div>
  )
}

export default Navbar