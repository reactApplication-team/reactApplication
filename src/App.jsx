import { useState } from "react";
import Navbar from "./components/Navbar";
import "../src/styles/App.css";
import Sidebar from "./components/Sidebar";

function App({ isSidebarOpen }) {
  return (
    <>
      <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} />
      <h1>wgdaudkua</h1>
    </>
  );
}

export default App;
