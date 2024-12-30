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
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
	const navigate = useNavigate();
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			navigate("/accueil");
		}
	}, [navigate]);
	const [isPro, setIsPro] = useState(false);
	const [globalErrors, setGlobalErrors] = useState<string[]>([]);
	const [showPassword, setShowPassword] = useState(false);
	const [showPasswordVerif, setShowPasswordVerif] = useState(false);

	const toggleCheck = () => {
		setIsPro(!isPro);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		const username = formData.get("username")?.toString().trim();
		const email = formData.get("email")?.toString().trim();
		const password = formData.get("password")?.toString().trim();
		const verifPassword = formData.get("verifPassword")?.toString().trim();
		const APIURL = import.meta.env.VITE_API_URL;

		const errors: string[] = [];

		if (!username || !email || !password || !verifPassword) {
			errors.push("Tous les champs doivent être remplis.");
		}

		if (username && username.length < 4) {
			errors.push("Le nom d'utilisateur doit contenir au moins 4 caractères.");
		}

		if (
			password &&
			!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?!.*\s)$/.test(
				password
			)
		) {
			errors.push(
				"Le mot de passe doit contenir au moins une lettre, un chiffre, un caractère spécial et ne doit pas contenir d'espaces."
			);
		}

		if (
			(username && (username.match(/ /g) || []).length >= 2) ||
			username?.startsWith(" ") ||
			username?.endsWith(" ")
		) {
			errors.push(
				"Le nom d'utilisateur ne peut pas contenir plus d'un espace, ni commencer ou terminer par un espace."
			);
		}

		if (password !== verifPassword) {
			errors.push("Les mots de passe ne correspondent pas.");
		}

		if (errors.length > 0) {
			setGlobalErrors(errors);
			return;
		}

		const payload = {
			username,
			email,
			password,
		};

		try {
			console.log(`${APIURL}/register`);
			const response = await axios.post(`${APIURL}/register`, payload);
			const token = response.data.api_token;
			const username = response.data.username;
			localStorage.setItem("token", token);
			localStorage.setItem("username", username);
			setGlobalErrors([]);
			navigate("/authentification/register/issues-form");
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				const status = error.response?.status;
				const message = error.response?.data?.message;

				if (status === 409) {
					const errors: string[] = [];
					if (message.includes("Email")) {
						errors.push("Cet email est déjà utilisé.");
					}
					if (message.includes("Username")) {
						errors.push("Ce nom d'utilisateur est déjà pris.");
					}
					setGlobalErrors(errors);
				} else {
					setGlobalErrors([`Une erreur s'est produite : ${message}`]);
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
							password
							show={showPassword}
							onToggleShow={() => setShowPassword(!showPassword)}
						/>
						<Field
							name="verifPassword"
							type="password"
							placeholder="Vérification mot de passe"
							className="field-last"
							img={<FontAwesomeIcon icon={faLock} />}
							password
							show={showPasswordVerif}
							onToggleShow={() => setShowPasswordVerif(!showPasswordVerif)}
						/>
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
					<button type="submit" className="formButton">
						<p>S'INSCRIRE</p>
						<FontAwesomeIcon icon={faArrowRight} className="arrow" />
					</button>
				</form>
			)}
			{isPro && (
				<form>
					<div className="fields">
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
									show={showPassword}
									onToggleShow={() => setShowPassword(!showPassword)}
								/>
								<Field
									name="verifPassword"
									type="password"
									placeholder="Vérification mot de passe"
									className="field"
									img={<FontAwesomeIcon icon={faLock} />}
									show={showPassword}
									onToggleShow={() => setShowPassword(!showPassword)}
								/>
							</div>
							<div className="containerFileAndImg">
								<FontAwesomeIcon className="fileImg" icon={faFile} />
								<div className="containerFieldFile">
									<p>Déposer un certificat</p>
									<div className="customFileButton">
										<input
											id="fileInput"
											name="file"
											type="file"
											className="fileInput"
										/>
										<label htmlFor="fileInput">Parcourir</label>
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
