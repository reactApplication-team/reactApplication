import { Link } from "react-router-dom";
import styles from "../components/Sidebar.module.css";

function Sidebar({ isOpen }) {
  return (
    <nav
      className={styles.sideBar}
      style={{
        width: isOpen ? "250px" : "0px",
        transition: "width 0.3s",
        overflow: "hidden",
        position: "fixed",
        top: "53px",
        right: 0,
        height: "100%",
        backgroundColor: "#f4f4f4",
        boxShadow: "-2px 0 5px rgba(0,0,0,0.3)",
        zIndex: 1000,
      }}
    >
      <Link className={styles.sideBarLink} to="/">
        View Cart
      </Link>
    </nav>
  );
}

export default Sidebar;
