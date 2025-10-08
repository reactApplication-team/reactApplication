import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useItems } from "../context/ItemsContext";
import { useCart } from "../context/CartContext";
const ListItem = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const { items, setItems } = useItems();
  const { addToCart } = useCart();
  const max_total = 190;
  const totalPages = Math.max(Math.ceil(total / limit), 1);
  useEffect(() => {
    let ignore = false;
    const getItems = async () => {
      try {
        setLoading(true);
        const skipPage = (page - 1) * limit;
        const remaining = Math.max(0, max_total - skipPage);
        if (remaining <= 0) {
          if (!ignore) setItems([]);
          return;
        }
        const effectiveLimit = Math.min(limit, remaining);
        const { data } = await axios.get(
          `https://dummyjson.com/products/?limit=${effectiveLimit}&skip=${skipPage}`
        );
        if (!ignore) {
          setItems(data.products);
          setTotal(Math.min(data.total, max_total));
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    getItems();
    return () => {
      ignore = true;
    };
  }, [page, limit, setItems]);
  return (
    <div style={{ padding: "20px" }}>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {items.map((item) => (
            <div key={item.id}>
              <Link className="linkToDetiles" to={`/items/${item.id}`}>
                <div>
                  <h3>{item.title}</h3>
                  <p>${Number(item.price).toFixed(2)}</p>
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "contain",
                    }}
                    loading="lazy"
                  />
                </div>
              </Link>
              <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                <button onClick={() => addToCart(item)}>Add to cart</button>
                <Link to="/cart">Go to cart →</Link>
              </div>
            </div>
          ))}
        </div>
      )}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          style={{ marginRight: "10px", padding: "6px 12px" }}
        >
          ← Prev
        </button>
        <span style={{ margin: "0 8px" }}>
          Page {page} / {totalPages} (Total {total} items)
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          style={{ marginLeft: "10px", padding: "6px 12px" }}
        >
          Next →
        </button>
        <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
          style={{ marginLeft: "12px", padding: "6px 8px" }}
        >
          {[12, 15, 20, 30, 50].map((n) => (
            <option key={n} value={n}>
              {n}/page
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
export default ListItem;
