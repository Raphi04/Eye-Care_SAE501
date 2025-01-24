import { useEffect, useState } from "react";
import { useApiContext } from "../../../../components/ApiProvider";
import axios from "axios";
import {
	faEnvelope,
	faEye,
	faEyeSlash,
	faLock,
	faSpinner,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
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
	const [profilePicture, setProfilePicture] = useState<File | null>(null);
	const [showPreviousPassword, setShowPreviousPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showVerifNewPassword, setShowVerifNewPassword] = useState(false);
	// const [edit, setEdit] = useState<boolean>(false);

	// Mise à jour des champs
	useEffect(() => {
		setEmail(connectedUser?.email || "");
		setUsername(connectedUser?.username || "");
	}, [connectedUser, setEmail, setUsername]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setProfilePicture(e.target.files[0]);
		}
	};

	// Envoi de la nouvelle image de profil
	const handleSubmitImage = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		if (profilePicture) {
			formData.append("image", profilePicture);
		} else {
			console.error("Aucune image à envoyer.");
		}

		console.log("caca", formData);

		setGlobalErrors([]);
		setLoadingState(true);

		try {
			const token = localStorage.getItem("token");

			if (!token) {
				setGlobalErrors(["Token d'authentification manquant."]);
			}

			const response = await axios.post(
				`${APIURL}/user/profile_image`,
				formData,
				{
					headers: {
						"Content-Type": "application/json",
						"auth-token": token,
					},
				}
			);
			console.log("Image envoyée avec succès :", response.data);
		} catch (error: unknown) {
			setGlobalErrors(["Une erreur inattendue s'est produite : " + error]);
		} finally {
			setLoadingState(false);
		}
	};

	// Envoi des données utilisateur à remplacer
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

	// Fonctions pour afficher/masquer les mots de passe

	const onToggleShowPreviousPassword = () => {
		setShowPreviousPassword(!showPreviousPassword);
	};

	const onToggleShowNewPassword = () => {
		setShowNewPassword(!showNewPassword);
	};

	const onToggleShowVerifNewPassword = () => {
		setShowVerifNewPassword(!showVerifNewPassword);
	};

	// Fonctions pour afficher la modification de l'image de profil

	// const handleMouseOver = () => {
	// 	setEdit(true);
	// };

	// const handleMouseLeave = () => {
	// 	setEdit(false);
	// };

	if (!isOpen) return null;

	return (
		<div className="popupOverlay">
			<div className="popupContent">
				<h1>Vos informations</h1>
				<h3>Vous pouvez modifier vos informations ci-dessous</h3>
				<form onSubmit={handleSubmitImage}>
					<div className="popupFileField">
						<label htmlFor="images">
							<div className="fileField">
								<h4>Modifier la photo de profil</h4>
								{profilePicture ? (
									<img
										src={URL.createObjectURL(profilePicture)}
										alt="Prévisualisation"
										id="images"
										className="previewImage"
										onClick={() => setProfilePicture(null)}
									/>
								) : (
									<span>Sélectionnez une image</span>
								)}
							</div>
							<input
								type="file"
								id="images"
								name="profilePicture"
								onChange={handleFileChange}
								className="has-value"
								placeholder="Nom d'utilisateur"
							/>
							{/* <button
								onMouseOver={handleMouseOver}
								onMouseLeave={handleMouseLeave}
							></button> */}
							{/* {edit ? <FontAwesomeIcon className="edit" icon={faPen} /> : null} */}
						</label>
						{/* {profilePicture && (
							<p>Fichier sélectionné : {profilePicture.name}</p>
						)} */}
					</div>
				</form>
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
						<div className="inputIconModify">
							<FontAwesomeIcon icon={faUser} />
						</div>
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
						<div className="inputIconModify email">
							<FontAwesomeIcon icon={faEnvelope} />
						</div>
					</div>
					<div className="popupField">
						<input
							type={showPreviousPassword ? "text" : "password"}
							name="previousPassword"
							value={previousPassword}
							onChange={(e) => setPreviousPassword(e.target.value)}
							className="has-value"
							placeholder="Ancien mot de passe"
						/>
						<div className="inputIconModify">
							<FontAwesomeIcon icon={faLock} />
						</div>
						<p
							onClick={onToggleShowPreviousPassword}
							className={`showPassword` + (showPreviousPassword ? " show" : "")}
						>
							{showPreviousPassword ? (
								<FontAwesomeIcon icon={faEye} />
							) : (
								<FontAwesomeIcon icon={faEyeSlash} />
							)}
						</p>
					</div>
					<div className="popupField">
						<input
							type={showNewPassword ? "text" : "password"}
							name="newPassword"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							className="has-value"
							placeholder="Nouveau mot de passe"
						/>
						<div className="inputIconModify">
							<FontAwesomeIcon icon={faLock} />
						</div>
						<p
							onClick={onToggleShowNewPassword}
							className={`showPassword` + (showNewPassword ? " show" : "")}
						>
							{showNewPassword ? (
								<FontAwesomeIcon icon={faEye} />
							) : (
								<FontAwesomeIcon icon={faEyeSlash} />
							)}
						</p>
					</div>
					<div className="popupField">
						<input
							type={showVerifNewPassword ? "text" : "password"}
							name="verifNewPassword"
							value={verifNewPassword}
							onChange={(e) => setVerifNewPassword(e.target.value)}
							className="has-value"
							placeholder="Vérification nouveau mot de passe"
						/>
						<div className="inputIconModify">
							<FontAwesomeIcon icon={faLock} />
						</div>
						<p
							onClick={onToggleShowVerifNewPassword}
							className={`showPassword` + (showVerifNewPassword ? " show" : "")}
						>
							{showVerifNewPassword ? (
								<FontAwesomeIcon icon={faEye} />
							) : (
								<FontAwesomeIcon icon={faEyeSlash} />
							)}
						</p>
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
