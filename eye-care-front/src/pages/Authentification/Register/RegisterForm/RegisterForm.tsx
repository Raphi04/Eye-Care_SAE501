import {
	faArrowRight,
	faEnvelope,
	faFile,
	faLock,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Field from "../../../../components/Authentification/Fields/Field";
import { useState } from "react";

export default function RegisterForm() {
	const [isPro, setIsPro] = useState(false);

	const toggleCheck = () => {
		setIsPro(!isPro);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		const username = formData.get("username");
		const email = formData.get("email");
		const password = formData.get("password");
		const verifPassword = formData.get("verifPassword");

		form.reset();

		alert(
			`Username: ${username} Email: ${email} Password: ${password} verifPassword: ${verifPassword}`
		);

		return {
			username: username,
			email: email,
			password: password,
			verifPassword: verifPassword,
		};
	};

	return (
		<div className="mainContent-register">
			<h1>INSCRIPTION</h1>
			<div className="switchContainer">
				<label className="switchPro">
					<input type="checkbox" checked={isPro} onChange={toggleCheck} />
					<span className="slider round"></span>
				</label>
				<p className="switchProText">Je suis un professionnel</p>
			</div>
			{!isPro && (
				<form onSubmit={handleSubmit}>
					<div className="fields">
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
					<button type="submit" className="formButton">
						<p>S'INSCRIRE</p>
						<FontAwesomeIcon icon={faArrowRight} className="arrow" />
					</button>
				</form>
			)}
			{isPro && (
				<form>
					<div className="fieldsPro">
						<div className="fieldsFlex">
							<Field
								name="username"
								type="text"
								placeholder="NOM"
								className="field"
								img={<FontAwesomeIcon icon={faUser} />}
							/>
							<Field
								name="email"
								type="email"
								placeholder="Prénom"
								className="field"
								img={<FontAwesomeIcon icon={faUser} />}
							/>
						</div>
						<div className="fieldsFlex">
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
								<Field
									name="verifPassword"
									type="password"
									placeholder="Vérification mot de passe"
									className="field-last"
									img={<FontAwesomeIcon icon={faLock} />}
								/>
							</div>
							<div className="containerFileAndImg">
								<FontAwesomeIcon className="fileImg" icon={faFile} />
								<div className="containerFieldFile">
									<p>Déposer un certificat</p>
									<div className="fieldFile">
										<Field name="file" type="file" className="field" noImg />
									</div>
								</div>
							</div>
						</div>
					</div>
					<button type="submit" className="formButton">
						<p>S'INSCRIRE</p>
						<FontAwesomeIcon icon={faArrowRight} className="arrow" />
					</button>
				</form>
			)}
			<Link to="../../login" className="redirection">
				<p>
					<strong>Vous avez déjà un compte ?</strong> Se connecter
				</p>
			</Link>
		</div>
	);
}
