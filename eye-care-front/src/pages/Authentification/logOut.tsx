import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function logOut() {
	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	//URL dynamique de l'API
	const APIURL = import.meta.env.VITE_API_URL;

	useEffect(() => {
		if (token) {
			const disconnectUser = async () => {
				const requestOptions = {
					method: "POST",
					headers: { "Content-Type": "application/json", "auth-token": token },
				};

				try {
					const response = await fetch(`${APIURL}/user/logout`, requestOptions);

					if (!response.ok) {
						throw new Error("Erreur HTTP:" + response.status);
					}
					localStorage.removeItem("token");
					localStorage.removeItem("username");
					navigate("/");
					//
				} catch (error: any) {
					console.log("Erreur lors de l'envoie : " + error);
					//
				}
			};
			disconnectUser();
		} else {
			navigate("/");
		}
	}, []);
	return (
		<>
			<div className="mainContent-logOut">
				<p>
					<FontAwesomeIcon icon={faSpinner} spin /> Redirection en cours...
				</p>
			</div>
		</>
	);
}
