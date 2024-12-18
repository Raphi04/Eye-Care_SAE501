import {
	faArrowRight,
	faLock,
	faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "../authentification.scss";
import Field from "../../../components/Authentification/Fields/Field";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const [globalErrors, setGlobalErrors] = useState<string[]>([]);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		const email = formData.get("email");
		const password = formData.get("password");
		const APIURL = import.meta.env.VITE_API_URL;
		setGlobalErrors([]);

		const payload = {
			email,
			password,
		};

		try {
			// Envoi d'une requête POST au serveur pour la connexion
			const response = await axios.post(`${APIURL}/login`, {
				payload,
			});

			// Si la connexion réussit, stockage du token dans le state et le localStorage
			const token = response.data.api_token;
			const username = response.data.username;
			localStorage.setItem("token", token);
			localStorage.setItem("username", username);
			navigate("/accueil");
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				const status = error.response?.status;
				const message = error.response?.data?.message;

				// Traitement des erreurs spécifiques à l'API
				if (status === 404) {
					setGlobalErrors(["L'utilisateur que vous avez fourni n'existe pas."]);
				} else if (status === 401) {
					setGlobalErrors(["Mot de passe incorrect."]);
				} else {
					setGlobalErrors([`Erreur de connexion : ${message || "Inconnue"}`]);
				}
			} else {
				console.error("Erreur inattendue :", error);
				setGlobalErrors(["Une erreur inattendue s'est produite."]);
			}
		}

		form.reset();
	};

	return (
		<div className="mainContent-login">
			<h1>CONNEXION</h1>
			<form onSubmit={handleSubmit}>
				<div className="fields">
					<Field
						name="email"
						type="email"
						placeholder="Email"
						className="field"
						img={<FontAwesomeIcon icon={faEnvelope} />}
					/>
					<Field
						name="password"
						type="password"
						placeholder="Mot de passe"
						className="field-last"
						img={<FontAwesomeIcon icon={faLock} />}
					/>
					{/* Message d'erreur global */}
					{globalErrors.length > 0 && (
						<div className="error-container">
							{globalErrors.map((err, index) => (
								<p key={index} className="error-message">
									{err}
								</p>
							))}
						</div>
					)}
				</div>
				<button type="submit" className="formButton">
					<p>SE CONNECTER</p>
					<FontAwesomeIcon icon={faArrowRight} className="arrow" />
				</button>
			</form>
			<Link to="../register/register-form" className="redirection">
				<p>
					<strong>Pas encore de compte ?</strong> S'inscrire
				</p>
			</Link>
		</div>
	);
}
