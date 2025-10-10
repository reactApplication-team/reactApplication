import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import "../styles/TagPage.css";
export default function TagPage() {
  const { tag } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  useEffect(() => {
    async function loadProducts() {
      const res = await fetch(`https://dummyjson.com/products/category/${tag}`);
      const data = await res.json();
      setProducts(data.products || []);
    }
    loadProducts();
  }, [tag]);
  return (
    <div className="tagpage-container">
      <h1 className="tagpage-title">{tag.replace(/-/g, " ")}</h1>
      {products.length === 0 ? (
        <p className="tagpage-empty">No products found.</p>
      ) : (
        <div className="tagpage-grid">
          {products.map((p) => (
            <div key={p.id} className="tagpage-card">
              <div
                className="tagpage-imagewrap"
                onClick={() => navigate(`/items/${p.id}`)}
              >
                <img src={p.thumbnail} alt={p.title} />
              </div>
              <div className="tagpage-info">
                <h3>{p.title}</h3>
                <p className="tagpage-price">${p.price}</p>
                <div className="tagpage-meta">
                  {p.rating && (
                    <span className="tagpage-rating">
                      ★ {p.rating.toFixed(1)}
                    </span>
                  )}
                  {p.brand && <span className="tagpage-brand">{p.brand}</span>}
                </div>
                <button className="tagpage-add" onClick={() => addToCart(p)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
