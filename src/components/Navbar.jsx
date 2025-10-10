import logo from "../assets/Logo-project.png";
import ShoppingCart from "../assets/Shopping-cart.png";
import styles from "../components/Navbar.module.css";
import "../styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { divisions as divisionMap, fetchTaggedProducts } from "./CategoryData";
import React, { useState, useEffect, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { Search } from "lucide-react";

function Navbar({ toggleSidebar }) {
  const [divisionsList, setDivisionsList] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const { cart } = useCart();
  const navigate = useNavigate();

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
    <div className={styles.navbar}>
      <Link to="/" aria-label="Home">
        <img className={styles.logo} src={logo} alt="Logo" />
      </Link>

      <div className="searchBar">
        <Search className="searchIcon" />
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="searchInput"
        />
        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((p) => (
              <li key={p.id} onClick={() => handleSelect(p.id)}>
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  className="suggestionThumb"
                />
                <span>{p.title}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ul className={styles.menu}>
        {divisionsList.map((div) => (
          <li
            key={div}
            className={styles.menuItem}
            onMouseEnter={() => handleMouseEnter(div)}
            onMouseLeave={handleMouseLeave}
          >
            {div}
            {openDropdown === div && (
              <ul className={styles.dropdown}>
                {(divisionMap[div] || []).map((tag) => (
                  <li key={tag} className={styles.dropdownItem}>
                    <Link to={`/tags/${tag}`}>{tag.replace(/-/g, " ")}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <button
        className={styles.btnCart}
        onClick={toggleSidebar}
        aria-label="Open cart"
      >
        <img
          className={styles.shoppingCart}
          src={ShoppingCart}
          alt="Shopping Cart"
        />
        {cartQty > 0 && (
          <span
            className={styles.cartBadge}
            aria-label={`${cartQty} items in cart`}
          >
            {cartQty}
          </span>
        )}
      </button>
    </div>
  );
}

export default Navbar;
