import React, { useState } from "react";
import "../css/navbar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
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
        {!isOpen && (
          <a
            className="hamburger-btn"
            onClick={toggleNav}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              cursor: isHovered ? "pointer" : "default",
              display: "block",
            }}
          >
            &#9776;
          </a>
        )}

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
          <ul>
            <li>
              <a href="/">Home page</a>
            </li>
            <li>
              <a href="/Project">Project page</a>
            </li>
            <li>
              <a href="/About">About page</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
