import React from "react";
import MyImage from "../assets/mepictrue.jpeg";
import "../css/about.css";
import { Carousel } from "react-bootstrap";
import WRX from "../assets/WRX.jpeg";
import Snow from "../assets/Snow.jpeg";

import 'bootstrap/dist/css/bootstrap.min.css';


const AboutPage = () => {
  return (
    <div>
      <h1>List of things I like</h1>
      <h2>Things I do</h2> {/* Changed second heading to h2 for better semantics */}
      
      <Carousel>
        {/* First Slide */}
        <Carousel.Item>
          <img src={MyImage} alt="First slide" className="MePic" /> 
          <Carousel.Caption>
            <h3>First Slide Label</h3>
            <p>This is the first image.</p>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Second Slide */}
        <Carousel.Item>
          <img src={WRX} alt="Second slide" className="WRX" />
          <Carousel.Caption>
            <h3>Second Slide Label</h3>
            <p>This is the second image.</p>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Third Slide */}
        <Carousel.Item>
          <img src={Snow} alt="Third slide" className="Snow" />
          <Carousel.Caption>
            <h3>Third Slide Label</h3>
            <p>This is the third image.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

    </div>
  );
};

export default AboutPage;