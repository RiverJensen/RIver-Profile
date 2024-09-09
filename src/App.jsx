import { useState } from "react";
import React,{useEffect} from "react";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import {
  createBrowserRouter,
  createRoutesFromElements,
  BrowserRouter,
  Routes,
  Route,
  RouterProvider,
} from "react-router-dom";

import "./App.css";
import "./css/api-image.css";
import HomePage from "./components/HomePage";
import ApiRequest from "./components/ApiRequest";
import ProjectPage from "./components/ProjectPage";
import AboutPage from "./components/AboutPage";
import Root from "./Root";

import Flag from  "./assets/USA.jpeg"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<HomePage />} />
      <Route path="/Project" element={<ProjectPage />} />
      <Route path="/About" element={<AboutPage />} />
    </Route>
  )
);

function App() {
  useEffect(() => {
    document.title = "River Profile "; 
  }, []); 

  const link = document.querySelector("link[rel='icon']") || document.createElement('link');
    link.rel = 'icon';
    link.href = Flag; // Use the imported image
    document.head.appendChild(link);

  return ( <div>
  
  <RouterProvider router={router}/>

  {/* <img src={Flag} alt="Logo" width={100} height={100} /> */}

</div>
  
  )
}

export default App;
