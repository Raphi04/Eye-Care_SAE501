import { useState } from "react";
import GrilleDMLA from "../../assets/grilleDMLA.png";
import { useApiContext } from "../../components/ApiProvider";

export default function DmlaTest() {
  //URL dynamique de l'API
  const APIURL = import.meta.env.VITE_API_URL;

  //ConnectedUser
  const { connectedUser, loadingState } = useApiContext();
  const token = localStorage.getItem("token") || "";

  //Loading
  const [sendingloadingState, setSendingLoadingState] =
    useState<boolean>(false);

  async function sendResultsToDB() {
    if (connectedUser && !loadingState) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", "auth-token": token },
        body: JSON.stringify({
          vision_disorder: "dmla",
          result: "0",
        }),
      };

      try {
        setSendingLoadingState(true);
        const response = await fetch(
          `${APIURL}/user/user_vision_disorder_result`,
          requestOptions
        );

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
      } catch (error: any) {
        console.log("Erreur lors de l'envoie : " + error.message);
      } finally {
        setSendingLoadingState(false);
      }
    }
  }
  return (
    <>
      <div className="textContainer">
        <h2>Test de dégénérescence maculaire liée à l'âge (DMLA)</h2>
        <p>
          Un test de dégénérescence maculaire liée à l'âge sert à détecter une
          mauvaise condition de la partie centrale de l'œil. Cette maladie
          évolue généralement chez les personnes de plus de 50 ans.
        </p>
      </div>

      <div className="textContainer">
        <h2>Déroulement du test</h2>
        <p>
          Avant d’effectuer l’auto-test de la grille d’Amsler veillez vous
          mettre dans une pièce bien éclairée et à porter vos lunettes de vue si
          vous en avez.
        </p>

        <div className="evenMoreTextContainer">
          <div>
            <h3>Étapes à suivre :</h3>
            <ol>
              <li>Placez la grille à votre distance habituelle de lecture.</li>
              <li>Cachez un œil sans le presser</li>
              <li>Fixez le point centrale</li>
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
            <div>
              <button
                onClick={sendResultsToDB}
                disabled={sendingloadingState}
                className="dmlaButton"
              >
                Valider Test
              </button>
            </div>
          </div>
          <img src={GrilleDMLA} alt="grille DMLA" />
        </div>
      </div>

      <div className="textContainer">
        <h2>Diagnostic</h2>
        <p>
          Notre test n'est pas à prendre comme un résultat définitif et
          correspondant à 100% à votre acuité visuelle. Il se peut qu'il n'ait
          pas pu s'adapter à la morphologie de votre écran ou qu'il ait été
          réalisé dans de mauvaises conditions
          <br />
          <br />
          Si vous remarquez des zones floues, des lignes ondulées, distordues ou
          interrompues ou bien une absence du point noir, il est alors conseillé
          de consulter un professionnel de santé.
        </p>
      </div>

      <div className="textContainer">
        <h2>Pour consulter :</h2>
        <p>
          En cas de suspicion de DMLA, vous pouvez consulter un ophtalmologiste.
          C'est un médecin spécialisé dans la science de l'œil qui pourra vous
          faire passer ce test dans un cadre professionnel. En cas de DMLA
          avérée, il pourra vous fournir un traitement permettant de ralentir sa
          progression.
        </p>
      </div>
    </>
  );
}
