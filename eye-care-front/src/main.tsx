//Dependencies
import { StrictMode } from "react";
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
import Myopie from "./pages/Articles/Myopie.tsx";

import "./global.scss";
import Presbytie from "./pages/Articles/Presbytie.tsx";
import Daltonisme from "./pages/Articles/Daltonisme.tsx";
import Astigmatisme from "./pages/Articles/Astigmatisme.tsx";

function getToken() {
  return "gzfeiynkz45z";
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
        children: [
          {
            path: "",
            element: <Navigate to="myopie" replace />,
          },
          {
            path: "myopie",
            element: <Myopie />,
          },

          {
            path: "presbytie",
            element: <Presbytie />,
          },

          {
            path: "daltonisme",
            element: <Daltonisme />,
          },

          {
            path: "astigmatisme",
            element: <Astigmatisme />,
          },
        ],
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
