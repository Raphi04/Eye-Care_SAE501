import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import OIIA from "../../../assets/oiia_cat.png";
import OIIA_MP3 from "../../../assets/OIIA.mp3";
import "./popUps.scss";
import { useEffect, useRef, useState } from "react";

interface AcuitePopProps {
  closePopUp: () => void;
}

interface LettersArray {
  letters: string;
  answer: string;
  size: number;
}

export default function AcuitePop({ closePopUp }: AcuitePopProps) {
  const pickRandomNumber = useRef<boolean>(false);
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const letterSizeInPx = [70, 56, 48, 42, 36, 30, 26, 22, 18, 14];

  const [allLettersArray, setAllLettersArray] = useState<LettersArray[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentLettersAnswer, setCurrentLettersAnswer] = useState<string>("");
  const answerInput = useRef<HTMLInputElement>(null);

  const OIIA_Audio = useRef<HTMLAudioElement>(null);
  const [isOIIA, setIsOIIA] = useState<boolean>(false);

  useEffect(() => {
    if (!pickRandomNumber.current) {
      for (let i = 0; i < 10; i++) {
        let lettersString = "";
        for (let j = 0; j < 5; j++) {
          const randomNumber = Math.floor(Math.random() * 26);
          lettersString += alphabet[randomNumber];
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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    //On modifie l'objet actuel
    const updatedObject = { ...allLettersArray[currentIndex], answer: currentLettersAnswer };

    //On met à jour l'array
    setAllLettersArray((prevState) => {
      const updatedArray = prevState.map((object, index) =>
        index == currentIndex ? (object = updatedObject) : object
      );
      console.log("test2" + updatedArray);
      return updatedArray;
    });

    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);

    setCurrentLettersAnswer("");
    if (answerInput.current) {
      answerInput.current.focus();
    }
  }

  function handleCurrentLettersAnswer(event: React.ChangeEvent<HTMLInputElement>) {
    const newCurrentLetterAnswer = event.target.value;
    setCurrentLettersAnswer(newCurrentLetterAnswer);
  }

  function handleOIIA() {
    setIsOIIA(true);

    setTimeout(() => {
      setIsOIIA(false);
    }, 500);

    if (OIIA_Audio.current) {
      OIIA_Audio.current.pause();
      OIIA_Audio.current.currentTime = 0;
      OIIA_Audio.current.play();
    }
  }

  useEffect(() => {
    console.log(allLettersArray);
  }, [allLettersArray]);

  return (
    <>
      <div className="popUpContainer">
        <div className="popUp">
          {currentIndex !== 10 && (
            <>
              <div className="fullPopUp">
                <div className="lettersContainer">
                  {allLettersArray.length == 10 &&
                    allLettersArray[currentIndex].letters.split("").map((letter) => {
                      return (
                        <div
                          className="letter"
                          style={{ fontSize: allLettersArray[currentIndex].size }}
                        >
                          {letter.toUpperCase()}
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
              <div className="fullPopUp">
                <img
                  src={OIIA}
                  alt="OIIA"
                  onClick={handleOIIA}
                  className={isOIIA ? "clicked" : ""}
                />
                <p>*OIIAI AOIII AI* (GG mon gars)</p>
                <audio src={OIIA_MP3} ref={OIIA_Audio} />
              </div>
              <div className="closePopUp" onClick={closePopUp}>
                <FontAwesomeIcon icon={faXmark} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
