import { useEffect, useState } from "react";
import AcuitePop from "./popUps/AcuitePop";
import { useApiContext } from "../../components/ApiProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Acuite() {
  //URL dynamique de l'API
  const APIURL = import.meta.env.VITE_API_URL;

  //Connected User
  const { connectedUser, loadingState } = useApiContext();
  const token = localStorage.getItem("token") || "";

  const [acuiteScore, setAcuiteScore] = useState<any>(() => {
    return localStorage.getItem("acuiteScore") || "";
  });
  const [getScoreLoadingState, setGetScoreLoadingState] = useState<boolean>(false);
  const [testIsStarted, setTestIsStarted] = useState<Boolean>(false);

  async function getAcuiteScore() {
    setGetScoreLoadingState(true);
    if (connectedUser && !loadingState) {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json", "auth-token": token },
      };

      try {
        const response = await fetch(`${APIURL}/user/profile`, requestOptions);

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const result = await response.json();

        let currentAcuiteScore;
        if (result.vision_disorde_result.length > 0) {
          currentAcuiteScore = result.vision_disorder_result.find(
            (disorder: any) => disorder.vision_disorder == "myopie"
          ).result;
        } else {
          currentAcuiteScore = "";
        }

        console.log(currentAcuiteScore);
        setAcuiteScore(currentAcuiteScore);
        //
      } catch (error: any) {
        console.log("Erreur lors de la récupération : " + error.message);
      } finally {
        setGetScoreLoadingState(false);
      }
    }
  }

  useEffect(() => {
    getAcuiteScore();
    if (!connectedUser && !loadingState) {
      setGetScoreLoadingState(false);
      const currentAcuiteScore = localStorage.getItem("acuiteScore") || "";
      setAcuiteScore(currentAcuiteScore);
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

  function handleChangeAcuiteScore(newScore: string) {
    setAcuiteScore(newScore);
  }

  return (
    <>
      <div className="textContainer">
        <h2>Test d'acuité visuelle</h2>
        <p>
          Un test d'acuite visuelle sert à détecter de potentielles troubles occulaires tel que la
          myopie ou l'astigmatisme.
        </p>
      </div>

      <div className="textContainer">
        <h2>Déroulement du test</h2>
        <p>
          Notre test évalue sur cinquante votre perception visuelle sur des lettres de plus en plus
          petites. Cela nous permet donc de détecter une potentielle myopie chez vous.
          <br />
          <br />
          Vous allez voir cinq lettres à chaque étape du test, ces dernières devront être écrites
          correctement et dans l'ordre pour obtenir 5/5 points.
          <br />
          <br />
          Ce test a été prévu pour être réalisé à une distance d'environ 1 mètre de votre écran et
          idéalement sur un écran 1920px * 1080px. (96 dpi).
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
          <p>Votre score actuel : {acuiteScore ? acuiteScore + "/50" : "-"}</p>
        )}

        {!loadingState && connectedUser && !getScoreLoadingState && (
          <p>Votre score actuel : {acuiteScore ? acuiteScore + "/50" : "-"}</p>
        )}
      </div>

      <div className="textContainer">
        <h2>Diagnostique</h2>
        <p>
          Notre test n'est pas à prendre comme un résultat définitif et correspondant à 100% à votre
          acuité visuelle. Il se peut qu'il n'ait pas pu s'adapter à la morphologie de votre écran
          ou qu'il ait été réalisé dans de mauvaises conditions.
          <br />
          <br />
          Si à mesure que les lettres rétrécissaient, elle devenaient floues, il est préférable que
          vous consultiez un professionnel de santé.
        </p>
      </div>

      <div className="textContainer">
        <h2>Pour consulter</h2>
        <p>
          En cas de suspicion de myopie, vous pouvez consulter un ophtalmologiste. C'est un médecin
          spécialisé dans la science de l'œil qui pourra vous faire passer ce test dans un cadre
          professionnel. Il pourra aussi évaluer le résultat obtenu pour vous rédiger, si
          nécessaire, une ordonnance pour commander des lunettes.
        </p>
      </div>

      {testIsStarted && (
        <AcuitePop closePopUp={handleChangeTestIsStarted} upDateScore={handleChangeAcuiteScore} />
      )}
    </>
  );
}
