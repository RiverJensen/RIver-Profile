import React from 'react'
import { useState } from 'react';
import "../css/navbar.css"

const NavBar = () => {

    function openNav() {
        document.getElementById("mySidebar").style.width = "250px";
      }
    
      function closeNav() {
        document.getElementById("mySidebar").style.width = "0";
      }

      const handleMouseEnter = () => {
        setHovered(true);
      };
    
      const handleMouseLeave = () => {
        setHovered(false);
      };

      const [isHovered, setHovered] = useState(false);


  return (
    <div>NavBar


<a
            className="closebtn"
            onClick={() => closeNav()}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              cursor: isHovered ? "pointer" : "default",
            }}
          >
 &times;
          </a>



          <a href= "/Project"> Project page </a>
    <a href='/About'> About page</a>


    </div>
  )
}

export default NavBar
