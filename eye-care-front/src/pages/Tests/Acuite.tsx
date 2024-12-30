import { useEffect, useState } from "react";
import AcuitePop from "./popUps/AcuitePop";
import { useApiContext } from "../../components/ApiProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Acuite() {
  //Connected User
  const { connectedUser, loadingState } = useApiContext();
  const token = localStorage.getItem("token") || "";

  const [acuiteScore, setAcuiteScore] = useState<string>("");
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
        const response = await fetch("http://localhost:8000/user/profile", requestOptions);

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const result = await response.json();

        let currentAcuiteScore;
        if (result.vision_disorder.length > 0) {
          currentAcuiteScore = result.vision_disorder_result.find(
            (disorder: any) => disorder.vision_disorder == "myopie"
          ).result;
        } else {
          currentAcuiteScore = "";
        }

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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nibh elit, tincidunt at
          sapien id, commodo ornare dolor. Praesent pellentesque et est sit amet congue. Aliquam
          erat volutpat. Suspendisse molestie porttitor lacus a convallis. Praesent lacinia purus
          vel lacus pulvinar, ac ultricies neque scelerisque. Sed non imperdiet nisl. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean
          vehicula augue nec risus rhoncus interdum.
        </p>
      </div>

      <div className="textContainer">
        <h2>Déroulement du test</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nibh elit, tincidunt at
          sapien id, commodo ornare dolor. Praesent pellentesque et est sit amet congue. Aliquam
          erat volutpat. Suspendisse molestie porttitor lacus a convallis. Praesent lacinia purus
          vel lacus pulvinar, ac ultricies neque scelerisque. Sed non imperdiet nisl. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean
          vehicula augue nec risus rhoncus interdum.
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
        <h2>Pour consulter</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nibh elit, tincidunt at
          sapien id, commodo ornare dolor. Praesent pellentesque et est sit amet congue. Aliquam
          erat volutpat. Suspendisse molestie porttitor lacus a convallis. Praesent lacinia purus
          vel lacus pulvinar, ac ultricies neque scelerisque. Sed non imperdiet nisl. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean
          vehicula augue nec risus rhoncus interdum.
        </p>
      </div>

      <div className="textContainer">
        <h2>Diagnostique</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nibh elit, tincidunt at
          sapien id, commodo ornare dolor. Praesent pellentesque et est sit amet congue. Aliquam
          erat volutpat. Suspendisse molestie porttitor lacus a convallis. Praesent lacinia purus
          vel lacus pulvinar, ac ultricies neque scelerisque. Sed non imperdiet nisl. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean
          vehicula augue nec risus rhoncus interdum.
        </p>
      </div>
      {testIsStarted && (
        <AcuitePop closePopUp={handleChangeTestIsStarted} upDateScore={handleChangeAcuiteScore} />
      )}
    </>
  );
}
