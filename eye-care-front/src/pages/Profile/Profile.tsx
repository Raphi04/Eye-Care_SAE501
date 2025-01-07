import axios from "axios";
import Header from "../../components/Header/Header";
import { useEffect, useState, useCallback } from "react";
import "./profile.scss";
import ProfileContent from "./Informations/ProfileContent";
import OcularIssuesContent from "./Informations/OcularIssuesContent";

export default function Profile() {
	const APIURL = import.meta.env.VITE_API_URL;
	const [, setLoadingState] = useState<unknown>(null);
	const [userData, setUserData] = useState<{
		email: string;
		username: string;
		vision_disorder: { vision_disorder: string }[];
		vision_disorder_result: string[];
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
			<div className="usernameContent">
				<div className="initialsCard">
					<h1 className="initials">{getInitials() || "U.I."}</h1>
				</div>
				<div className="usernameText">
					<p className="hello">
						Bonjour, <br />
					</p>
					<p className="username">
						{userData?.username || "Utilisateur inconnu"}
					</p>
				</div>
			</div>
			<div className="globalContent">
				{/* Passer fetchUser comme prop pour le rafraîchissement */}
				<ProfileContent userData={userData} refreshUserData={fetchUser} />
				<OcularIssuesContent />
			</div>
		</>
	);
}
