import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown, faMeh, faSmile, faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import Ishihara1 from "../../../assets/protadeute/3.jpg";
import Ishihara2 from "../../../assets/protadeute/69.jpg";
import Ishihara3 from "../../../assets/protadeute/12.jpg";
import Ishihara4 from "../../../assets/protadeute/7.jpg";
import Ishihara5 from "../../../assets/protadeute/16.jpg";
import Ishihara6 from "../../../assets/protadeute/6.jpg";
import Ishihara7 from "../../../assets/protadeute/74.jpg";
import Ishihara8 from "../../../assets/protadeute/9.jpg";
import Ishihara9 from "../../../assets/protadeute/13.jpg";
import Ishihara10 from "../../../assets/protadeute/8.jpg";
import Ishihara11 from "../../../assets/trina/6.jpg";
import Ishihara12 from "../../../assets/trina/25.jpg";
import Ishihara13 from "../../../assets/trina/67.jpg";
import Ishihara14 from "../../../assets/trina/38.jpg";
import Ishihara15 from "../../../assets/trina/12.jpg";
import Ishihara16 from "../../../assets/trina/99.jpg";
import Ishihara17 from "../../../assets/trina/78.jpg";
import Ishihara18 from "../../../assets/trina/31.jpg";
import Ishihara19 from "../../../assets/trina/14.jpg";
import Ishihara20 from "../../../assets/trina/45.jpg";
import Ishihara21 from "../../../assets/glubiboulga/29T.jpg";
import Ishihara22 from "../../../assets/glubiboulga/5P.jpg";
import Ishihara23 from "../../../assets/glubiboulga/12T.jpg";
import Ishihara24 from "../../../assets/glubiboulga/6P.jpg";
import Ishihara25 from "../../../assets/glubiboulga/15T.jpg";
import Ishihara26 from "../../../assets/glubiboulga/5T.jpg";
import Ishihara27 from "../../../assets/glubiboulga/74P.jpg";
import Ishihara28 from "../../../assets/glubiboulga/12T.jpg";
import Ishihara29 from "../../../assets/glubiboulga/45P.jpg";
import Ishihara30 from "../../../assets/glubiboulga/15P.jpg";


import "./popUps.scss";
import { useEffect, useRef, useState } from "react";
import { useApiContext } from "../../../components/ApiProvider";

interface DaltonismeArray {
  src: string;
  number: number;
  answer: number | string;
}

interface IshiharaPopProps {
  closePopUp: () => void;
  upDateScore: (newScore: string) => void;
}

export default function IshiharaPop({ closePopUp, upDateScore }: IshiharaPopProps) {
  //URL dynamique de l'API
  const APIURL = import.meta.env.VITE_API_URL;

  //ConnectedUser
  const { connectedUser, loadingState } = useApiContext();
  const token = localStorage.getItem("token") || "";

  const images = [
    Ishihara1,
    Ishihara2,
    Ishihara3,
    Ishihara4,
    Ishihara5,
    Ishihara6,
    Ishihara7,
    Ishihara8,
    Ishihara9,
    Ishihara10,
    Ishihara11,
    Ishihara12,
    Ishihara13,
    Ishihara14,
    Ishihara15,
    Ishihara16,
    Ishihara17,
    Ishihara18,
    Ishihara19,
    Ishihara20,
    Ishihara21,
    Ishihara22,
    Ishihara23,
    Ishihara24,
    Ishihara25,
    Ishihara26,
    Ishihara27,
    Ishihara28,
    Ishihara29,
    Ishihara30,
  ];

  const values = [3, 69, 12, 7, 16, 6, 74, 9, 13, 8, 6, 25, 67, 38, 12, 99, 78, 31, 14, 45, 29, 5, 12, 7, 15, 5, 74, 15, 45, 6];

  const [daltonismeArray, setDaltonismeArray] = useState<DaltonismeArray[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const alreadyGenerated = useRef(false);

  const [answerNumber, setAnswerNumber] = useState<number | string>("");
  const inputAnswerNumber = useRef<HTMLInputElement>(null);
  const [newDaltonismeScore, setNewDaltonismeScore] = useState<number>(0);
  const [sendingloadingState, setSendingLoadingState] = useState<boolean>(false);

  useEffect(() => {
    if (!alreadyGenerated.current) {
      for (let i = 0; i < 30; i++) {
        const object: DaltonismeArray = {
          src: images[i],
          number: values[i],
          answer: "",
        };
        setDaltonismeArray((prevState) => [...prevState, object]);
      }
      alreadyGenerated.current = true;
    }
    if (inputAnswerNumber.current) {
      inputAnswerNumber.current.focus();
    }
  }, []);

  useEffect(() => {
    console.log(daltonismeArray);
  }, [daltonismeArray]);

  function handleChangeAnswerNumber(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value) {
      const newAnswerNumber = parseFloat(event.target.value);
      setAnswerNumber(newAnswerNumber);
    } else {
      setAnswerNumber("");
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    //Mise à jour de l'objet actuel
    const newObject = { ...daltonismeArray[currentIndex], answer: answerNumber };

    //Mise à jour de l'array
    const updatedDaltonismeArray = daltonismeArray.map((object, index) =>
      index == currentIndex ? (object = newObject) : object
    );
    setDaltonismeArray(updatedDaltonismeArray);

    //Changement d'index pour le prochain objet
    const newCurrentIndex = currentIndex + 1;
    setCurrentIndex(newCurrentIndex);

    setAnswerNumber("");
    if (inputAnswerNumber.current) {
      inputAnswerNumber.current.focus();
    }

    if (newCurrentIndex == 30) {
      let newDaltonismeScore = 0;
      updatedDaltonismeArray.map((object) => {
        if (object.number == object.answer) {
          newDaltonismeScore++;
        }
      });

      console.log(newDaltonismeScore);
      if (!connectedUser && !loadingState) {
        localStorage.setItem("daltonismeScore", newDaltonismeScore.toString());
      }
      upDateScore(newDaltonismeScore.toString());
      setNewDaltonismeScore(newDaltonismeScore);
    }
  }

  //Quand on appuie sur entrer au moment du resultat, ça ferme la Pop-Up
  function handleEnter(event: KeyboardEvent) {
    if (event.key === "Enter") {
      sendResultsToDB();
    }
  }
  useEffect(() => {
    if (currentIndex == 30) {
      document.addEventListener("keydown", handleEnter);
    }

    return () => {
      document.removeEventListener("keydown", handleEnter);
    };
  }, [currentIndex]);

  //Envoyer à la DB
  async function sendResultsToDB() {
    if (connectedUser && !loadingState) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", "auth-token": token },
        body: JSON.stringify({
          vision_disorder: "daltonisme",
          result: newDaltonismeScore,
        }),
      };

      try {
        setSendingLoadingState(true);
        const response = await fetch(`${APIURL}/user/user_vision_disorder_result`, requestOptions);

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
      } catch (error: any) {
        console.log("Erreur lors de l'envoie : " + error.message);
      } finally {
        setSendingLoadingState(false);
        closePopUp();
      }
    } else {
      localStorage.setItem("daltonismeScore", newDaltonismeScore.toString());
      closePopUp();
    }
  }

  return (
    <>
      <div className="popUpContainer">
        <div className="popUp">
          {currentIndex !== 30 && (
            <>
              <div className="firstPartPopUp">
                {daltonismeArray.length == 30 && (
                  <img src={daltonismeArray[currentIndex].src} alt="Ishihara" />
                )}
              </div>

              <div className="secondPartPopUp">
                <h3>Écrivez le nombre caché dans la figure dans le champs ci-dessous :</h3>
                <form onSubmit={handleSubmit}>
                  <input
                    ref={inputAnswerNumber}
                    type="number"
                    value={answerNumber}
                    onChange={handleChangeAnswerNumber}
                    min={0}
                    placeholder=". . ."
                  />
                  <button type="submit" className="button">
                    VALIDER
                  </button>
                </form>
              </div>
              <div className="closePopUp" onClick={closePopUp}>
                <FontAwesomeIcon icon={faXmark} />
              </div>
            </>
          )}

          {currentIndex == 30 && (
            <>
              <div className="fullPopUp result">
                <div className="resultInfos">
                  <h3>Test fini ! Vous avez obtenu un score de {newDaltonismeScore}/30 !</h3>
                </div>
                <div className="resultSmiley">
                  {newDaltonismeScore < 12 && <FontAwesomeIcon icon={faFrown} />}
                  {newDaltonismeScore < 24 && newDaltonismeScore >= 13 && (
                    <FontAwesomeIcon icon={faMeh} />
                  )}
                  {newDaltonismeScore >= 8 && <FontAwesomeIcon icon={faSmile} />}
                </div>
                <button onClick={sendResultsToDB} type="submit" disabled={sendingloadingState}>
                  {!sendingloadingState && "ENREGISTRER"}
                  {sendingloadingState && <FontAwesomeIcon icon={faSpinner} spin />}
                  {sendingloadingState && " ENVOIE EN COURS ..."}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
