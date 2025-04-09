import React, { useEffect, useState } from 'react'
import img from '../assets/loading-gif.gif'
import './CardDetails.css'

export default function CardDetails() {
    let [loading,setLoading]=useState(true)
    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false)
            gettingDataFromLocalStroage();
        },1000)
    },[])
    let gettingDataFromLocalStroage=()=>{
      return JSON.parse(localStorage.getItem('detailsOfCard'))
    }
    let retriveData=gettingDataFromLocalStroage();
    let {title,image,category,description,price}=retriveData;
  return (
    <>
    <main>

   
    {
        loading ?
        <div className="img-container">
            <img src={img} alt="" />
        </div>:
        <div className="container">
            <div className="main-image">
                <img src={image} alt={title} />
            </div>
            <div className='cards'>
                <h1>{title}</h1>
                <h3>{category}</h3>
                <p>{description}</p>
                <p className='price'>{price}₹</p>

            </div>
        </div>
    }
     </main>
    </>
  )
}
