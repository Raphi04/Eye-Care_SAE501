const APIURL = import.meta.env.VITE_API_URL;

export const disconnectUser = async (token: string) => {
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
	} catch (error) {
		console.log("Erreur lors de l'envoie : " + error);
	}
};
