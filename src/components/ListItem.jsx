import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

const ListItem = () => {
  const [itemCard, setItemCard] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const getItems = async () => {
      try {
        const { data } = await axios.get(
          "https://dummyjson.com/products/?limit=190"
        );
        setItemCard(data.products);
      } catch (err) {
        console.error(err);
      }
    };
    getItems();
  }, []);

  return (
    <div>
      {itemCard.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>${item.price}</p>
          <img src={item.thumbnail} alt={item.title} />
          <button onClick={() => addToCart(item)}>Add to cart</button>
        </div>
      ))}
    </div>
  );
};

export default ListItem;
