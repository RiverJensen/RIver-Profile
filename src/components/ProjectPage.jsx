import React from "react";
import "../css/project.css";
import { useState } from "react";
import githubimg from "../assets/github.png";
import linkinimg from "../assets/linkin.png";
import GithubRepos from "./GitHubRepos";

const ProjectPage = () => {
  const [isHovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const gitHubLink = () => {
    window.open(
      "https://github.com/RiverJensen?tab=repositories",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const linkInLink = () => {
    window.open(
      "https://www.linkedin.com/in/river-jensen-2a6ba5293/",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div>


      <h1 className="project">Projects</h1>




      
      <p className="project">This page use a api request to pull all of my project forom GitHub and display them so you can view them keep in mind some are better then others so your miles may vary  </p>
      
      {/* <img
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
      /> */}


      <GithubRepos />
    </div>
  );
};

export default ProjectPage;
