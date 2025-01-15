import axios from "axios";
import Header from "../../components/Header/Header";
import { useEffect, useState, useCallback } from "react";
import "./profile.scss";
import "./Informations/PopUp/popup.scss";
import ProfileContent from "./Informations/ProfileContent";
import OcularIssuesContent from "./Informations/OcularIssuesContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
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
	const token = localStorage.getItem("token");

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
				<Link to="/login" className="loading">
					<p>
						<FontAwesomeIcon icon={faSpinner} spin /> Chargement...
					</p>
				</Link>
			)}
			{!loadingState && connectedUser && (
				<>
					<div className="usernameContent">
						<div className="initialsCard">
							<h1 className="initials">{getInitials()}</h1>
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
