import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown, faMeh, faSmile, faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./popUps.scss";
import { useEffect, useRef, useState } from "react";
import { useApiContext } from "../../../components/ApiProvider";

interface AcuitePopProps {
  closePopUp: () => void;
  upDateScore: (newScore: string) => void;
}

interface LettersArray {
  letters: string;
  answer: string;
  size: number;
}

export default function AcuitePop({ closePopUp, upDateScore }: AcuitePopProps) {
  //ConnectedUser
  const { connectedUser, loadingState } = useApiContext();
  const token = localStorage.getItem("token") || "";

  //Variable pour la selection aléatoire des lettres
  const pickRandomNumber = useRef<boolean>(false);
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const letterSizeInPx = [70, 56, 48, 42, 36, 30, 26, 22, 18, 14];

  //Variable de la partie fonctionnelle du test
  const [allLettersArray, setAllLettersArray] = useState<LettersArray[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentLettersAnswer, setCurrentLettersAnswer] = useState<string>("");
  const answerInput = useRef<HTMLInputElement>(null);
  const [newAcuiteScore, setNewAcuiteScore] = useState<number>(0);
  const [sendingloadingState, setSendingLoadingState] = useState<boolean>(false);

  useEffect(() => {
    if (!pickRandomNumber.current) {
      for (let i = 0; i < 10; i++) {
        let lettersString = "";
        for (let j = 0; j < 5; j++) {
          const randomNumber = Math.floor(Math.random() * 26);
          lettersString += alphabet[randomNumber].toUpperCase();
        }
        setAllLettersArray((prevState) => [
          ...prevState,
          { letters: lettersString, answer: "", size: letterSizeInPx[i] },
        ]);
      }
      pickRandomNumber.current = true;
    }

    if (answerInput.current) {
      answerInput.current.focus();
    }
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    //On modifie l'objet actuel
    const updatedObject = { ...allLettersArray[currentIndex], answer: currentLettersAnswer };

    const updatedArray = allLettersArray.map((object, index) =>
      index == currentIndex ? (object = updatedObject) : object
    );

    //On met à jour l'array
    setAllLettersArray(updatedArray);

    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);

    setCurrentLettersAnswer("");
    if (answerInput.current) {
      answerInput.current.focus();
    }

    if (nextIndex == 10) {
      let newAcuiteScore = 0;
      updatedArray.map((object) => {
        for (let i = 0; i < object.letters.length; i++) {
          if (object.letters[i] == object.answer[i]) {
            newAcuiteScore++;
          }
        }
      });
      if (!connectedUser && !loadingState) {
        localStorage.setItem("acuiteScore", newAcuiteScore.toString());
      }
      upDateScore(newAcuiteScore.toString());
      setNewAcuiteScore(newAcuiteScore);
    }
  }

  function handleCurrentLettersAnswer(event: React.ChangeEvent<HTMLInputElement>) {
    const newCurrentLetterAnswer = event.target.value.toUpperCase();
    setCurrentLettersAnswer(newCurrentLetterAnswer);
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
          vision_disorder: "myopie",
          result: newAcuiteScore,
        }),
      };

      try {
        setSendingLoadingState(true);
        const response = await fetch(
          "http://localhost:8000/user/user_vision_disorder_result",
          requestOptions
        );

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
      localStorage.setItem("acuiteScore", newAcuiteScore.toString());
      closePopUp();
    }
  }

  return (
    <>
      <div className="popUpContainer">
        <div className="popUp">
          {currentIndex !== 10 && (
            <>
              <div className="fullPopUp">
                <div className="lettersContainer">
                  {allLettersArray.length == 10 &&
                    allLettersArray[currentIndex].letters.split("").map((letter, index) => {
                      return (
                        <div
                          key={index}
                          className="letter"
                          style={{ fontSize: allLettersArray[currentIndex].size }}
                        >
                          {letter}
                        </div>
                      );
                    })}
                </div>
                <div className="bottomActions">
                  <form onSubmit={handleSubmit}>
                    <input
                      ref={answerInput}
                      type="text"
                      placeholder=". . ."
                      value={currentLettersAnswer}
                      onChange={handleCurrentLettersAnswer}
                    />
                    <button type="submit">Valider</button>
                  </form>
                  <h3>Écrivez les lettres que vous voyez à l’écran dans le champ ci-dessus</h3>
                </div>
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
                  <h3>Test fini ! Vous avez obtenu un score de {newAcuiteScore}/50 !</h3>
                </div>
                <div className="resultSmiley">
                  {newAcuiteScore < 25 && <FontAwesomeIcon icon={faFrown} />}
                  {newAcuiteScore < 40 && newAcuiteScore >= 25 && <FontAwesomeIcon icon={faMeh} />}
                  {newAcuiteScore >= 40 && <FontAwesomeIcon icon={faSmile} />}
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
