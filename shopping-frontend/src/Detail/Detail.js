import React, { useEffect, useState } from 'react'
import api from '../api/axiosConfig'
import { useParams } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Carousel from 'react-material-ui-carousel'
import './Detail.css'

const Detail = () => {

    const param = useParams()
    const carid = param.carid;
    const [cars,setCars] = useState()

    const getUserData=async (carid)=>{
        const response = await api.get('/nivak/cars/carbyid/'+carid)
        const datas = response.data
        setCars(datas)
    }

    useEffect(()=>{
        getUserData(carid)
    })


  return (
    <div>
        <Navbar/>
        <div className='detail'>
            <div className='detail-container'>
                <div className='carousel-container'>
                    <Carousel animation="slide" indicators={false} timeout={500}>
                    {
                        cars?.images.map((image) => (
                        <div className='image-container-detail'>
                            <img src={api.defaults.baseURL + image} alt={cars?.name} className=''/>
                        </div>
                    ))}
                    </Carousel>
                </div>
                <h1>{cars?.carcompany} {cars?.carname}</h1>
                <h3>{cars?.price} {cars?.pricetag}</h3>
                <p>{(cars?.type === 'sport') &&  <span>Sports</span>}</p>
                <p>{(cars?.type === 'luxury') &&  <span>Luxury</span>}</p>
                <p>{(cars?.type === 'hyper') &&  <span>Hyper</span>}</p>
                <br/>
                <div style={{maxWidth: "90%", textAlign: 'left', marginLeft: '5%'}}>
                    <h3>Specification</h3>
                    {cars?.specs.map((spec)=>{
                        const specsofarray = spec.split(': ');
                        return(
                            <div>
                                <p>{specsofarray[0]} : {specsofarray[1]}</p>
                            </div>
                        )
                    })}
                    <h3>Description</h3>
                    <p>{cars?.description}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Detail