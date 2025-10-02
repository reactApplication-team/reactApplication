import React from "react";
import { Link } from "react-router-dom";
import axios from "axios" 
import { useEffect,useState } from "react";

const ListItem = () => {
  const [itemCard,setItemCard]=useState([]);
  
  useEffect(()=>{
  const getItems = async () => {
    try {
      const {data} = await axios.get('https://dummyjson.com/products/?limit=190')
      console.log(data)
      setItemCard(data.products)
    } catch (error) {
      console.log(error) 
    }};
    getItems();
  },[])
   
  return (
    <div >
      {
        itemCard.map(item=>(
          <div key={item.id}>
            <h3>{item.title}</h3>
            <p>${item.price}</p>
            <img src={item.thumbnail} alt={itemCard.title} />
          </div>
        )
        )
      }
      
    </div>
  )
}

export default ListItem