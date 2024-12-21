import { useState } from "react";

export default function DaltonismeTest() {
  const [daltonismeScore, setDaltonismeScore] = useState<any>(() => {
    return localStorage.getItem("daltonismeScore") || "";
  });

  return (
    <>
      <div className="textContainer">
        <h2>Test de Daltonisme</h2>
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
        <button>LANCER LE TEST</button>
        <p>Score actuel : {daltonismeScore ? daltonismeScore + "/50" : "-"}</p>
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
    </>
  );
}
