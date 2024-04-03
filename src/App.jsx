import { useState } from "react";
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
  return <RouterProvider router={router} />;
}

export default App;
