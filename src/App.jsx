import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "../src/styles/App.css";
import Footer from "./components/Footer";
import DashboardPage from "./pages/DashboardPage";
import { Routes, Route, Outlet } from "react-router-dom";
import ListItem from './components/ListItem'
import ItemsDetailsPage from './pages/ItemsDetailsPage'
import NotFoundPage from './pages/NotFoundPage'

function PageWrapper()
{
 return(
   <div className="App">
      <h1>Main Content</h1>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <Outlet />  
      <Footer />
    </div>
 )
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };


  return (
    <>
    <div className="App">
      <h1>Main Content</h1>
      
      
       <Routes>
          <Route element={<PageWrapper isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}/>
         <Route path="/" element={<ListItem />}/>
        <Route path="/items/:itemId" element={<ItemsDetailsPage />}/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </div>
    </>
      );
}

export default App;
