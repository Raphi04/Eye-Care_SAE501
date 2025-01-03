import axios from "axios";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";

export default function Profile() {
	const APIURL = import.meta.env.VITE_API_URL;
	const [, setLoadingState] = useState<unknown>(null);
	const [userData, setUserData] = useState<{ username: string } | null>(null);
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
					<h1>{userData?.username?.charAt(0).toUpperCase()}</h1>
				</div>
				<div className="usernameText">
					<p>{userData?.username || "Utilisateur inconnu"}</p>
				</div>
			</div>
		</>
	);
}
