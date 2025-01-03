import { useEffect, useState } from "react";
import IshiharaPop from "./popUps/IshiharaPop";
import { useApiContext } from "../../components/ApiProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Ishihara() {
  const { connectedUser, loadingState } = useApiContext();
  const token = localStorage.getItem("token") || "";

  const [daltonismeScore, setDaltonismeScore] = useState<any>(() => {
    return localStorage.getItem("daltonismeScore") || "";
  });

  const [testIsStarted, setTestIsStarted] = useState<Boolean>(false);
  const [getScoreLoadingState, setGetScoreLoadingState] = useState<boolean>(false);

  async function getDaltonismeScore() {
    setGetScoreLoadingState(true);
    if (connectedUser && !loadingState) {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json", "auth-token": token },
      };

      try {
        const response = await fetch("http://localhost:8000/user/profile", requestOptions);

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const result = await response.json();

        console.log(result);
        let currentDaltonismeScore;
        if (result.vision_disorder_result.length > 0) {
          currentDaltonismeScore = result.vision_disorder_result.find(
            (disorder: any) => disorder.vision_disorder == "daltonisme"
          ).result;
        } else {
          currentDaltonismeScore = "";
        }

        setDaltonismeScore(currentDaltonismeScore);
        //
      } catch (error: any) {
        console.log("Erreur lors de la récupération : " + error.message);
      } finally {
        setGetScoreLoadingState(false);
      }
    }
  }

  useEffect(() => {
    getDaltonismeScore();
    if (!connectedUser && !loadingState) {
      setGetScoreLoadingState(false);
      const currentDaltonismeScore = localStorage.getItem("daltonismeScore") || "";
      setDaltonismeScore(currentDaltonismeScore);
    }
  }, [connectedUser, loadingState]);

  function handleChangeTestIsStarted() {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    const newState = !testIsStarted;
    if (newState) {
      document.body.style.overflowY = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflowY = "scroll";
      document.body.style.paddingRight = "";
    }
    setTestIsStarted(newState);
  }

  function handleChangeDaltonismeScore(newScore: string) {
    setDaltonismeScore(newScore);
  }

  return (
    <>
      <div className="textContainer">
        <h2>Test d'Ishihara</h2>
        <p>
          Le test d'Ishihara permet de détecter un potentiel daltonisme chez le patient. Il existe
          plusieurs types de daltonisme, tels que la protanopie, la tritanopie ou bien la
          deutéranopie
        </p>
      </div>

      <div className="textContainer">
        <h2>Déroulement du test</h2>
        <p>
          Vous allez voir sur la gauche une série de nombres cachés dans des cercles de couleurs
          différents. Vous allez devoir écrire ces nombre dans le champ de formulaire juste à côté.
        </p>
      </div>

      <div className="startTest">
        <button onClick={handleChangeTestIsStarted}>LANCER LE TEST</button>
        {getScoreLoadingState && (
          <p>
            <FontAwesomeIcon icon={faSpinner} spin /> Chargement en cours ...
          </p>
        )}

        {!loadingState && !connectedUser && (
          <p>Votre score actuel : {daltonismeScore ? daltonismeScore + "/10" : "-"}</p>
        )}

        {!loadingState && connectedUser && !getScoreLoadingState && (
          <p>Votre score actuel : {daltonismeScore ? daltonismeScore + "/10" : "-"}</p>
        )}
      </div>

      <div className="textContainer">
        <h2>Diagnostique</h2>
        <p>
          Notre test n'est pas à prendre comme un résultat définitif et correspondant à 100% à votre
          acuité visuelle. Il se peut qu'il n'ait pas pu s'adapter à la morphologie de votre écran
          ou qu'il ait été réalisé dans de mauvaises conditions
          <br />
          <br />
          Si vous avez eu des difficulté à voir les nombres caché dans les cercles, il est alors
          conseillé de consulter un professionnel de santé.
        </p>
      </div>

      <div className="textContainer">
        <h2>Pour consulter</h2>
        <p>
          En cas de suspicion de daltonisme, vous pouvez consulter un ophtalmologiste. C'est un
          médecin spécialisé dans la science de l'œil qui pourra vous faire passer ce test dans un
          cadre professionnel. Il n'existe à l'heure actuelle aucun traitement contre le daltonisme.
          Cependant, il existe des lunettes et des lentilles qui permettent aux personnes atteintes
          de daltonisme de mieux distinguer les couleurs.
        </p>
      </div>

      {testIsStarted && (
        <IshiharaPop
          closePopUp={handleChangeTestIsStarted}
          upDateScore={handleChangeDaltonismeScore}
        />
      )}
    </>
  );
}
