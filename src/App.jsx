import { useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import "./App.css";
import "./css/api-image.css";
import HomePage from "./components/HomePage";
import ProjectPage from "./components/ProjectPage";
import AboutPage from "./components/AboutPage";
import Root from "./Root";

import Flag from "./assets/USA.jpeg";

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
    // Set document title
    document.title = "River Profile";

    // Set favicon
    const link = document.querySelector("link[rel='icon']") || document.createElement("link");
    link.rel = "icon";
    link.href = Flag;
    document.head.appendChild(link);
  }, []);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
