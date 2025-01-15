import { useEffect, useState } from "react";
import { useApiContext } from "../../../../components/ApiProvider";
import axios from "axios";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ModifyPopupProps {
	isOpen: boolean;
	onClose: () => void;
	username: string;
	setUsername: (value: string) => void;
	email: string;
	setEmail: (value: string) => void;
	previousPassword: string;
	setPreviousPassword: (value: string) => void;
	newPassword: string;
	setNewPassword: (value: string) => void;
	verifNewPassword: string;
	setVerifNewPassword: (value: string) => void;
	refreshUserData: () => void;
	setIsModifPopupOpen: (value: boolean) => void;
}

export default function ModifyPopup({
	isOpen,
	onClose,
	username,
	setUsername,
	email,
	setEmail,
	previousPassword,
	setPreviousPassword,
	newPassword,
	setNewPassword,
	verifNewPassword,
	setVerifNewPassword,
	refreshUserData,
	setIsModifPopupOpen,
}: ModifyPopupProps) {
	const APIURL = import.meta.env.VITE_API_URL;

	const { connectedUser, refreshConnectedUser } = useApiContext();
	const [loadingState, setLoadingState] = useState<boolean>(false);
	const [globalErrors, setGlobalErrors] = useState<string[]>([]);

	// Mise à jour des champs
	useEffect(() => {
		setEmail(connectedUser?.email || "");
		setUsername(connectedUser?.username || "");
	}, [connectedUser, setEmail, setUsername]);

	const handleSubmitModify = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		const email = formData.get("email")?.toString().trim();
		const username = formData.get("username")?.toString().trim();
		const password = formData.get("newPassword")?.toString().trim();

		const payload = {
			email,
			username,
			password,
		};

		setGlobalErrors([]);
		const errors: string[] = [];

		if (
			(!previousPassword && !newPassword && verifNewPassword) ||
			(!previousPassword && newPassword && !verifNewPassword) ||
			(previousPassword && !newPassword && !verifNewPassword)
		) {
			errors.push(
				"Veuillez remplir tous les champs concernant le mot de passe."
			);
		}

		if (username && (username.length < 2 || username.length > 20)) {
			errors.push(
				"Le nom d'utilisateur doit contenir entre 2 et 20 caractères."
			);
		}

		if (
			newPassword &&
			!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
				newPassword
			)
		) {
			errors.push(
				"Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial."
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

		if (newPassword !== verifNewPassword) {
			errors.push("Les mots de passe ne correspondent pas.");
		}

		if (errors.length > 0) {
			setGlobalErrors(errors);
			return;
		}

		setLoadingState(true);

		try {
			const token = localStorage.getItem("token");

			if (!token) {
				setGlobalErrors(["Token d'authentification manquant."]);
				return;
			}

			// Envoi d'une requête POST au serveur pour la connexion
			const response = await axios.put(`${APIURL}/user/user`, payload, {
				headers: {
					"Content-Type": "application/json",
					"auth-token": token,
				},
			});

			if (response.status === 200) {
				refreshUserData();
				await refreshConnectedUser();
				setIsModifPopupOpen(false);
			}
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				const status = error.response?.status;
				const message = error.response?.data?.message;

				// Traitement des erreurs spécifiques à l'API
				if (status === 400) {
					setGlobalErrors([`Erreur : ${message || "Données invalides."}`]);
				} else if (status === 401) {
					setGlobalErrors(["Mot de passe actuel incorrect."]);
				} else {
					setGlobalErrors([`Erreur de mise à jour : ${message || "Inconnue"}`]);
				}
			} else {
				console.error("Erreur inattendue :", error);
				setGlobalErrors(["Une erreur inattendue s'est produite."]);
			}
		} finally {
			setLoadingState(false);
		}
	};

	if (!isOpen) return null;

	return (
		<div className="popupOverlay">
			<div className="popupContent">
				<h1>Vos informations</h1>
				<h3>Vous pouvez modifier vos informations ci-dessous</h3>
				<form onSubmit={handleSubmitModify}>
					{/* --- Champs de modification --- */}
					<div className="popupField">
						<input
							type="text"
							name="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="has-value"
							placeholder="Nom d'utilisateur"
						/>
					</div>
					<div className="popupField">
						<input
							type="email"
							name="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="has-value"
							placeholder="Email"
						/>
					</div>
					<div className="popupField">
						<input
							type="password"
							name="previousPassword"
							value={previousPassword}
							onChange={(e) => setPreviousPassword(e.target.value)}
							className="has-value"
							placeholder="Ancien mot de passe"
						/>
					</div>
					<div className="popupField">
						<input
							type="password"
							name="newPassword"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							className="has-value"
							placeholder="Nouveau mot de passe"
						/>
					</div>
					<div className="popupField">
						<input
							type="password"
							name="verifNewPassword"
							value={verifNewPassword}
							onChange={(e) => setVerifNewPassword(e.target.value)}
							className="has-value"
							placeholder="Vérification nouveau mot de passe"
						/>
					</div>

					{/* Message d'erreur global */}
					{globalErrors.length > 0 && (
						<div className="error-container">
							{globalErrors.map((err, index) => (
								<p key={index} className="error-message">
									{err}
								</p>
							))}
						</div>
					)}

					{/* --- Boutons de validation --- */}
					<div className="popupButtons">
						<button
							type="button"
							className="popupButton none"
							onClick={onClose}
						>
							ANNULER
						</button>
						<button type="submit" className="popupButton modify">
							{loadingState ? (
								<div>
									<p>
										<FontAwesomeIcon icon={faSpinner} spin /> Chargement...
									</p>
								</div>
							) : (
								<p>ENREGISTRER</p>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
