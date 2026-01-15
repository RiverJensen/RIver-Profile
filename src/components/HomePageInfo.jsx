import { useState } from "react";
import "../css/home.css";
import Game from "./Game";
import Resume from "../assets/JensenRiverResumeSpt.docx.pdf";

function HomePageInfo() {
  const [showResume, setShowResume] = useState(false);

  return (
    <div className="home-page-info">
      <h1 className="FrontPageGreet">Hello, I&apos;m River Jensen.</h1>
      <p className="FrontPage">
        Junior Full-Stack Developer | React & Node.js Enthusiast
      </p>
      
      <p className="FrontPage">
        I build interactive web applications with a focus on clean code and user experience. 
        This portfolio demonstrates my skills with a live React frontend, Node.js backend, and PostgreSQL database.
        Check out the coin flip game below—it persists your high score to the database!
      </p>

      <div className="button-group">
        <a href={Resume} download className="no-style-link">
          <button type="button" className="btn-primary">Download Resume</button>
        </a>

        <button 
          type="button" 
          className="btn-secondary"
          onClick={() => setShowResume(!showResume)}
        >
          {showResume ? "Hide Resume" : "Preview Resume"}
        </button>
      </div>

      {showResume && (
        <iframe
          src={Resume}
          width="100%"
          height="600px"
          title="Resume"
          style={{ border: "none" }}
        />
      )}

      <div className="content">
        <Game />
      </div>
    </div>
  );
}

export default HomePageInfo;
