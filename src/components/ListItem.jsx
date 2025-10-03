import React from "react";
import { Link } from "react-router-dom";
import axios from "axios" 
import { useEffect,useState } from "react";
import { useItems } from "../context/ItemsContext";

const ListItem = () => {
  // const [itemCard,setItemCard]=useState([]);
  const { items,setItems} = useItems();
  
  useEffect(()=>{
    let ignore = false;
  const getItems = async () => {
    try {
      const {data} = await axios.get('https://dummyjson.com/products/?limit=190')
      console.log(data)
      // setItemCard(data.products);
      if (!ignore) setItems(data.products);
      setItems(data.products);
    } catch (error) {
      console.log(error) 
    }};
    if (!items || items.length === 0) getItems();
    return () => { ignore = true; };
  },[items,setItems])
   
  return (
    
    
    <div >
      
      {
       items.map(item=>(
        <Link className="linkToDetiles" to={`/items/${item.id}`} key={item.id}>
          <div >
            <h3>{item.title}</h3>
            <p>${item.price}</p>
            <img src={item.thumbnail} alt={item.title} />
          </div>
          </Link>
        )
        )
      }
      
    </div>
    
  )
}

export default ListItem