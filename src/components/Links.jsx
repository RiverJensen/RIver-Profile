
import React from "react";
import "../css/project.css";
import { useState } from "react";
import githubimg from "../assets/github.png"
import linkinimg from "../assets/linkin.png"

function Links() {

    const [isHovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
      setHovered(true);
    };
  
    const handleMouseLeave = () => {
      setHovered(false);
    };
  
    const gitHubLink = () => {
     
      window.location.href = "https://github.com/RiverJensen?tab=repositories";
    };
  
    const linkInLink = () => {
      
      window.location.href = "https://www.linkedin.com/in/river-jensen-2a6ba5293/";
    };





  return (
    <div>
      ProjectPage
      
      <img
      src={githubimg}
      alt="No Image Found"
      onClick={gitHubLink}
      className="github"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        cursor: isHovered ? "pointer" : "default",
      }}
    />
      <img
        src={linkinimg}
        alt="No Image Found"
        onClick={linkInLink}
        className="github"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          cursor: isHovered ? "pointer" : "default",
        }}
      />
      
    </div>
  )
}

export default Links