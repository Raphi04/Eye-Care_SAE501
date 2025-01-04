import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown, faMeh, faSmile, faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import Ishihara1 from "../../../assets/ishihara1.png";
import Ishihara2 from "../../../assets/ishihara2.png";
import Ishihara3 from "../../../assets/ishihara3.png";
import Ishihara4 from "../../../assets/ishihara4.png";
import Ishihara5 from "../../../assets/ishihara5.png";
import Ishihara6 from "../../../assets/ishihara6.png";
import Ishihara7 from "../../../assets/ishihara7.png";
import Ishihara8 from "../../../assets/ishihara8.png";
import Ishihara9 from "../../../assets/ishihara9.png";
import Ishihara10 from "../../../assets/ishihara10.png";

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
  ];

  const values = [69, 4, 22, 78, 51, 99, 25, 44, 12, 8];

  const [daltonismeArray, setDaltonismeArray] = useState<DaltonismeArray[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const alreadyGenerated = useRef(false);

  const [answerNumber, setAnswerNumber] = useState<number | string>("");
  const inputAnswerNumber = useRef<HTMLInputElement>(null);
  const [newDaltonismeScore, setNewDaltonismeScore] = useState<number>(0);
  const [sendingloadingState, setSendingLoadingState] = useState<boolean>(false);

  useEffect(() => {
    if (!alreadyGenerated.current) {
      for (let i = 0; i < 10; i++) {
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

    if (newCurrentIndex == 10) {
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
    if (currentIndex == 10) {
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
          {currentIndex !== 10 && (
            <>
              <div className="firstPartPopUp">
                {daltonismeArray.length == 10 && (
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

          {currentIndex == 10 && (
            <>
              <div className="fullPopUp result">
                <div className="resultInfos">
                  <h3>Test fini ! Vous avez obtenu un score de {newDaltonismeScore}/10 !</h3>
                </div>
                <div className="resultSmiley">
                  {newDaltonismeScore < 3 && <FontAwesomeIcon icon={faFrown} />}
                  {newDaltonismeScore < 7 && newDaltonismeScore >= 4 && (
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
