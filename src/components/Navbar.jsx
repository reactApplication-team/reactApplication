import logo from "../assets/Logo-project.png";
import ShoppingCart from "../assets/Shopping-cart.png";
import styles from "../components/Navbar.module.css";

function Navbar({ toggleSidebar }) {
  return (
    <div className={styles.navbar}>
      <img className={styles.logo} src={logo} alt="Logo" />
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
