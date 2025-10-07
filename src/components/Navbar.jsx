import logo from "../assets/Logo-project.png";
import ShoppingCart from "../assets/Shopping-cart.png";
import styles from "../components/Navbar.module.css";
import { Link } from "react-router-dom";
function Navbar({ toggleSidebar }) {
  return (
    <div className={styles.navbar}>
      <Link to="/" aria-label="Home">
        <img className={styles.logo} src={logo} alt="Logo" />
      </Link>
      <button className={styles.btnCart} onClick={toggleSidebar}>
        <img
          className={styles.shoppingCart}
          src={ShoppingCart}
          alt="Shopping Cart"
        />
      </button>
    </div>
  );
}

export default Navbar;
