import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
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
	const { connectedUser, profilePicture, refreshConnectedUser } =
		useApiContext();
	const [userData, setUserData] = useState<{
		email: string;
		username: string;
		vision_disorder: { vision_disorder: string }[];
		vision_disorder_result: { result: number; vision_disorder: string }[];
	} | null>(null);
	const [loadingState, setLoadingState] = useState<boolean>(false);
	const [globalErrors, setGlobalErrors] = useState<string[]>([]);
	const token = localStorage.getItem("token");

	// Récupération des données utilisateur
	const fetchUser = useCallback(async () => {
		if (token) {
			setLoadingState(true);
			try {
				const response = await axios.get(`${APIURL}/user/profile`, {
					headers: { "auth-token": token },
				});
				setUserData(response.data);
			} catch (error: unknown) {
				setGlobalErrors(["Une erreur inattendue s'est produite : " + error]);
			} finally {
				setLoadingState(false);
			}
		}
	}, [token, APIURL]);

	useEffect(() => {
		fetchUser();
	}, [fetchUser]);

	// Upload d'une nouvelle image
	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
			if (!allowedTypes.includes(file.type)) {
				alert(
					"Format de fichier non valide. Veuillez choisir un fichier JPG ou PNG."
				);
				return;
			}
			const formData = new FormData();
			formData.append("image", file);
			setLoadingState(true);
			try {
				await axios.post(`${APIURL}/user/profile_image`, formData, {
					headers: { "auth-token": token },
				});
				await refreshConnectedUser();
			} catch (error) {
				setGlobalErrors(["Une erreur inattendue s'est produite : " + error]);
			} finally {
				setLoadingState(false);
			}
			e.target.value = "";
		}
	};

	// Fonction pour obtenir les initiales de l'utilisateur
	const getInitials = () => {
		if (userData?.username) {
			return userData.username
				.split(" ")
				.map((word) => word[0].toUpperCase())
				.join("");
		}
		return "?";
	};

	return (
		<>
			<Header />
			{loadingState && connectedUser && (
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
										alt="Photo de profil"
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
