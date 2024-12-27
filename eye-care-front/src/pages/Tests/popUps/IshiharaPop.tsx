import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import OIIA1 from "../../../assets/oiia_cat.png";
import OIIA2 from "../../../assets/oiia_cat.png";
import OIIA3 from "../../../assets/oiia_cat.png";
import OIIA4 from "../../../assets/oiia_cat.png";
import OIIA5 from "../../../assets/oiia_cat.png";
import OIIA6 from "../../../assets/oiia_cat.png";
import OIIA7 from "../../../assets/oiia_cat.png";
import OIIA8 from "../../../assets/oiia_cat.png";
import OIIA9 from "../../../assets/oiia_cat.png";
import OIIA10 from "../../../assets/oiia_cat.png";

import "./popUps.scss";
import { useEffect, useRef, useState } from "react";

interface DaltonismeArray {
  src: string;
  number: number;
  answer: number | string;
}

interface IshiharaPopProps {
  closePopUp: () => void;
}

export default function IshiharaPop({ closePopUp }: IshiharaPopProps) {
  const images = [OIIA1, OIIA2, OIIA3, OIIA4, OIIA5, OIIA6, OIIA7, OIIA8, OIIA9, OIIA10];

  const [daltonismeArray, setDaltonismeArray] = useState<DaltonismeArray[]>([]);
  const [currenIndex, setCurrentIndex] = useState<number>(0);
  const alreadyGenerated = useRef(false);

  const [answerNumber, setAnswerNumber] = useState<number | string>("");
  const inputAnswerNumber = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!alreadyGenerated.current) {
      for (let i = 1; i <= 10; i++) {
        const object: DaltonismeArray = {
          src: images[i - 1],
          number: 44,
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
    const newAnswerNumber = parseFloat(event.target.value);
    setAnswerNumber(newAnswerNumber);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newObject = { ...daltonismeArray[currenIndex], answer: answerNumber };

    setDaltonismeArray((prevState) => {
      const updateDaltonismeArray = prevState.map((object, index) =>
        index == currenIndex ? (object = newObject) : object
      );
      return updateDaltonismeArray;
    });

    const newCurrentIndex = currenIndex + 1;
    setCurrentIndex(newCurrentIndex);

    setAnswerNumber("");
    if (inputAnswerNumber.current) {
      inputAnswerNumber.current.focus();
    }
  }

  return (
    <>
      <div className="popUpContainer">
        <div className="popUp">
          {currenIndex !== 10 && (
            <>
              <div className="firstPartPopUp">
                {daltonismeArray.length == 10 && (
                  <img src={daltonismeArray[currenIndex].src} alt="OIIA CAT" />
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

          {currenIndex == 10 && (
            <>
              <div className="fullPopUp">
                <p>GG mon gars</p>
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
