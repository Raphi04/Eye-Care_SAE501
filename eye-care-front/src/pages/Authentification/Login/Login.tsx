import {
	faArrowRight,
	faLock,
	faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "../authentification.scss";
import Field from "../../../components/Authentification/Fields/Field";

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

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		const email = formData.get("email");
		const password = formData.get("password");

		form.reset();

		alert(`Email: ${email} Password: ${password}`);

		return {
			email: email,
			password: password,
		};
	};

	return (
		<div className="mainContent-login">
			<h1>CONNEXION</h1>
			<form onSubmit={handleSubmit}>
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
