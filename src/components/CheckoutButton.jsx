import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
export default function CheckoutButton({ products = [] }) {
  const [loading, setLoading] = useState(false);
  const handleCheckout = async () => {
    try {
      if (!products.length) {
        alert("Your cart is empty.");
        return;
      }
      setLoading(true);
      const res = await fetch("http://localhost:5000/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products }),
      });
      const payload = await res.json();
      if (!res.ok) {
        throw new Error(payload?.error || `Failed (HTTP ${res.status})`);
      }
      if (!payload.url) throw new Error("No checkout URL returned from server");
      window.location.href = payload.url;
    } catch (err) {
      console.error("Checkout error:", err);
      alert(`Checkout error: ${err.message || "Something went wrong"}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        background: loading ? "#3d3d3dff" : "#333333",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: loading ? "default" : "pointer",
        opacity: loading ? 0.8 : 1,
      }}
    >
      {loading ? "Redirecting…" : "Checkout"}
    </button>
  );
}
