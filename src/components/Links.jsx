import React from "react";
import "../css/project.css";
import { useState } from "react";
import githubimg from "../assets/github.png";
import linkinimg from "../assets/linkin.png";
import "bootstrap-icons/font/bootstrap-icons.css";

function Links() {
  const [isHovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const gitHubLink = () => {
    window.open("https://github.com/RiverJensen?tab=repositories","_blank","noopener,noreferrer")
  };

  const linkInLink = () => {

    window.open("https://www.linkedin.com/in/river-jensen-2a6ba5293/","_blank","noopener,noreferrer")
    
      
  };

  return (
    <div>
      ProjectPage
      <i
        class="bi bi-github"
        onClick={gitHubLink}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          cursor: isHovered ? "pointer" : "default",
        }}
      ></i>
      <i
        class="bi bi-linkedin"
        onClick={linkInLink}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          cursor: isHovered ? "pointer" : "default",
        }}
      ></i>
      
    </div>
  );
}

export default Links;
