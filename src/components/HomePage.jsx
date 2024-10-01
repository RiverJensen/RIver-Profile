import React from "react";
import ApiRequest from "./ApiRequest";
import TopBanner from "./TopBanner";
import "../css/home.css";
import RiverResume from "./RiverResume";
import Links from "./Links";
import HomePageInfo from "./HomePageInfo";
import Game from "./Game";

const HomePage = () => {
  return (
    <div>
      <HomePageInfo />

      <ApiRequest />
     

      <Game />


      <Links />
    </div>
  );
};

export default HomePage;
