import axios from "axios";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";

export default function Profile() {
	const APIURL = import.meta.env.VITE_API_URL;
	const [, setLoadingState] = useState<unknown>(null);
	const token = localStorage.getItem("token");

	useEffect(() => {
		if (token) {
			const fetchUser = async () => {
				setLoadingState(true);
				try {
					const response = axios.get(`${APIURL}/user/profile`, {
						headers: {
							"auth-token": token,
						},
					});
					console.log(response);
				} catch (error: unknown) {
					console.log("Erreur lors de l'envoi : " + error);
				} finally {
					setLoadingState(false);
				}
			};
			fetchUser();
		}
	});

	return (
		<>
			<Header />
			<div className="initialsCard">
				<h1>Yes</h1>
			</div>
		</>
	);
}
