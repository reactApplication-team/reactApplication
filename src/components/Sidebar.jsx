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

        right: 0,

        backgroundColor: "#f4f4f4",
        boxShadow: "-2px 0 5px rgba(0,0,0,0.3)",
        zIndex: 1000,
      }}
    >
      <Link className={styles.sideBarLink} to="/">
        View Cart
      </Link>
      <Link className={styles.sideBarCheckOut}>Check out</Link>
    </nav>
  );
}

export default Sidebar;
