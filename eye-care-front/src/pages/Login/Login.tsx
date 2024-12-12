import {
	faArrowRight,
	faLock,
	faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./login.scss";
import Field from "../../components/Others/Field";
import EyeCareLogo from "../../assets/eye-care-logo.svg?react";
import DayNightMode from "../../components/DayNightMode/DayNightMode";

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
		<>
			<main className="login">
				<div className="topScreen">
					<EyeCareLogo />
					<div className="bgSwitch">
						<DayNightMode />
					</div>
				</div>
				<div className="mainContent">
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
						SE CONNECTER{" "}
						<FontAwesomeIcon icon={faArrowRight} className="arrow" />
					</Link>
					<Link to="/register" className="redirection">
						<p>
							<strong>Pas encore de compte ?</strong> S'inscrire
						</p>
					</Link>
				</div>
			</main>
		</>
	);
}
