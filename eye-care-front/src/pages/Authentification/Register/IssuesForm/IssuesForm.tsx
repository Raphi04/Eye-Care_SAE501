import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import IssuesChoiceGroup from "../../../../components/Authentification/Choices/IssuesChoiceGroup";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function IssuesForm() {
	const [globalErrors, setGlobalErrors] = useState<string[]>([]);
	const navigate = useNavigate();
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		const email = formData.get("email");
		const password = formData.get("password");
		const APIURL = import.meta.env.VITE_API_URL;

		// Reset errors before submission
		setGlobalErrors([]);

		try {
			await axios.post(`${APIURL}/login`, {
				email,
				password,
			});
			navigate("/accueil");
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				const status = error.response?.status;
				const message = error.response?.data?.message;

				// Traitement les erreurs spécifiques à l'API
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
		<div className="mainContent-register">
			<h1 className="questionTitle">Avez vous des problèmes de vue ?</h1>
			<div className="choices">
				<IssuesChoiceGroup />
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
			<Link
				onClick={() => handleSubmit}
				to="./accueil"
				className="button button-blue buttonLogin"
			>
				CONTINUER <FontAwesomeIcon icon={faArrowRight} className="arrow" />
			</Link>
		</div>
	);
}
