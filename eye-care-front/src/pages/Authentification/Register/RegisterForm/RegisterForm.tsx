import {
	faArrowRight,
	faEnvelope,
	faLock,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Field from "../../Field";

export default function RegisterForm() {
	return (
		<div className="mainContent-register">
			<h1>INSCRIPTION</h1>
			<div>
				<Field
					name="username"
					type="text"
					placeholder="Nom d'utilisateur"
					className="field"
					img={<FontAwesomeIcon icon={faUser} />}
				/>
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
				<Field
					name="verifPassword"
					type="password"
					placeholder="Vérification mot de passe"
					className="field"
					img={<FontAwesomeIcon icon={faLock} />}
				/>
			</div>
			<Link to="../issues-form" className="button button-blue buttonLogin">
				S'INSCRIRE <FontAwesomeIcon icon={faArrowRight} className="arrow" />
			</Link>
			<Link to="../../login" className="redirection">
				<p>
					<strong>Vous avez déjà un compte ?</strong> Se connecter
				</p>
			</Link>
		</div>
	);
}
