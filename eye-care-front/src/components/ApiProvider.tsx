import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";

interface ApiContextTyping {
	connectedUser: any;
	loadingState: boolean;
	refreshConnectedUser: () => Promise<void>;
}

const ApiContext = createContext<ApiContextTyping | undefined>(undefined);

export function useApiContext() {
	const context = useContext(ApiContext);

	// Si le composant n'est pas dans le contexte de ApiProvider, renvoyer une erreur.
	if (!context) {
		throw new Error(
			"useApiContext doit être utilisé à l'intérieur d'un ApiProvider"
		);
	}

	return context;
}

export default function ApiProvider({ children }: { children: ReactNode }) {
	const APIURL = import.meta.env.VITE_API_URL;
	const [connectedUser, setConnectedUser] = useState<any>(null);
	const [loadingState, setLoadingState] = useState<boolean>(false);
	const token = localStorage.getItem("token");
	const alreadyGotInformations = useRef(false);

	const fetchUserData = async () => {
		if (!token) return;

		setLoadingState(true);
		const requestOptions = {
			method: "GET",
			headers: { "Content-Type": "application/json", "auth-token": token },
		};

		try {
			const response = await fetch(`${APIURL}/user/user_info`, requestOptions);

			if (!response.ok) {
				throw new Error("Erreur HTTP:" + response.status);
			}
			const result = await response.json();
			setConnectedUser(result);
		} catch (error: any) {
			console.error("Erreur lors de l'envoi : ", error);
		} finally {
			setLoadingState(false);
		}
	};

	// Fonction de rafraîchissement pour mettre à jour les données utilisateur
	const refreshConnectedUser = async () => {
		await fetchUserData();
	};

	useEffect(() => {
		if (token && !alreadyGotInformations.current) {
			alreadyGotInformations.current = true;
			fetchUserData();
		}
	}, [token]);

	return (
		<>
			<ApiContext.Provider
				value={{ connectedUser, loadingState, refreshConnectedUser }}
			>
				{children}
			</ApiContext.Provider>
		</>
	);
}
