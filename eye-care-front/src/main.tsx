//Dependencies
import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

//Pages
import App from "./App.tsx";
import Accueil from "./pages/Accueil/Accueil.tsx";
import Blog from "./pages/Blog/Blog.tsx";
import Tests from "./pages/Tests/Tests.tsx";
import Articles from "./pages/Articles/Articles.tsx";
import Login from "./pages/Login/Login.tsx";
import Register from "./pages/Register/Register.tsx";

import "./global.scss";

function getToken() {
  return localStorage.getItem("token") || "gzfeiynkz45z";
}

//Application router
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login token={getToken()} />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <App token={getToken()} />,
    children: [
      {
        path: "/",
        element: <Accueil />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/articles",
        element: <Articles />,
      },
      {
        path: "/tests",
        element: <Tests />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
]);

//Use router
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
