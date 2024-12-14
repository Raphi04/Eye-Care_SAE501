import {
	faArrowRight,
	faLock,
	faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "../authentification.scss";
import Field from "../Field";

// import { Navigate } from "react-router-dom";
interface LoginProps {
	token: string;
}

export default function Login({ token }: LoginProps) {
	// if (token !== localStorage.getItem("token")) {
	//   return (
	//     <>
	//       <Navigate to="/" />
	//     </>
	//   );
	// }

	return (
		<div className="mainContent-login">
			<h1>CONNEXION</h1>
			<div>
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
					className="field"
					img={<FontAwesomeIcon icon={faLock} />}
				/>
			</div>
			<Link to="/accueil" className="button button-blue buttonLogin">
				SE CONNECTER <FontAwesomeIcon icon={faArrowRight} className="arrow" />
			</Link>
			<Link to="../register/register-form" className="redirection">
				<p>
					<strong>Pas encore de compte ?</strong> S'inscrire
				</p>
			</Link>
		</div>
	);
}
