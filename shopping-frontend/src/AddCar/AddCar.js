import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig'
import {v4} from 'uuid'
import Navbar from '../Navbar/Navbar';
import Cookies from 'universal-cookie';
import './AddCar.css'

const AddCar = () => {

  const getUserData=async ()=>{
    const cookies = new Cookies();
    const cookieValue = cookies.get('userId');
    const response = await api.get(`/nivak/cars/user/${cookieValue}`)
    const datas = response.data
    if (datas?.role !== 'admin') {
      window.location.href='http://localhost:3000/'
    }
  }


  const [carData, setCarData] = useState({
    carcompany: '',
    carname: '',
    type: '',
    price: 0,
    pricetag: '',
    specs: [],
    description: '',
    images: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'price' && !isNaN(value)) {
      setCarData({
        ...carData,
        [name]: parseFloat(value)
      });
    } else if (name === 'specs') {
      setCarData({
        ...carData,
        specs: value.split(',')
      });
    } else {
      setCarData({
        ...carData,
        [name]: value
      });
    }
  };
  

  const handleFileChange = (e) => {
    setCarData({
      ...carData,
      images: e.target.files
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const randomUUID = v4()
    const formData = new FormData();
    formData.append('carid',randomUUID)
    formData.append('carcompany',carData.carcompany)
    formData.append('carname', carData.carname);
    formData.append('type', carData.type);
    formData.append('price', carData.price);
    formData.append('pricetag', carData.pricetag);
    formData.append('description', carData.description);
    for (let i = 0; i < carData.images.length; i++) {
      formData.append('images', carData.images[i]);
    }
    formData.append('specs', carData.specs.join(',')); // Convert specs array to comma-separated string

    await fetch('http://localhost:8080/nivak/cars/uploadcars', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    window.location.href = 'http://localhost:3000';
  };

  useEffect(()=>{
    getUserData()
  })

  return (
    <div>
      <Navbar/>
      <div className='addcar'>
        <div className='addcar-detail'>
          <form onSubmit={handleSubmit}>
            <h1>AddCars</h1>
            <input type="text" name="carcompany" onChange={handleInputChange} placeholder='Car Company Name' className='input' /><br /><br/>

            <input type="text" name="carname" onChange={handleInputChange} placeholder='Car Model Name' className='input'/><br /><br/>

            <input type="text" name="type" onChange={handleInputChange} placeholder='Car Type' className='input'/><br /><br/>

            <input type="text" name="price" onChange={handleInputChange} placeholder='Car Price' className='input'/><br /><br/>

            <input type="text" name="pricetag" onChange={handleInputChange} placeholder='Car Price Tag' className='input'/><br /><br/>

            <textarea name="specs" onChange={handleInputChange} placeholder='Specs (Separate by commas)' className='input'/><br /><br/>

            <textarea name="description" onChange={handleInputChange} placeholder='Description' className='input'/><br /><br/>

            <label for="fileInput" class="custom-file-upload">
                <input type="file" className='file-input' name="images" multiple onChange={handleFileChange}/>
                Upload Images
            </label><br/><br/>

            <button type="submit">Add car</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCar;
