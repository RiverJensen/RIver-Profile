import React from "react";
import MyImage from "../assets/mepictrue.jpeg";
import "../css/about.css";

const AboutPage = () => {
  return (
    <div>
      AboutPage
      <h1>List of things i like </h1>
      <h1>Things i do </h1>
      <img src={MyImage} alt="my image" className="mepic" />
    </div>
  );
};

export default AboutPage;
