import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";

interface ApiContextTyping {
  connectedUser: any;
  loadingState: boolean;
}

const ApiContext = createContext<ApiContextTyping | undefined>(undefined);

export function useApiContext() {
  const context = useContext(ApiContext);

  // Si le composant n'est pas dans le contexte de ApiProvider, renvoyer une erreur.
  if (!context) {
    throw new Error("useApiContext doit être utilisé à l'intérieur d'un ApiProvider");
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

  useEffect(() => {
    if (token) {
      const getConnectedUser = async () => {
        setLoadingState(true);
        alreadyGotInformations.current = true;
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json", "auth-token": token },
        };

        try {
          console.log(token);
          const response = await fetch(`${APIURL}/user/user_info`, requestOptions);

          if (!response.ok) {
            throw new Error("Erreur HTTP:" + response.status);
          }
          const result = await response.json();
          setConnectedUser(result);
          //
        } catch (error: any) {
          console.log("Erreur lors de l'envoie : " + error);
          //
        } finally {
          setLoadingState(false);
        }
      };
      if (!alreadyGotInformations.current) {
        getConnectedUser();
      }
    }
  }, []);

  return (
    <>
      <ApiContext.Provider value={{ connectedUser, loadingState }}>{children}</ApiContext.Provider>
    </>
  );
}
