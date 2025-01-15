import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { disconnectUser } from "../utils/logout";

interface ApiContextTyping {
	connectedUser: any;
	loadingState: boolean;
	refreshConnectedUser: () => Promise<void>;
	logoutUser: () => void;
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
	//URL dynamique de l'API
	const APIURL = import.meta.env.VITE_API_URL;

	const [connectedUser, setConnectedUser] = useState<any>(null);
	const [loadingState, setLoadingState] = useState<boolean>(false);
	const token = localStorage.getItem("token");
	const alreadyGotInformations = useRef(false);

	const getConnectedUser = async () => {
		if (!token) return;
		alreadyGotInformations.current = true;
		setLoadingState(true);
		try {
			const response = await fetch(`${APIURL}/user/user_info`, {
				method: "GET",
				headers: { "Content-Type": "application/json", "auth-token": token },
			});

			if (!response.ok) {
				throw new Error("Erreur HTTP:" + response.status);
			}
			const result = await response.json();
			setConnectedUser(result);
		} catch (error) {
		} catch (error) {
			console.error("Erreur lors de l'envoi : ", error);
		} finally {
			setLoadingState(false);
		}
	};

	// Fonction de rafraîchissement pour mettre à jour les données utilisateur
	const refreshConnectedUser = async () => {
		await fetchUserData();
	};

	const logoutUser = async () => {
		if (token) {
			try {
				await disconnectUser(token);
			} catch (error) {
				console.error("Erreur lors de la déconnexion :", error);
			}
		}
		setConnectedUser(null);
	};

	useEffect(() => {
		if (token && !alreadyGotInformations.current) {
			getConnectedUser();
		}
	}, []);

	return (
		<>
			<ApiContext.Provider
				value={{
					connectedUser,
					loadingState,
					refreshConnectedUser,
					logoutUser,
				}}
			>
				{children}
			</ApiContext.Provider>
		</>
	);
}
