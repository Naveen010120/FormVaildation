import { useEffect, useState } from "react";
import axios from 'axios';
import './App.css'
import img from './assets/loading-gif.gif'
import { Link } from "react-router-dom";


function App() {

  let [data,setData]=useState([]);
  let [loading,setLoading]=useState(true)
  let [inputField,setInputField]=useState('')
  let fetchingData=async()=>{
    try{
      setLoading(true);
      let res=await axios('https://fakestoreapi.com/products');
      setData(res.data)
    }
    catch(err ){
      console.log('error fetching:'+err)
    }
   finally{
    setLoading(false)
   }
    
  }
 
  useEffect(()=>{
    setTimeout(()=>{
      fetchingData();
    },1000)
  },[])
  let filterData=data.filter(item=>item.title.toLowerCase().includes(inputField.toLowerCase()))
  
  // console.log(data)
  let handleKnowMoreEvent=(item)=>{
    console.log(item)
    localStorage.setItem('detailsOfCard',JSON.stringify(item))
  }

  return (
    <>
    {
      loading? 
      <div className="loading-img">
      <img src={img} alt="" />
      </div>:
      <>
      <section>
      <input type="text" placeholder="Search for items.." value={inputField} onChange={(e)=>setInputField(e.target.value)}/>
    </section>
    <section>

    {filterData.length> 0 ?
      filterData.map(item=>(
        <div key={item.id} className="card">
          <div className="image-container">
            <img src={item.image} alt={item.title} />
          </div>
          <div className="content">
            <h3>{item.title}</h3>
            <h4>Price:{item.price}</h4>
            <Link to={'/cardDetails'} onClick={()=>handleKnowMoreEvent(item)}>Know More</Link>
          </div>
        </div>
        
      )):<p>No data found</p>
    }
</section>
</>
    }
      
  
    </>
  )
}

export default App
