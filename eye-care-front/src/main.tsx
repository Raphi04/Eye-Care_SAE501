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
import Authentification from "./pages/Authentification/Authentification.tsx";
import IssuesForm from "./pages/Authentification/Register/IssuesForm/IssuesForm.tsx";
import RegisterForm from "./pages/Authentification/Register/RegisterForm/RegisterForm.tsx";
import Login from "./pages/Authentification/Login/Login.tsx";
import Register from "./pages/Authentification/Register/Register.tsx";
import Myopie from "./pages/Articles/Myopie.tsx";
import Presbytie from "./pages/Articles/Presbytie.tsx";
import Daltonisme from "./pages/Articles/Daltonisme.tsx";
import Astigmatisme from "./pages/Articles/Astigmatisme.tsx";

import "./global.scss";

const router = createBrowserRouter([
  {
    path: "/authentification",
    element: <Authentification />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
        children: [
          {
            path: "issues-form",
            element: <IssuesForm />,
          },
          {
            path: "register-form",
            element: <RegisterForm />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <App />,
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
