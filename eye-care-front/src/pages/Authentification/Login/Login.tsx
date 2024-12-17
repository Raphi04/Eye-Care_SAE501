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

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		const email = formData.get("email");
		const password = formData.get("password");
		const APIURL = import.meta.env.VITE_API_URL;

		try {
			const response = await axios.get(`${APIURL}/login`);
			alert(`Inscription réussie : ${JSON.stringify(response.data)}`);
		} catch (error) {
			console.error("Erreur lors de l'inscription :", error);
			alert("Une erreur s'est produite lors de l'inscription : " + error);
		}

		form.reset();
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
