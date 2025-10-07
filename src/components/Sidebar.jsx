import { Link } from "react-router-dom";
import styles from "../components/Sidebar.module.css";
import { useCart } from "../context/CartContext";

function Sidebar({ isOpen }) {
  const { cart, increaseQuantity, decreaseQuantity, removeItem, getTotal } =
    useCart();

  return (
    <nav
      className={styles.sideBar}
      style={{
        width: isOpen ? "250px" : "0px",
        transition: "width 0.3s",
        overflow: "hidden",
        right: 0,
        backgroundColor: "#F4F4F4",
        boxShadow: "-2px 0 5px rgba(0,0,0,0.3)",
        zIndex: 1000,
      }}
    >
      <Link className={styles.sideBarLink} to="/cart">
        View Cart
      </Link>

      <aside>
        <h2>Cart ({cart.length})</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          cart.map((c) => (
            <div key={c.product.id}>
              <div>{c.product.title}</div>

              <div>
                <button onClick={() => decreaseQuantity(c.product.id)}>
                  -
                </button>
                <span>{c.quantity}</span>
                <button onClick={() => increaseQuantity(c.product.id)}>
                  +
                </button>
              </div>

              <div>${c.product.price.toFixed(2)} each</div>
              <div>Subtotal: ${(c.product.price * c.quantity).toFixed(2)}</div>

              <button onClick={() => removeItem(c.product.id)}>Remove</button>
            </div>
          ))
        )}

        <div>Total: ${getTotal().toFixed(2)}</div>
      </aside>
    </nav>
  );
}
export default Sidebar;
