function Sidebar({ isOpen }) {
  return (
    <nav
      className="sideBar"
      style={{
        width: isOpen ? "250px" : "0px",
      }}
    >
      <Link path="/">View Cart</Link>
    </nav>
  );
}

export default Sidebar;
