import GrilleDMLA from "../../assets/grilleDMLA.png";

export default function DmlaTest() {
  return (
    <>
      <div className="textContainer">
        <h2>Test de dégénérescence maculaire liée à l'âge (DMLA)</h2>
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
          Avant d’effectuer l’auto-test de la grille d’Amsler veillez à être dans une pièce bien
          éclairée et à porter vos lunettes de vue si vous en avez.
        </p>

        <div className="evenMoreTextContainer">
          <div>
            <h3>Étapes à suivre :</h3>
            <ol>
              <li>Placez la grille à votre distance habituelle de lecture.</li>
              <li>Cachez un œil sans le presser</li>
              <li>Fixez le point central sans le presser</li>
              <li>
                Vérifiez que :
                <ul>
                  <li>les lignes sont droites.</li>
                  <li>les intersections forment des angles droits.</li>
                  <li>Les cadres sont de la même taille</li>
                </ul>
              </li>
              <li>Répétez le test avec l'autre œil.</li>
            </ol>
          </div>
          <img src={GrilleDMLA} alt="grille DMLA" />
        </div>
        <p>
          Si vous remarquez des zones floues, des lignes ondulées, distordues ou interrompues, une
          absence du point noir, il est urgent de consulter votre ophtalmologue.
        </p>
      </div>

      <div className="textContainer">
        <h2>Pour consulter :</h2>
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
        <h2>Diagnostic</h2>
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
