import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import ModelViewer from "../../components/ModelViewerNormal";
import { Link } from "react-router-dom";
import Oeilcomplet from "../../assets/3D_Model/oeil_complet.glb";
import pupille from "../../assets/3D_Model/pupille.glb";
import Oeildecoupe from "../../assets/3D_Model/oeil_splited.glb";
import Fonctionnement from "../../assets/3D_Model/fonctionnement.glb";
import Cristallin from "../../assets/3D_Model/cristallin.glb";
import Cornee from "../../assets/3D_Model/cornee.glb";
import Retine from "../../assets/3D_Model/retine.glb";
import oeuilcoupe from "../../assets/oeuil_decoupe.png";
import sunglasses from "../../assets/sunglasses.png";
import hygiene from "../../assets/hygiene.jpg";
import bluelight from "../../assets/bluelight.jpg";
import oeuilcomplet from "../../assets/oeuil_complet.png";
import "./oeil.scss";

export default function Oeil() {
  const [currentModel, setCurrentModel] = useState<any>(Oeilcomplet);
  const [activeButton, setActiveButton] = useState<string>("Oeilcomplet");

  function changeModel(model: any, modelName: string) {
    setCurrentModel(model);
    setActiveButton(modelName);
  }


  return (
    <>
      <main className="oeil">
      <section className="top">
        <h1>L'oeil</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat quas repellendus pariatur adipisci harum iusto voluptates velit nesciunt veritatis reprehenderit dolor dicta, quia perspiciatis mollitia? Ad inventore nam deleniti quo?
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores error accusamus in provident repellendus vero. Fugiat, odio explicabo doloribus aliquam dolores id vel facilis nostrum eligendi, nihil, sit inventore soluta!
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt omnis culpa adipisci mollitia provident impedit odio in fugit quae. Nostrum cupiditate culpa est quod! Animi esse ipsam odio cum qui.
        </p>
      </section>
        <section className="fonctionnement">        
          <section className="modelviewer">
          <ModelViewer 
            src={currentModel}
            alt="oeilcomplet"
            loading="auto"
            environmentImage="neutral"
            cameraControls
            interaction-prompt="none"
            orbit="45deg 55deg 4m"
          />
          </section>
          <section className="boutons">
            <button 
              className={`bouton bouton-haut ${activeButton === "Oeilcomplet" ? "active" : ""}`}
              onClick={() => changeModel(Oeilcomplet, "Oeilcomplet")}
            ><img src={oeuilcomplet} className="iconeoeil" />
              Oeil complet
            </button>
            <button 
              className={`bouton bouton-haut ${activeButton === "Oeildecoupe" ? "active" : ""}`}
              onClick={() => changeModel(Oeildecoupe, "Oeildecoupe")}
            ><img src={oeuilcoupe} className="iconeoeil" />
              Oeil découpé
            </button>
            <button 
              className={`bouton bouton-large ${activeButton === "Fonctionnement" ? "active" : ""}`}
              onClick={() => changeModel(Fonctionnement, "Fonctionnement")}
            >
              Fonctionnement
            </button>

            <button 
              className={`bouton ${activeButton === "PupilleIris" ? "active" : ""}`}
              onClick={() => changeModel(pupille, "PupilleIris")}
            >
              Pupille & Iris
            </button>

            <button
              className={`bouton ${activeButton === "Cristallin" ? "active" : ""}`}
              onClick={() => changeModel(Cristallin, "Cristallin")}
            > 
              Cristallin
            </button>
            <button 
              className={`bouton ${activeButton === "Cornee" ? "active" : ""}`}
              onClick={() => changeModel(Cornee, "Cornee")}
            >
              Cornée
            </button>
            <button 
              className={`bouton ${activeButton === "Retine" ? "active" : ""}`}
              onClick={() => changeModel(Retine, "Retine")}
            >
              Rétine
            </button>
            
          </section>
          <section className="texte-description">
            {(activeButton === "Oeilcomplet" || activeButton === "Oeildecoupe") && (
              <div className="activetxt">
                <h2>L'oeil humain</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto repellendus illo porro reiciendis sit ducimus? Voluptatem, vitae. Vero consectetur corporis magnam unde labore! Nobis soluta ipsum amet illo consequuntur sint!</p>
              </div>
            )}
            {activeButton === "Fonctionnement" && (
              <div className="activetxt">
                <h2>Comment ça marche ?</h2>
                <p>L'œil fonctionne comme un appareil photo en capturant la lumière pour créer des images. Tout commence lorsque la lumière entre dans l’œil par la cornée, une surface transparente qui aide à diriger et à concentrer les rayons lumineux. Ensuite, la lumière traverse la pupille, dont la taille est ajustée par l’iris en fonction de la luminosité.

Derrière la pupille se trouve le cristallin, une lentille naturelle qui ajuste sa forme pour focaliser la lumière précisément sur la rétine, située au fond de l’œil. La rétine, composée de millions de cellules sensibles à la lumière, transforme ces rayons lumineux en signaux électriques qui sont envoyés au cerveau via le nerf optique. Enfin, le cerveau interprète ces signaux pour former l'image que nous voyons.</p>
              </div>
            )}
            {activeButton === "PupilleIris" && (
              <div className="activetxt">
                <h2>la pupille & l'iris</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum dolorem laboriosam, adipisci explicabo autem veniam cupiditate aliquid porro dolores quisquam ut deleniti itaque rerum vitae. Doloremque quia laboriosam nemo omnis.</p>
              </div>
            )}
            {activeButton === "Cristallin" && (
              <div className="activetxt">
                <h2>Le cristallin</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum dolorem laboriosam, adipisci explicabo autem veniam cupiditate aliquid porro dolores quisquam ut deleniti itaque rerum vitae. Doloremque quia laboriosam nemo omnis.</p>
              </div>
            )}
            {activeButton === "Cornee" && (
              <div className="activetxt">
                <h2>la cornée</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum dolorem laboriosam, adipisci explicabo autem veniam cupiditate aliquid porro dolores quisquam ut deleniti itaque rerum vitae. Doloremque quia laboriosam nemo omnis.</p>
              </div>
            )}
            {activeButton === "Retine" && (
              <div className="activetxt">
                <h2>la rétine</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum dolorem laboriosam, adipisci explicabo autem veniam cupiditate aliquid porro dolores quisquam ut deleniti itaque rerum vitae. Doloremque quia laboriosam nemo omnis.</p>
              </div>
            )}
          </section>
        </section>
        <section className="top">
          <h1>Préserver votre vision</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum dolorem laboriosam, adipisci explicabo autem veniam cupiditate aliquid porro dolores quisquam ut deleniti itaque rerum vitae. Doloremque quia laboriosam nemo omnis.</p>
        </section>
        <section className="conseils">
          <div>
            <h1> Lumière bleue</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum dolorem laboriosam, adipisci explicabo autem veniam cupiditate aliquid porro dolores quisquam ut deleniti itaque rerum vitae. Doloremque quia laboriosam nemo omnis.</p>
          </div>
          <img src={bluelight}></img>
        </section>
        <section className="conseils">
          <img src={sunglasses}></img>
          <div>
            <h1> Lumière bleue</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum dolorem laboriosam, adipisci explicabo autem veniam cupiditate aliquid porro dolores quisquam ut deleniti itaque rerum vitae. Doloremque quia laboriosam nemo omnis.</p>
          </div>
        </section>
        
        <section>
          <article className="articlesContainer">
            <Link to="/articles/daltonisme" className="articleLink">
              <div>
                <h3>LE DALTONISME</h3>
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
              <p>C'est un trouble de la vision des couleurs qui empêche certaines personnes....</p>
            </Link>

            <Link to="/articles/presbytie" className="articleLink">
              <div>
                <h3>LA PRESBYTIE</h3>
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
              <p>
                C'est un trouble visuel lié au vieillissement naturel de l'œil, qui se traduit....
              </p>
            </Link>

            <Link to="/articles/hypermetropie" className="articleLink">
              <div>
                <h3>L'HYPERMÉTROPIE</h3>
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
              <p>
                C'est un trouble de la vision qui se traduit par une difficulté à voir nettement....
              </p>
            </Link>
          </article>
        </section>

        
      </main>
    </>
  );
}
