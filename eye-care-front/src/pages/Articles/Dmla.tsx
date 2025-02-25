import { Link } from "react-router-dom";
import ModelViewer from "../../components/ModelViewer";

import Model from "../../assets/3D_Model/emmanuel.glb";
import White from "../../assets/3D_Model/white.png";
import Glasses from "../../assets/glasses.svg?react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import CommentsSection from "../../components/CommentsSection/CommentsSection";

export default function Dmla() {
  return (
    <>
      <main>
        <section className="presentationMaladie">
          <article className="textContainer">
            <h2>DMLA</h2>
            <p>
              La Dégénérescence Maculaire Liée à l’Âge (DMLA) est une affection
              oculaire chronique qui affecte la macula, la partie centrale de la
              rétine, responsable de la vision fine et des détails. Elle
              entraîne une perte progressive de la vision centrale, rendant des
              tâches comme la lecture, l’écriture, ou la reconnaissance des
              visages de plus en plus difficiles. La vision périphérique reste
              généralement intacte, ce qui empêche une cécité totale, mais
              l’impact sur la qualité de vie peut être important. La DMLA est
              une des principales causes de malvoyance chez les personnes âgées,
              et son évolution varie en fonction de la forme de la maladie :
              sèche ou humide.
            </p>
          </article>
          <article className="model">
            <ModelViewer
              src={Model}
              alt="OIIA"
              loading="eager"
              skyboxImage={White}
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
              <h3>≃ 196 million</h3>
              <p>
                Environ 196 millions de personnes dans le monde sont atteintes
                de DMLA.En France, 1,5 million de personnes en sont atteintes,
                avec environ 200 000 nouveaux cas diagnostiqués chaque année.
              </p>
            </div>
            <div className="chiffres">
              <h3>Facteurs de risques</h3>
              <p>
                Les personnes ayant des antécédents familiaux de DMLA ont 3 à 4
                fois plus de risques de développer la maladie. Les fumeurs ont
                également un risque 2 à 4 fois plus élevé de développer une DMLA
                que les non-fumeurs.
              </p>
            </div>
          </article>
          <article className="chiffresContainer">
            <div className="chiffres">
              <h3>Importance de l'alimentation</h3>
              <p>
                Une alimentation riche en antioxydants, en oméga-3, et en
                lutéine (fruits, légumes verts) peut réduire le risque de
                développer une DMLA.
              </p>
            </div>
            <div className="chiffres">
              <h3>Manque de protection</h3>
              <p>
                Lors d'activité en extérieur, une exposition prolongée aux
                rayons UV ou une faible protection solaire augmente légèrement
                le risque de DMLA.
              </p>
            </div>
          </article>
        </section>

        <section className="causes">
          <article className="textContainer">
            <h2>LES CAUSES</h2>
            <p>
              La DMLA est causée par un vieillissement progressif des cellules
              de la macula, pouvant être aggravé par des facteurs génétiques et
              environnementaux. Parmi les principales causes figurent l’âge, le
              facteur le plus déterminant, ainsi que la prédisposition génétique
              (antécédents familiaux). Les habitudes de vie, comme le tabagisme,
              sont également des facteurs aggravants. Une exposition prolongée
              aux rayons ultraviolets, une alimentation pauvre en antioxydants,
              et des problèmes cardiovasculaires (comme l’hypertension)
              augmentent aussi les risques de développer la DMLA.
            </p>
          </article>
          <article className="glasses">
            <Glasses />
          </article>
        </section>

        <section className="traitements">
          <h2>LES TRAITEMENTS</h2>
          <p>La prise en charge de la DMLA dépend de sa forme : </p>
          <ul>
            <li>
              Pour la <b>forme sèche</b>, il n’existe pas de traitement curatif,
              mais des mesures préventives comme une alimentation riche en
              antioxydants (vitamines C et E, zinc, lutéine) et des compléments
              alimentaires peuvent ralentir la progression de la maladie.
            </li>
            <li>
              Pour la <b>forme humide</b>, des traitements par injections
              intraoculaires (anti-VEGF) permettent de stopper la croissance des
              néovaisseaux responsables des dégâts à la rétine et d’améliorer la
              vision dans certains cas.
            </li>
          </ul>
          <p>
            La <b>rééducation visuelle</b> et l’utilisation d’aides optiques
            (loupe électronique, lunettes spécifiques) permettent d’aider les
            patients à mieux vivre avec la maladie. Un suivi régulier chez
            l’ophtalmologue est essentiel pour détecter la maladie tôt, surtout
            si des symptômes comme des lignes droites apparaissent déformées ou
            si une tâche floue se développe dans le champ de vision central.
            Plus le diagnostic est précoce, meilleures sont les chances de
            ralentir l’évolution de la DMLA.
          </p>

          <article className="articlesContainer">
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

            <Link to="/articles/astigmatisme" className="articleLink">
              <div>
                <h3>L'ASTIGMATISME</h3>
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
              <p>
                C'est un trouble visuel qui se caractérise par une vision floue
                ou déformée....
              </p>
            </Link>
          </article>
        </section>
        <CommentsSection subject="dmla" />
      </main>
    </>
  );
}
