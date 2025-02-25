import { Link } from "react-router-dom";
import ModelViewer from "../../components/ModelViewer";

import Model1 from "../../assets/3D_Model/glasses.glb";
import Model2 from "../../assets/3D_Model/OIIA_CAT.glb";

import Glasses from "../../assets/glasses.svg?react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import CommentsSection from "../../components/CommentsSection/CommentsSection";
import { useEffect, useState } from "react";

export default function Presbytie() {
  const [currentModel, setCurrentModel] = useState<any>(Model1);

  useEffect(() => {
    const switchModel = setInterval(() => {
      setCurrentModel((prevModel: any) => {
        if (prevModel == Model1) {
          console.log("convert to model 2");
          return Model2;
        } else {
          console.log("convert to model 1");
          return Model1;
        }
      });
    }, 5000);

    return () => clearInterval(switchModel);
  }, []);

  return (
    <>
      <main>
        <section className="presentationMaladie">
          <article className="textContainer">
            <h2>LA PRESBYTIE</h2>
            <p>
              La presbytie est un trouble visuel lié au vieillissement naturel
              de l'œil, qui se traduit par une difficulté croissante à voir
              nettement les objets ou textes situés à proximité. Ce phénomène
              est causé par une perte progressive de souplesse du cristallin, la
              lentille naturelle de l'œil, qui permet normalement de faire la
              mise au point sur différentes distances. Avec le temps, le
              cristallin devient moins flexible et les muscles oculaires peinent
              à ajuster sa courbure, rendant la vision de près floue. Ce trouble
              commence généralement à se manifester après l’âge de 40 ans et
              tend à s’accentuer jusqu’à environ 60 ans. Bien que la presbytie
              soit une conséquence naturelle du vieillissement et non une
              maladie en soi, elle peut considérablement impacter les activités
              quotidiennes comme la lecture ou l’utilisation d’un écran.
            </p>
          </article>
          <article className="model">
            <ModelViewer
              src={currentModel}
              alt="OIIA"
              scale="4 4 4"
              loading="eager"
              environmentImage="neutral"
              cameraControls
              interaction-prompt="none"
            />
          </article>
        </section>

        <section className="quelquesChiffres">
          <h2>INFORMATIONS CLÉS</h2>
          <article className="chiffresContainer">
            <div className="chiffres">
              <h3>100 % des + de 45 ans</h3>
              <p>
                La presbytie touche environ 100 % des individus âgés de plus de
                45 ans à des degrés variables.
              </p>
            </div>
            <div className="chiffres">
              <h3>≃ 2,1 milliards</h3>
              <p>
                Environ 2,1 milliards de personnes dans le monde sont presbytes,
                selon l'OMS, dont 1,1 milliard ne peuvent pas accéder à des
                soins pour corriger cette condition.
              </p>
            </div>
          </article>
          <article className="chiffresContainer">
            <div className="chiffres">
              <h3>- 50 % de productivité</h3>
              <p>
                Sans correction, la presbytie affecte directement la
                productivité de 50 % des adultes en âge de travailler dans
                certains pays en développement.
              </p>
            </div>
            <div className="chiffres">
              <h3>Les symptomes ↗</h3>
              <p>
                Les symptômes augmentent avec l'âge, nécessitant souvent des
                corrections plus fortes au fil du temps. Cependant, il s'agit
                d'un phénomène naturel, et il n'y a pas de raison de
                s'inquiéter.
              </p>
            </div>
          </article>
        </section>

        <section className="causes">
          <article className="textContainer">
            <h2>LES CAUSES</h2>
            <p>
              La presbytie est causée par une combinaison de facteurs
              physiologiques liés à l’âge. Avec le temps, le cristallin de l’œil
              perd de son élasticité, ce qui empêche une adaptation efficace
              pour la vision de près. Ce processus est inévitable et n’est pas
              influencé par des facteurs extérieurs comme l’utilisation
              prolongée d’écrans ou la fatigue oculaire, bien que ces derniers
              puissent accentuer la perception des symptômes.{" "}
            </p>
            <p>
              Par ailleurs, le vieillissement des muscles ciliaires, qui
              contrôlent la courbure du cristallin, contribue également à ce
              trouble. Contrairement à d’autres défauts visuels comme la myopie
              ou l’hypermétropie, la presbytie est directement liée au processus
              de vieillissement et touche toutes les personnes, indépendamment
              de leur santé oculaire préalable.
            </p>
          </article>
          <article className="glasses">
            <Glasses />
          </article>
        </section>

        <section className="traitements">
          <h2>LES TRAITEMENTS</h2>
          <p>
            La presbytie peut être corrigée de différentes manières pour
            améliorer la vision de près. Les lunettes sont la solution la plus
            courante, avec des verres progressifs ou des verres de lecture
            spécifiques, qui offrent une correction adaptée pour la mise au
            point de près. Les lentilles de contact, notamment les lentilles
            multifocales ou la monovision, représentent une autre alternative
            pour les personnes qui préfèrent éviter le port de lunettes.{" "}
          </p>
          <p>
            Pour ceux qui recherchent une solution permanente, des interventions
            chirurgicales existent, comme le remplacement du cristallin par une
            lentille artificielle multifocale ou l’utilisation de techniques au
            laser pour remodeler la cornée et compenser la perte de souplesse du
            cristallin. Enfin, de nouvelles technologies, comme des implants
            accommodatifs ou des collyres expérimentaux visant à restaurer une
            partie de l’élasticité du cristallin, sont en cours de
            développement. Cependant, il est essentiel de consulter un
            ophtalmologiste pour choisir la solution la plus adaptée à ses
            besoins.
          </p>

          <article className="articlesContainer">
            <Link to="/articles/hypermetropie" className="articleLink">
              <div>
                <h3>L'HYPERMÉTROPIE</h3>
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
              <p>
                C'est un trouble de la vision qui se traduit par une difficulté
                à voir nettement....
              </p>
            </Link>

            <Link to="/articles/dmla" className="articleLink">
              <div>
                <h3>LA DMLA</h3>
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
              <p>
                C'est une affection oculaire chronique qui affecte la macula, la
                partie centrale de la rétine....
              </p>
            </Link>

            <Link to="/articles/myopie" className="articleLink">
              <div>
                <h3>LA MYOPIE</h3>
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
              <p>
                C'est un trouble visuel qui se traduit par vision claire pour
                les objets proches mais une difficulté....
              </p>
            </Link>
          </article>
        </section>

        <CommentsSection subject="presbytie" />
      </main>
    </>
  );
}
