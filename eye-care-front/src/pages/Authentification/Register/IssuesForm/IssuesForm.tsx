import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faSpinner } from "@fortawesome/free-solid-svg-icons";
import IssuesChoiceGroup from "../../../../components/Authentification/Choices/IssuesChoiceGroup";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function IssuesForm() {
	{
		/*Déclaration des variables d'état}*/
	}
	const [selectedNames, setSelectedNames] = useState<string[]>([]);
	const [loadingState, setLoadingState] = useState<boolean>(false);
	const navigate = useNavigate();

	// Fonction de soumission du formulaire
	const handleSubmit = async () => {
		const APIURL = import.meta.env.VITE_API_URL;

		const token = localStorage.getItem("token"); // Récupération du token
		console.log(token);

		if (!token) {
			console.error("Aucun token trouvé. L'utilisateur n'est pas authentifié.");
			return;
		}

		setLoadingState(true);

		const payload = {
			vision_disorders: selectedNames,
		};

		try {
			const response = await axios.post(
				`${APIURL}/user/user_vision_disorder`,
				payload,
				{
					headers: {
						"auth-token": token,
					},
				}
			);
			console.log("Réponse de l'API :", response.data);
			navigate("/accueil");
		} catch (error: unknown) {
			console.error("Erreur inattendue :", error);
		} finally {
			setLoadingState(false);
		}
	};

	return (
		<div className="mainContent-register">
			<h1 className="questionTitle">Avez vous des problèmes de vue ?</h1>
			<div className="choices">
				{/*Composant pour afficher les options de maladie}*/}
				<IssuesChoiceGroup
					selectedNames={selectedNames}
					setSelectedNames={setSelectedNames}
				/>
			</div>
			<button onClick={handleSubmit} className="formButton">
				{loadingState ? (
					<div>
						<p>
							<FontAwesomeIcon icon={faSpinner} spin /> Chargement...
						</p>
					</div>
				) : (
					<>
						<p>CONTINUER</p>{" "}
						<FontAwesomeIcon icon={faArrowRight} className="arrow" />
					</>
				)}
			</button>
		</div>
	);
}
