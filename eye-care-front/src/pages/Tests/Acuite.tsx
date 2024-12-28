import { useState } from "react";
import AcuitePop from "./popUps/AcuitePop";

export default function Acuite() {
  const [acuiteScore, setAcuiteScore] = useState<any>(() => {
    return localStorage.getItem("acuiteScore") || "";
  });

  const [testIsStarted, setTestIsStarted] = useState<Boolean>(false);

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
        <p>Score actuel : {acuiteScore ? acuiteScore + "/50" : "-"}</p>
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
      {testIsStarted && <AcuitePop closePopUp={handleChangeTestIsStarted} />}
    </>
  );
}
