import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "../src/styles/App.css";
import Footer from "./components/Footer";
import ListItem from "./components/ListItem";
import CheckoutButton from "./components/CheckoutButton";
import Donate from "./components/Donations";
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  const products = [{ name: "Test Product", price: 20, quantity: 1 }];

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />

      <Sidebar isOpen={isSidebarOpen} />
      <Footer />
      <ListItem />
      <h1>Main Content</h1>
      <div>
        <h1>Stripe Checkout Demo</h1>
        <CheckoutButton products={products} />
      </div>
      <Donate />
    </>
  );
}

export default App;
