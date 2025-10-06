import React, { useEffect, useState } from "react";
import axios from "axios";

const ListItem = () => {
  const [itemCard, setItemCard] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      try {
        const { data } = await axios.get(
          "https://dummyjson.com/products/?limit=20"
        );
        setItemCard(data.products);
      } catch (error) {
        console.log(error);
      }
    };
    getItems();
  }, []);

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const handleCheckout = async () => {
    try {
      const products = cart.map((item) => ({
        name: item.title,
        price: item.price,
        quantity: item.quantity,
      }));

      const res = await axios.post(
        "http://localhost:5000/create-checkout-session",
        {
          products,
        }
      );

      window.location.href = res.data.url;
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {itemCard.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              margin: "10px",
              width: "200px",
            }}
          >
            <h3>{item.title}</h3>
            <p>${item.price}</p>
            <img
              src={item.thumbnail}
              alt={item.title}
              style={{ width: "100%" }}
            />
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h2>Cart</h2>
          {cart.map((item) => (
            <div key={item.id}>
              {item.title} — ${item.price} × {item.quantity}
            </div>
          ))}
          <button onClick={handleCheckout} style={{ marginTop: "10px" }}>
            Checkout Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default ListItem;
