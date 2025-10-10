import logo from "../assets/Logo-project.png";
import ShoppingCart from "../assets/Shopping-cart.png";
import { Link, useNavigate } from "react-router-dom";
import { divisions as divisionMap, fetchTaggedProducts } from "./CategoryData";
import React, { useState, useEffect, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { Search } from "lucide-react";
import "../styles/Navbar.css";

function Navbar({ toggleSidebar }) {
  const [divisionsList, setDivisionsList] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const { cart } = useCart();

  const cartQty = useMemo(
    () => cart.reduce((sum, c) => sum + c.quantity, 0),
    [cart]
  );

  useEffect(() => {
    async function loadDivisions() {
      try {
        await fetchTaggedProducts();
        const allDivisions = [...Object.keys(divisionMap)];
        setDivisionsList(allDivisions);
      } catch (error) {
        console.error("Error loading divisions:", error);
      }
    }
    loadDivisions();
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    const controller = new AbortController();
    const fetchSuggestions = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${query}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        setSuggestions(data.products?.slice(0, 5) || []);
      } catch {}
    };
    const debounce = setTimeout(fetchSuggestions, 400);
    return () => {
      clearTimeout(debounce);
      controller.abort();
    };
  }, [query]);

  const handleMouseEnter = (div) => setOpenDropdown(div);
  const handleMouseLeave = () => setOpenDropdown(null);
  const handleSelect = (id) => {
    setQuery("");
    setSuggestions([]);
    navigate(`/items/${id}`);
  };

  return (
    <div className="navbar">
      <Link to="/" aria-label="Home">
        <img className="logo" src={logo} alt="Logo" />
      </Link>

      <div className="search-bar">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((p) => (
              <li key={p.id} onClick={() => handleSelect(p.id)}>
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  className="suggestion-thumb"
                />
                <span>{p.title}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ul className="menu">
        {divisionsList.map((div) => (
          <li
            key={div}
            className="menu-item"
            onMouseEnter={() => handleMouseEnter(div)}
            onMouseLeave={handleMouseLeave}
          >
            {div}
            {openDropdown === div && (
              <ul className="dropdown">
                {(divisionMap[div] || []).map((tag) => (
                  <li key={tag} className="dropdown-item">
                    <Link to={`/tags/${tag}`}>{tag.replace(/-/g, " ")}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <button
        className="btn-cart"
        onClick={toggleSidebar}
        aria-label="Open cart"
      >
        <img className="shopping-cart" src={ShoppingCart} alt="Shopping Cart" />
        {cartQty > 0 && (
          <span className="cart-badge" aria-label={`${cartQty} items in cart`}>
            {cartQty}
          </span>
        )}
      </button>
    </div>
  );
}

export default Navbar;
