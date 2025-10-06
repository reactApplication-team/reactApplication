import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51SE9SOAMwxa3AqB4NBFeGgjN73ICDqbpvvl8Is3h6Qo9C38gagGGnYiEvRZGHnoBXYhcvcOiygJsbUvpoh0UpILh00PKGcuw84"
);

export default function CheckoutButton({ products }) {
  const handleCheckout = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ products }),
        }
      );

      if (!response.ok) throw new Error("Failed to create checkout session");

      const data = await response.json();

      window.location.href = data.url;
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong: " + err.message);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      style={{ padding: "10px", fontSize: "16px" }}
    >
      Checkout
    </button>
  );
}
