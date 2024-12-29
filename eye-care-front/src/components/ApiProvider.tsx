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
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const getConnectedUser = async () => {
        setLoadingState(true);
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json", "auth-token": token },
        };

        //GET USERNAME
        let username = "";
        try {
          const response = await fetch("http://localhost:8000/user/profile", requestOptions);

          if (!response.ok) {
            throw new Error("Erreur HTTP:" + response.status);
          }
          const result = await response.json();
          username = result.username;

          //GET USER_ROLE
          let user_role = [];
          try {
            const response = await fetch("http://localhost:8000/user/user_roles", requestOptions);
            if (!response.ok) {
              throw new Error("Erreur HTTP:" + response.status);
            }
            user_role[0] = await response.json();
            //
          } catch (error: any) {
            console.log("Erreur lors de l'envoie : " + error);
          }

          const connectedUser = {
            username: username,
            user_roles: user_role[0],
          };
          setConnectedUser(connectedUser);
          //
        } catch (error: any) {
          console.log("Erreur lors de l'envoie : " + error);
          //
        } finally {
          setLoadingState(false);
        }
      };

      getConnectedUser();
    }
  }, []);

  return (
    <>
      <ApiContext.Provider value={{ connectedUser, loadingState }}>{children}</ApiContext.Provider>
    </>
  );
}
