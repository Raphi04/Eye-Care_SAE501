import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import ModelViewer from "../../components/ModelViewerNormal";
import { Link } from "react-router-dom";
import Phoroptere from "../../assets/3D_Model/Phoropter_final.glb";
import Collyre from "../../assets/3D_Model/collyre.glb";
import lentille from "../../assets/3D_Model/contact-lens.glb";
import Tonometre from "../../assets/3D_Model/Tonometre_final.glb";
import Oeilcomplet from "../../assets/3D_Model/oeil_complet.glb";
import pupille from "../../assets/3D_Model/pupille.glb";
import Oeildecoupe from "../../assets/3D_Model/oeil_splited.glb";
import Fonctionnement from "../../assets/3D_Model/fonctionnement.glb";
import Cristallin from "../../assets/3D_Model/cristallin.glb";
import Cornee from "../../assets/3D_Model/cornee.glb";
import Retine from "../../assets/3D_Model/retine.glb";
import oeuilcoupe from "../../assets/oeuil_decoupe.png";
import sunglasses from "../../assets/3D_Model/Lunettes.glb";
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
        <p>Bienvenue sur notre page dédiée au fonctionnement de l’œil et aux bonnes pratiques en ophtalmologie ! Nos yeux sont des organes fascinants et complexes, nous permettant de percevoir le monde qui nous entoure. Comprendre leur mécanisme, des rayons lumineux captés par la rétine jusqu'à l'interprétation des images par le cerveau, est essentiel pour mieux en prendre soin. Afin de préserver votre santé visuelle, nous vous partagerons ici des conseils pratiques, des habitudes à adopter au quotidien et des recommandations d'experts pour prévenir les troubles oculaires. Découvrez comment protéger votre vision et adopter les bons réflexes pour des yeux en pleine santé !
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
                <p>Vous pouvez observer à quoi ressemble un œil en dehors de sa fosse orbitaire, révélant ainsi son anatomie complète et sa structure. Vous pouvez notamment observer la sclérotique qui est la partie blanche de l’œil, elle forme une enveloppe protectrice rigide qui maintient la forme du globe oculaire.</p>
              </div>
            )}
            {activeButton === "Fonctionnement" && (
              <div className="activetxt">
                <h2>Comment ça marche ?</h2>
                <p>L'œil humain est une excroissance du cerveau qui capte la lumière et nous permet de percevoir le monde qui nous entoure. C’est d'ailleurs grâce au cristallin se trouvant à l'arrière de l'iris, que celui-ci permet de focaliser les rayons lumineux sur la rétine, en changeant de forme. Par l'action de petits muscles (appelés muscles ciliaires), le cristallin s'épaissit pour faire la mise au point sur les objets proches et s'amincit pour se concentrer sur les objets éloignés.</p>
              </div>
            )}
            {activeButton === "PupilleIris" && (
              <div className="activetxt">
                <h2>la pupille & l'iris</h2>
                <p>L'iris est le disque pigmenté à l'origine de la couleur des yeux. Il joue le rôle de diaphragme, en contrôlant l'ouverture de la pupille (la zone sombre de l'œil) grâce à ses muscles, permettant ainsi de réguler la quantité de lumière qui pénètre dans l’œil.</p>
              </div>
            )}
            {activeButton === "Cristallin" && (
              <div className="activetxt">
                <h2>Le cristallin</h2>
                <p>Le cristallin est une lentille transparente naturelle située à l'intérieur de l'œil, derrière l'iris. Il permet aux rayons lumineux de converger à l'intérieur de l'œil pour les concentrer sur la rétine.</p>
              </div>
            )}
            {activeButton === "Cornee" && (
              <div className="activetxt">
                <h2>la cornée</h2>
                <p>La cornée est la première surface optique de l’œil. Comme un verre de montre, elle joue un rôle protecteur, en recouvrant la partie antérieure de l'œil devant l'iris et la pupille. Elle transmet la lumière au cristallin et à la rétine.</p>
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
        </section>
        <section className="conseils">
          <div className="texte">
            <h1>Bonnes pratiques avec les écrans</h1>
            <p>Si vous travaillez sur écran, la bonne posture à adopter pour le bien-être de vos yeux consiste à régler votre ordinateur à la hauteur de votre regard (ou juste en-dessous) et garder une distance de 40 à 50 centimètres entre vos yeux et l’écran. Les plus technophiles d'entre vous sauront que la majorité des appareils possèdent un mode anti lumière bleue, pensez donc à l'activer dès que possible !
De même, pensez à régler sa luminosité, à adapter notamment à l’éclairage de votre environnement. Dernière astuce, pensez à cligner des yeux. En effet, la lumière bleue des écrans entraîne une diminution des clignements d’yeux, pourtant naturels et utiles pour limiter la sécheresse et la fatigue oculaire.
</p>
          </div>
          <img src={bluelight}></img>
        </section>
        <section className="conseils">
          
          <div className="modelviewer">
            <ModelViewer 
              src={Tonometre}
              alt="oeilcomplet"
              loading="auto"
              environmentImage="neutral"
              cameraControls
              interaction-prompt="none"
            />
          </div>
          <div className="texte" style={{width:500}}>
            <h1> Consultez régulièrement un ophtalmologiste</h1>
            <p>Songez à consulter régulièrement un ophtalmologiste. Cette visite doit avoir lieu tous les 2 à 3 ans en moyenne, et dès que possible en cas de gêne oculaire. Ce spécialiste est le mieux placé pour évaluer la qualité de votre vue, repérer les premiers signes d’un trouble de la vision, mais aussi dépister certaines maladies oculaires. Nous vous recommandons nos test de vues directement disponible dans l’onglet “Test”. Ils vous permettront d’avoir un premier regard sur votre santé oculaire.
            </p>
          </div>
          <div className="modelviewer">
            <ModelViewer 
              src={Phoroptere}
              alt="oeilcomplet"
              loading="auto"
              environmentImage="neutral"
              cameraControls
              interaction-prompt="none"
            />
          </div>
        </section>
        <section className="conseils">          
          <div className="modelviewer">
            <ModelViewer 
              src={sunglasses}
              alt="oeilcomplet"
              loading="auto"
              environmentImage="neutral"
              cameraControls
              interaction-prompt="none"
            />
          </div>
          <div className="texte">
            <h1> Protégez vos yeux des rayons du soleil</h1>
            <p>Quelle que soit la couleur de vos yeux, il est important de les préserver d’une exposition prolongée aux rayons du soleil, dont les effets néfastes peuvent atteindre la rétine ou entraîner l’apparition précoce de la cataracte.
La protection la plus efficace reste les lunettes de soleil : elles doivent aussi bien filtrer les UVA (rayons ultraviolets aux longueurs d’ondes les plus élevées) que les UVB (rayons ultraviolets aux longueurs d’ondes moyennes).  Par ailleurs, préférez de grands verres à de plus petits qui ne protégeraient pas entièrement votre vision de côté.
Porter un couvre-chef est également un bon moyen de protéger ses yeux des rayons solaires. Enfin, ne regardez jamais directement le soleil, même avec des lunettes adaptées : des rayons ultraviolets et infrarouges risquent de brûler certains endroits de votre rétine.

            </p>
          </div>
        </section>
        <section className="conseils">          
          <div className="modelviewer">
            <ModelViewer 
              src={Collyre}
              alt="oeilcomplet"
              loading="auto"
              environmentImage="neutral"
              cameraControls
              interaction-prompt="none"
            />
          </div>
          <div className="texte" style={{width:500}}>
            <h1> Améliorez la qualité de votre vie</h1>
            <p>Pendant la nuit, vos yeux se régénèrent : un sommeil de 6 à 8 heures, dans l'obscurité totale, favorise leur hydratation et l'élimination des impuretés. L'air frais aide aussi à détendre les yeux fatigués, surtout dans un environnement chauffé. Pensez à aérer régulièrement et à humidifier l'air. Pour éviter la sécheresse oculaire, hydratez-vous bien et utilisez du sérum physiologique si besoin. Si vous portez des lentilles de contact, veillez à bien les entretenir et à ne pas les porter trop longtemps pour préserver votre confort visuel.

            </p>
          </div>
          <div className="modelviewer">
            <ModelViewer 
              src={lentille}
              alt="oeilcomplet"
              loading="auto"
              environmentImage="neutral"
              cameraControls
              interaction-prompt="none"
            />
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
