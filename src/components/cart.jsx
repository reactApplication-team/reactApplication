import { useCart } from "../context/CartContext";
import CheckoutButton from "./CheckoutButton";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} style={{ marginBottom: "10px" }}>
                <h4>{item.title}</h4>
                <p>
                  ${item.price} × {item.quantity || 1} = $
                  {(item.price * (item.quantity || 1)).toFixed(2)}
                </p>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>

          <h3>Total: ${totalPrice.toFixed(2)}</h3>

          <CheckoutButton products={cart} />

          <button
            onClick={clearCart}
            style={{ marginTop: "10px", padding: "8px 12px" }}
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}
