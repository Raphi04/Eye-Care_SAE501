import axios from "axios";
import { useEffect, useState } from "react";
import { useApiContext } from "../../../components/ApiProvider";

type UserData = {
	email: string;
	username: string;
	vision_disorder: { vision_disorder: string }[];
	vision_disorder_result: string[];
};

type ProfileContentProps = {
	userData: UserData | null;
	refreshUserData: () => void;
};

export default function ProfileContent({
	userData,
	refreshUserData,
}: ProfileContentProps) {
	const [isModifPopupOpen, setIsModifPopupOpen] = useState(false);
	const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
	const [email, setEmail] = useState(userData?.email);
	const [username, setUsername] = useState(userData?.username);
	const [previousPassword, setPreviousPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [verifNewPassword, setVerifNewPassword] = useState("");
	const [globalErrors, setGlobalErrors] = useState<string[]>([]);

	const { connectedUser, refreshConnectedUser } = useApiContext();

	// Mise à jour des champs
	useEffect(() => {
		setEmail(connectedUser?.email || "");
		setUsername(connectedUser?.username || "");
	}, [connectedUser]);

	useEffect(() => {
		if (isModifPopupOpen && userData) {
			setEmail(userData.email);
			setUsername(userData.username);
		}
	}, [isModifPopupOpen, userData]);

	// Fonctions pour ouvrir/fermer les pop-up
	const modifyPopUp = () => {
		setIsModifPopupOpen(!isModifPopupOpen);
	};

	const deletePopUp = () => {
		setIsDeletePopupOpen(!isDeletePopupOpen);
	};

	const handleSubmitModify = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		const email = formData.get("email");
		const username = formData.get("username");
		const password = formData.get("newPassword");
		const APIURL = import.meta.env.VITE_API_URL;
		setGlobalErrors([]);

		const payload = {
			email,
			username,
			password,
		};

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
		}
	};

	const handleSubmitDelete = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setGlobalErrors([]);

		try {
			const token = localStorage.getItem("token");

			if (!token) {
				setGlobalErrors(["Token d'authentification manquant."]);
				return;
			}

			const APIURL = import.meta.env.VITE_API_URL;

			// Envoi d'une requête DELETE au serveur supprimer le compte
			const response = await axios.delete(`${APIURL}/user/user`, {
				headers: {
					"Content-Type": "application/json",
					"auth-token": token,
				},
			});

			if (response.status === 200) {
				if (email) setEmail(email);
				if (username) setUsername(username);
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
		}
	};

	return (
		<div className="profileContent">
			{/* --- Informations utilisateur --- */}
			<div className="userInformationsContent">
				<h2 className="titleInformations">VOS INFORMATIONS</h2>
				<div className="userInformations">
					<p>
						Nom d'utilisateur : <strong>{userData?.username}</strong>
					</p>
				</div>
				<div className="userInformations">
					<p>
						Email : <strong>{userData?.email || "Utilisateur inconnu"}</strong>
					</p>
				</div>
				<div className="userInformations last">
					<p>
						Mot de passe : <strong>*********</strong>
					</p>
				</div>
				<div className="buttonsInformations">
					<button
						type="button"
						className="buttonInformations modify"
						onClick={modifyPopUp}
					>
						<p>MODIFIER</p>
					</button>
					<button
						type="submit"
						className="buttonInformations danger"
						onClick={deletePopUp}
					>
						<p>SUPPRIMER LE COMPTE</p>
					</button>
				</div>
			</div>

			{/* --- Faire/Refaire les tests --- */}
			<div className="userInformationsContent last">
				<h2 className="titleInformations">FAIRE/REFAIRE LES TESTS</h2>
				<div className="userInformations">
					<p>Faire le test de Daltonisme</p>
				</div>
				<div className="userInformations">
					<p>Faire le test de Myopie</p>
				</div>
				<div className="userInformations">
					<p>Faire le test de DMLA</p>
				</div>
			</div>

			{/* --- Pop-Up Modal --- */}
			{isModifPopupOpen && (
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
								/>
							</div>
							<div className="popupField">
								<input
									type="email"
									name="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="has-value"
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
									onClick={modifyPopUp}
								>
									ANNULER
								</button>
								<button type="submit" className="popupButton modify">
									ENREGISTRER
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
			{/* --- Pop-Up Modal --- */}
			{isDeletePopupOpen && (
				<div className="popupOverlay">
					<div className="popupContent">
						<h1>Supprimer votre compte</h1>
						<h3>Nous sommes désolés de vous voir partir</h3>
						<form onSubmit={handleSubmitDelete}>
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
									onClick={deletePopUp}
								>
									ANNULER
								</button>
								<button type="submit" className="popupButton danger">
									SUPPRIMER LE COMPTE
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
