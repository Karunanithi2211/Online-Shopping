import React, { useEffect, useState } from 'react'
import api from '../api/axiosConfig'
import Cookies from 'universal-cookie'
import './Profile.css'
import Navbar from '../Navbar/Navbar'
import customprofile from './profile.png'

const Profile = () => {

  const [User,setData] = useState()
  const [admin,setAdmin] = useState(false)


  const getUserData=async ()=>{
      const cookies = new Cookies();
      const cookieValue = cookies.get('userId');
      const response = await api.get(`/nivak/cars/user/${cookieValue}`)
      const datas = response.data
      if (datas?.role === 'admin') {
        setAdmin(true);
      }
      setData(datas)
  }


  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('email',User?.email)
    formData.append('file', file);

    try {
      const response = await api.post('/nivak/cars/uploadprofilepic', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };


useEffect(()=>{
  getUserData();
  console.log(User?.profilepic)
},[])

  return (
    <div >
      <Navbar/>
      <div class="profilecard">
        {User?.profilepic ? (
                  <div className='image-container'>
                    <img src={api.defaults.baseURL+User?.profilepic} className='profileimage' alt="Profile Picture" id='profileimage'/>
                    <label for="fileInput" className="uploadfile" id='uploadfile'>
                      <input type="file" id="fileInput" className="file-input" onChange={handleFileUpload}/>
                      <span>Update Profile</span>
                  </label>
                  </div>
              ) : (
                <div className='image-container'>
                  <img src={customprofile} className='profileimage' alt="Profile Picture" id='profileimage'/>
                  <label for="fileInput" className="uploadfile" id='uploadfile'>
                    <input type="file" id="fileInput" className="file-input" onChange={handleFileUpload}/>
                    <span>Update Profile</span>
                </label>
                </div>
              )}
        <h1>{User?.firstname} {User?.lastname} {admin && <span className='title' style={{fontSize:"medium"}}>({User?.role})</span>}</h1>
        <p class="title">{User?.gender?.toUpperCase()}</p>
        <p>{User?.age}</p>
        <p>{User?.email}</p>
      </div>
    </div>
  )
}

export default Profile