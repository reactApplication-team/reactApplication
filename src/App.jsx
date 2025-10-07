import { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import ListItem from "./components/ListItem";
import ItemsDetailsPage from "./pages/ItemsDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import CloudinaryGallery from "./components/CloudinaryGallery"
import WeatherWidget from "./components/WeatherWidget";


import "../src/styles/App.css";

function PageWrapper({ isSidebarOpen, toggleSidebar }) {
  return (
    <div className="App">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <main className="main-content">
        <h1>Main Content</h1>
        <CloudinaryGallery />
        <WeatherWidget />
        <Outlet />
      </main>
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
        <Route path="items/:itemId" element={<ItemsDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
