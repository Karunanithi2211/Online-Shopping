import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Cookies from 'universal-cookie';
import api from '../api/axiosConfig'
import './Home.css'

const Home = () => {

  //Use States
  const [Datas,setData] = useState()
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  
  const handleFilterChange = (e) => {
      setSearch(e.target.value.toLowerCase().replace(/\s/g, ''));
  };

  const removeSpacesAndLowerCase = (text) => {
      return text.replace(/\s/g, '').toLowerCase();
  };

  // Getting datas from api
  const getUserData=async ()=>{
      const cookies = new Cookies();
      const cookieValue = cookies.get('userId');
      const response = await api.get('/nivak/cars/allcar')
      const datas = response.data
      setData(datas)
  }


  //filter functions
  const filterSelection = (c) => {
    const x = document.getElementsByClassName('column');
    if (c === 'all') c = '';
    for (let i = 0; i < x.length; i++) {
      RemoveClass(x[i], 'show');
      if (x[i].className.indexOf(c) > -1) AddClass(x[i], 'show');
    }
  };

  const AddClass = (element, name) => {
    const arr1 = element.className.split(' ');
    const arr2 = name.split(' ');
    for (let i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) === -1) {
        element.className += ` ${arr2[i]}`;
      }
    }
  };

  const RemoveClass = (element, name) => {
    let arr1 = element.className.split(' ');
    const arr2 = name.split(' ');
    while (arr2.length > 0) {
      if (arr1.indexOf(arr2[0]) > -1) {
        arr1 = arr1.filter((item) => item !== arr2[0]);
      }
      arr2.shift();
    }
    element.className = arr1.join(' ');
  };

  const handleFilterClick = (filterType) => {
    setFilter(filterType);
  };
  
  useEffect(()=>{
    getUserData()
    filterSelection(filter)
  })
  const filteredData = Datas?.filter((data) => {
    return removeSpacesAndLowerCase(data.carname).includes(search);
  });

  return (
    <div>
      <Navbar/>
      <div id="myBtnContainer">
        <button className={`btn ${filter === 'all' ? 'active' : ''}`} onClick={() => handleFilterClick('all')}>Show all</button>
        <button className={`btn ${filter === 'sport' ? 'active' : ''}`} onClick={() => handleFilterClick('sport')}>Sports</button>
        <button className={`btn ${filter === 'luxury' ? 'active' : ''}`} onClick={() => handleFilterClick('luxury')}>Luxury</button>
        <button className={`btn ${filter === 'hyper' ? 'active' : ''}`} onClick={() => handleFilterClick('hyper')}>Hyper</button>
        <input type="text" name="search" placeholder="Search.." onChange={handleFilterChange}/>
        {/* Add more buttons for different filter types */}
      </div>
      <div className='products'>
        <div className="row">

      {
        filteredData?.map((data)=>{
          return(
            <div className={`column ${data?.type}`}>
              <div>
                <div className='cards'>
                  <div class="card">
                      <img src={api.defaults.baseURL+data?.images[0]}  style={{width: '100%'}} alt="Product Picture"/>
                    <h1>{data?.carname}</h1>
                    <p class="price">{data?.price} {data?.pricetag}</p>
                    <p><a href={`/detail/${data?.carid}`}><button>Details</button></a></p>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      }
        </div>
              
    </div>


      
    </div>
  )
}

export default Home