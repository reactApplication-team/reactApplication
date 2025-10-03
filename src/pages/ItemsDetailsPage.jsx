import React from "react";
import { useParams } from "react-router-dom";
import { useItems } from "../context/ItemsContext";





const ItemsDetailsPage = () => {
    const {itemId} = useParams();
    const { items } = useItems();
    console.log("This is what items in ",items)
    const idNum=Number(itemId)
    const item = items.find((p)=>p.id===idNum);
    if (!item) {
  return <p>Loading item...</p>; }
  console.log("This is what item in",item)

  return (
    <>
    <div className="product-detail">
  <h1>{item.title}</h1>
  <div className="product-image">
    <img src={item.images?.[0]} alt={item.title} />
  </div>
  <div className="product-price">
    <span className="price">${item.price}</span>
     
     {typeof item.discountPercentage === "number" && (
          <span className="discount">-{item.discountPercentage}%</span>
        )}

  </div>

  <p className="availability">{item.availabilityStatus}</p>
  <p className="stock">Stock: {item.stock}</p>
  <h2>Description</h2>

  <p>{item.description}</p>

  <h2>Details</h2>
  <ul>
    <li>Brand: {item.brand}</li>
    <li>Category: {item.category}</li>
    <li>Tags: {Array.isArray(item.tags) ? item.tags.join(", ") : ""}</li>
    <li>Shipping: {item.shippingInformation}</li>
    <li>Return Policy: {item.returnPolicy}</li>
    <li>Warranty: {item.warrantyInformation}</li>
  </ul>
</div>
    </>
  )
}




export default ItemsDetailsPage