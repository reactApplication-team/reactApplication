import { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import DashboardPage from "./pages/DashboardPage";
import ItemsDetailsPage from "./pages/ItemsDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import TagPage from "./pages/TagsPage";

import Cart from "./components/Cart";

import "../src/styles/App.css";
import ListItem from "./components/ListItem";

function PageWrapper({ isSidebarOpen, toggleSidebar }) {
  return (
    <div className="App">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <Outlet />
      <Footer />
    </div>
  );
}

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((p) => !p);

  return (
    <Routes>
      <Route
        element={
          <PageWrapper
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        }
      >
        <Route index element={<ListItem />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="items/:itemId" element={<ItemsDetailsPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/tags/:tag" element={<TagPage />} />
      </Route>
    </Routes>
  );
}
