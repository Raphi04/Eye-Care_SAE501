import { createContext, ReactNode, useContext, useEffect, useState } from "react";

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
  const [connectedUser, setConnectedUser] = useState<any>(null);
  const [loadingState, setLoadingState] = useState<boolean>(false);

  useEffect(() => {
    const getConnectedUser = async () => {
      console.log("caca");
      setLoadingState(true);
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };

      try {
        const response = await fetch("http://localhost:5173/test.json", requestOptions);

        if (!response.ok) {
          throw new Error("Erreur HTTP:" + response.status);
        }
        const result = await response.json();
        setConnectedUser(result);
        //
      } catch (error: any) {
        console.log("Erreur lors de l'envoie : " + error.message);
        //
      } finally {
        setLoadingState(false);
      }
    };

    getConnectedUser();
  }, []);

  return (
    <>
      <ApiContext.Provider value={{ connectedUser, loadingState }}>{children}</ApiContext.Provider>
    </>
  );
}
