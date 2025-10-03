import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "../src/styles/App.css";
import Footer from "./components/Footer";
import ListItem from "./components/ListItem";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <ListItem />
      <Sidebar isOpen={isSidebarOpen} />
      <Footer />
      <h1>Main Content</h1>
    </>
  );
}

export default App;
