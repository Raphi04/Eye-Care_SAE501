//Dependencies
import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from "react-router-dom";

//Pages
import App from "./App.tsx";
import Accueil from "./pages/Accueil/Accueil.tsx";
import Blog from "./pages/Blog/Blog.tsx";
import Tests from "./pages/Tests/Tests.tsx";
import Articles from "./pages/Articles/Articles.tsx";
import Login from "./pages/Authentification/Login/Login.tsx";
import Register from "./pages/Authentification/Authentification.tsx";

import "./global.scss";
import Authentification from "./pages/Authentification/Authentification.tsx";
import IssuesForm from "./pages/Authentification/Register/IssuesForm/IssuesForm.tsx";
import RegisterForm from "./pages/Authentification/Register/RegisterForm/RegisterForm.tsx";

function getToken() {
	return localStorage.getItem("token") || "gzfeiynkz45z";
}

//Application router
const router = createBrowserRouter([
	{
		path: "/authentification",
		element: <Authentification token={""} />,
		children: [
			{
				path: "login",
				element: <Login token={getToken()} />,
			},
			{
				path: "register",
				element: <Register token={getToken()} />,
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
