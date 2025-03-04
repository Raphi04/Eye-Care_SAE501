import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";

import { disconnectUser } from "../utils/logout";
import { useNavigate } from "react-router-dom";

interface ApiContextTyping {
	connectedUser: any;
	loadingState: boolean;
	profilePicture: string | null;
	refreshConnectedUser: () => Promise<void>;
	logoutUser: () => void;
}

const ApiContext = createContext<ApiContextTyping | undefined>(undefined);

export function useApiContext() {
  const context = useContext(ApiContext);

  if (!context) {
    throw new Error("useApiContext doit être utilisé à l'intérieur d'un ApiProvider");
  }

  return context;
}

export default function ApiProvider({ children }: { children: ReactNode }) {
	// URL dynamique de l'API
	const APIURL = import.meta.env.VITE_API_URL;

	const [connectedUser, setConnectedUser] = useState<any>(null);
	const [loadingState, setLoadingState] = useState<boolean>(false);
	const [profilePicture, setProfilePicture] = useState<string | null>(null);
	const token = localStorage.getItem("token");
	const alreadyGotInformations = useRef(false);
	const navigate = useNavigate();

	const fetchUserData = async () => {
		if (!token) return;
		alreadyGotInformations.current = true;
		setLoadingState(true);
		try {
			const response = await fetch(`${APIURL}/user/user_info`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"auth-token": token,
				},
			});

			if (!response.ok) {
				throw new Error("Erreur HTTP:" + response.status);
			}
			const result = await response.json();
			setConnectedUser(result);
			if (result.profile_image) {
				setProfilePicture(`${APIURL}/${result.profile_image}`);
			} else {
				setProfilePicture(null);
			}
		} catch (error) {
			console.error("Erreur lors de l'envoi : ", error);
		} finally {
			setLoadingState(false);
		}
	};

  //URL dynamique de l'API
  const APIURL = import.meta.env.VITE_API_URL;

  const [connectedUser, setConnectedUser] = useState<any>(null);
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const token = localStorage.getItem("token");
  const alreadyGotInformations = useRef(false);
  const navigate = useNavigate();

  async function fetchUserData() {
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
      console.error("Erreur lors de l'envoi : ", error);
    } finally {
      setLoadingState(false);
    }
  }

  useEffect(() => {
    if (token && !alreadyGotInformations.current) {
      alreadyGotInformations.current = true;
      fetchUserData();
    }
  }, [token]);

	return (
		<ApiContext.Provider
			value={{
				connectedUser,
				loadingState,
				profilePicture,
				refreshConnectedUser,
				logoutUser,
			}}
		>
			{children}
		</ApiContext.Provider>
	);
}
