import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import IssuesChoiceGroup from "../../../../components/Authentification/Choices/IssuesChoiceGroup";

export default function IssuesForm() {
	return (
		<div className="mainContent-register">
			<h1 className="questionTitle">Avez vous des problèmes de vue ?</h1>
			<div className="choices">
				<IssuesChoiceGroup />
			</div>
			<Link to="./accueil" className="button button-blue buttonLogin">
				CONTINUER <FontAwesomeIcon icon={faArrowRight} className="arrow" />
			</Link>
		</div>
	);
}
