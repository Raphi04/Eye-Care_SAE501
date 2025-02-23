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
	const [profilePicture, setProfilePicture] = useState<string | null>(null);
	const [globalErrors, setGlobalErrors] = useState<string[]>([]);
	const token = localStorage.getItem("token");

	// Envoi de la nouvelle image de profil
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
			if (!allowedTypes.includes(file.type)) {
				alert(
					"Format de fichier non valide. Veuillez choisir un fichier JPG ou PNG."
				);
				return;
			}
			const imageUrl = URL.createObjectURL(file);
			setProfilePicture(imageUrl);
			handleSubmitImage(file);
			e.target.value = "";
		}
	};

	const handleSubmitImage = async (file: File) => {
		const formData = new FormData();
		formData.append("image", file);

		setGlobalErrors([]);
		setLoadingState(true);

		try {
			const token = localStorage.getItem("token");

			if (!token) {
				setGlobalErrors(["Token d'authentification manquant."]);
				return;
			}

			const response = await axios.post(
				`${APIURL}/user/profile_image`,
				formData,
				{
					headers: {
						"auth-token": token,
					},
				}
			);

			localStorage.setItem("profileImageUrl", response.data.profile_image);
		} catch (error) {
			setGlobalErrors(["Une erreur inattendue s'est produite : " + error]);
		} finally {
			setLoadingState(false);
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

	// Fonction pour rafraichir les données utilisateur
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

	const fetchImageUser = useCallback(() => {
		if (token) {
			const storedImage = localStorage.getItem("profileImageUrl");
			if (storedImage && storedImage !== "null") {
				setProfilePicture(storedImage);
			} else {
				setProfilePicture(null);
			}
			console.log("Image récupérée avec succès :", storedImage);
		}
	}, [token]);

	// Chargement initial des données utilisateur
	useEffect(() => {
		fetchUser();
	}, [fetchUser]);

	// Chargement initial de l'image utilisateur
	useEffect(() => {
		fetchImageUser();
	}, [fetchImageUser, token]);

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
										src={profilePicture}
										alt="photo de profil"
										id="images"
										className="previewImage"
									/>
								) : (
									<h1 className="initials">{getInitials()}</h1>
								)}
							</div>

							<label className="photoProfileButton" htmlFor="images">
								<span>MODIFIER LA PHOTO</span>
								<input
									type="file"
									id="images"
									name="profilePicture"
									onChange={handleFileChange}
									placeholder="Nom d'utilisateur"
									accept="image/png, image/jpeg, image/jpg"
								/>
							</label>

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
