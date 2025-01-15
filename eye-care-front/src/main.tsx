//Dependencies
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from "react-router-dom";

//AUTHENTIFICATION
import Authentification from "./pages/Authentification/Authentification.tsx";
import Register from "./pages/Authentification/Register/Register.tsx";
import Login from "./pages/Authentification/Login/Login.tsx";
import IssuesForm from "./pages/Authentification/Register/IssuesForm/IssuesForm.tsx";
import RegisterForm from "./pages/Authentification/Register/RegisterForm/RegisterForm.tsx";

//MAIN CONTENT
import App from "./App.tsx";
import Accueil from "./pages/Accueil/Accueil.tsx";

import Blog from "./pages/Blog/Blog.tsx";

import Profile from "./pages/Profile/Profile.tsx";

import Articles from "./pages/Articles/Articles.tsx";
import Myopie from "./pages/Articles/Myopie.tsx";
import Presbytie from "./pages/Articles/Presbytie.tsx";
import Daltonisme from "./pages/Articles/Daltonisme.tsx";
import Astigmatisme from "./pages/Articles/Astigmatisme.tsx";

import Tests from "./pages/Tests/Tests.tsx";
import Acuite from "./pages/Tests/Acuite.tsx";
import Ishihara from "./pages/Tests/Ishihara.tsx";
import Dmla from "./pages/Articles/Dmla.tsx";

//LE SCSS GLOBAL
import "./global.scss";
import Hypermetropie from "./pages/Articles/Hypermetropie.tsx";
import DmlaTest from "./pages/Tests/DmlaTest.tsx";

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
					{
						path: "dmla",
						element: <Dmla />,
					},
					{
						path: "hypermetropie",
						element: <Hypermetropie />,
					},
				],
			},
			{
				path: "/tests",
				element: <Tests />,
				children: [
					{
						path: "",
						element: <Navigate to="acuite" replace />,
					},
					{
						path: "acuite",
						element: <Acuite />,
					},
					{
						path: "ishihara",
						element: <Ishihara />,
					},
					{
						path: "dmla",
						element: <DmlaTest />,
					},
				],
			},
			{
				path: "/profile",
				element: <Profile />,
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
