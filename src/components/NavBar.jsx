import React, { useState } from "react";
import "../css/navbar.css";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false); // Ensure this is false initially
  const [isHovered, setHovered] = useState(false);

  const toggleNav = () => {
    console.log("Toggling Nav. Current state:", isOpen); // Debugging
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {/* Render hamburger button only when sidebar is closed */}
        {!isOpen && (
          <a
            className="hamburger-btn"
            onClick={toggleNav}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              cursor: isHovered ? "pointer" : "default",
              display: 'block'  // Ensure it's always displayed when rendered
            }}
          >
            &#9776; {/* Three lines for hamburger menu */}
          </a>
        )}

        {/* Sidebar Content */}
        <div
          id="mySidebar"
          className="sidebar"
          style={{ width: isOpen ? "250px" : "0" }} // Sidebar opens when isOpen is true
        >
          {/* Close Button Inside the Sidebar */}
          {isOpen && (
            <a href="#" className="closebtn" onClick={toggleNav}>
              &times;
            </a>
          )}
          {/* Sidebar Links */}
          <ul>
            <li><a href="/">Home page</a></li>
            <li><a href="/Project">Project page</a></li>
            <li><a href="/About">About page</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
