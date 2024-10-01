import React, { useState } from "react";
import "../css/home.css";
import Links from "./Links";
import RiverResume from "./RiverResume";
import ApiRequest from "./ApiRequest";
import Game from "./Game";
import Resume from "../assets/JensenRiverResumeSpt.docx.pdf";

function HomePageInfo() {
  const [showResume, setShowResume] = useState(false);

  return (
    <div className="home-page-info">
      <h1 className="FrontPageGreet">Welcome to My Portfolio</h1>
      <p className="FrontPage">
        Hi, I'm River Jensen, a junior full-stack developer. This portfolio
        website was built with a React frontend and a Node.js backend. You can
        explore my GitHub to see various other projects I've worked on.
        <br />
        <br />
        Below is a simple game I developed using React. The game sends a POST
        request to a Node.js server to save the score in a database. A
        scoreboard beneath the game displays the top scores, retrieved using an
        Axios GET request from the server.
        <br />
        <br />
        Feel free to explore my About page and Projects page to learn more about
        me and my work. If you'd like to view my resume, there is a button below
        to download it. You can also click the 'View' button to open an alert
        displaying a quick preview of my resume.
      </p>

      <a href={Resume} download>
        <button type="button">Download Resume</button>
      </a>

      <button type="button" onClick={() => setShowResume(!showResume)}>
        {showResume ? "Hide Resume" : "View Resume"}
      </button>

      {showResume && (
        <iframe
          src={Resume}
          width="100%"
          height="500px"
          title="Resume"
          style={{ border: "none" }}
        />
      )}
    </div>
  );
}

export default HomePageInfo;
