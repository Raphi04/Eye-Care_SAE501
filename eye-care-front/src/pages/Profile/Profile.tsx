import axios from "axios";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
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

	useEffect(() => {
		if (token) {
			const fetchUser = async () => {
				setLoadingState(true);
				try {
					const response = await axios.get(`${APIURL}/user/profile`, {
						headers: {
							"auth-token": token,
						},
					});
					console.log(response.data);
					setUserData(response.data);
				} catch (error: unknown) {
					console.log("Erreur lors de l'envoi : " + error);
				} finally {
					setLoadingState(false);
				}
			};
			fetchUser();
		}
	}, [token, APIURL]);

	return (
		<>
			<Header />
			<div className="usernameContent">
				<div className="initialsCard">
					<h1 className="initials">
						{userData?.username?.charAt(0).toUpperCase()}
					</h1>
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
				<ProfileContent userData={userData} />
				<OcularIssuesContent />
			</div>
		</>
	);
}
