import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import AddCar from './AddCar/AddCar';
import Detail from './Detail/Detail';

function App() {

  const setPersistentCookie = () => {
    const cookies = new Cookies();
    const cookieValue = cookies.get('userId');
    if (cookieValue == 'undefined') {
        window.location.href="http://localhost:8080/nivak/cars/login?lif"
    } else {
      const expirationDate = new Date();
      expirationDate.setFullYear(expirationDate.getFullYear() + 1);
      document.cookie = `userId=${cookieValue}; expires=${expirationDate.toUTCString()}; path=/`;
    }
  };

  useEffect(()=>{
    setPersistentCookie();
  })

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/addcar' element={<AddCar/>}/>
          <Route path='/detail/:carid' element={<Detail/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
