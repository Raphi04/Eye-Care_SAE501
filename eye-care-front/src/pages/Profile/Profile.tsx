import axios from "axios";
import Header from "../../components/Header/Header";
import { useEffect, useState, useCallback } from "react";
import "./profile.scss";
import "./Informations/PopUp/popup.scss";
import ProfileContent from "./Informations/ProfileContent";
import OcularIssuesContent from "./Informations/OcularIssuesContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useApiContext } from "../../components/ApiProvider";

export default function Profile() {
	const APIURL = import.meta.env.VITE_API_URL;
	const [loadingState, setLoadingState] = useState<boolean>(false);
	const { connectedUser } = useApiContext();
	const [userData, setUserData] = useState<{
		email: string;
		username: string;
		vision_disorder: { vision_disorder: string }[];
		vision_disorder_result: {
			result: number;
			vision_disorder: string;
		}[];
	} | null>(null);
	const [profilePicture, setProfilePicture] = useState<File | null>(null);
	const [globalErrors, setGlobalErrors] = useState<string[]>([]);
	// const [edit, setEdit] = useState<boolean>(false);
	const token = localStorage.getItem("token");

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

		console.log("caca", profilePicture);

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

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setProfilePicture(e.target.files[0]);
		}
	};

	function getInitials() {
		if (userData?.username) {
			const usernameSplited = userData.username.split(" ");
			const onlyInitials = usernameSplited.map((word: string) => {
				return word.charAt(0).toUpperCase();
			});

			return onlyInitials.join("");
		}
	}

	// Fonction pour récupérer les données utilisateur
	const fetchUser = useCallback(async () => {
		if (token) {
			setLoadingState(true);
			try {
				const response = await axios.get(`${APIURL}/user/profile`, {
					headers: { "auth-token": token },
				});
				setUserData(response.data);
			} catch (error: unknown) {
				console.error("Erreur lors de l'envoi : " + error);
			} finally {
				setLoadingState(false);
			}
		}
	}, [token, APIURL]);

	// Chargement initial des données utilisateur
	useEffect(() => {
		fetchUser();
	}, [fetchUser]);

	return (
		<>
			<Header />
			{loadingState && (
				<div className="loading">
					<p>
						<FontAwesomeIcon icon={faSpinner} spin /> Chargement...
					</p>
				</div>
			)}
			{!loadingState && connectedUser && (
				<>
					<div className="usernameContent">
						<div className="photoProfileContent">
							<div className="initialsCard">
								{profilePicture ? (
									<img
										src={URL.createObjectURL(profilePicture)}
										alt="photo de profil"
										id="images"
										className="previewImage"
										onClick={() => setProfilePicture(null)}
									/>
								) : (
									<h1 className="initials">{getInitials()}</h1>
								)}
							</div>
							<form onSubmit={handleSubmitImage}>
								<button className="photoProfileButton">
									<label htmlFor="images">
										<div className="fileField">
											<h4>Modifier la photo de profil</h4>
										</div>
										<input
											type="file"
											id="images"
											name="profilePicture"
											onChange={handleFileChange}
											className="has-value"
											placeholder="Nom d'utilisateur"
										/>
									</label>
									{/* {profilePicture && (
												<p>Fichier sélectionné : {profilePicture.name}</p>
											)} */}
								</button>
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
							</form>
						</div>
						<div className="usernameText">
							<p className="hello">
								Bonjour, <br />
							</p>
							<p className="username">{userData?.username}</p>
						</div>
					</div>
					<div className="globalContent">
						<ProfileContent userData={userData} refreshUserData={fetchUser} />
						<OcularIssuesContent />
					</div>
				</>
			)}
		</>
	);
}
