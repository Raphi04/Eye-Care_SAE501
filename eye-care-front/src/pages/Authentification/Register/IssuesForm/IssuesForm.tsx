import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import IssuesChoiceGroup from "../../../../components/Authentification/Choices/IssuesChoiceGroup";
import { useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

export default function IssuesForm() {
	const [activeIndices, setActiveIndices] = useState<number[]>([]);
	// const navigate = useNavigate();
	const handleSubmit = async () => {
		const APIURL = import.meta.env.VITE_API_URL;

		const payload = {
			activeIndices,
		};

		try {
			await axios.post(`${APIURL}/login`, {
				payload,
			});
			console.log(payload);
			// navigate("/accueil");
		} catch (error: unknown) {
			console.error("Erreur inattendue :", error);
		}
	};
	return (
		<div className="mainContent-register">
			<h1 className="questionTitle">Avez vous des problèmes de vue ?</h1>
			<div className="choices">
				<IssuesChoiceGroup
					activeIndices={activeIndices}
					setActiveIndices={setActiveIndices}
				/>
			</div>
			<button onClick={handleSubmit} className="formButton">
				CONTINUER <FontAwesomeIcon icon={faArrowRight} className="arrow" />
			</button>
		</div>
	);
}
