import { Link } from "react-router-dom";

import Glasses from "../../assets/glasses.svg?react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import CommentsSection from "../../components/CommentsSection/CommentsSection";

export default function Astigmatisme() {
  return (
    <>
      <main>
        <section className="presentationMaladie">
          <article className="textContainer">
            <h2>L'ASTIGMATISME</h2>
            <p>
              L’astigmatisme est un trouble visuel qui se caractérise par une
              vision floue ou déformée, quelle que soit la distance des objets
              observés. Ce défaut de réfraction peut entraîner une perception
              altérée des formes et des contours, rendant les lignes droites ou
              les détails difficiles à discerner. Par exemple, les lettres sur
              une page ou les panneaux de signalisation peuvent sembler
              dédoublés ou brouillés. Bien que ce trouble ne soit pas une
              maladie grave, il peut causer de la fatigue oculaire, des maux de
              tête et une gêne dans la vie quotidienne, surtout lorsqu’il n’est
              pas corrigé.
            </p>
          </article>
        </section>

        <section className="quelquesChiffres">
          <h2>INFORMATIONS CLÉS</h2>
          <article className="chiffresContainer">
            <div className="chiffres">
              <h3>≃ 30 %</h3>
              <p>
                Environ 30 % de la population mondiale présente une forme
                d'astigmatisme, qui peut varier en termes de sévérité, de léger
                à sévère.
              </p>
            </div>
            <div className="chiffres">
              <h3>80 %</h3>
              <p>
                Dans 80 % des cas, l'astigmatisme est causé par une anomalie de
                la cornée, mais il peut également être dû à une irrégularité du
                cristallin.
              </p>
            </div>
          </article>
          <article className="chiffresContainer">
            <div className="chiffres">
              <h3>≃ 30 - 40 %</h3>
              <p>
                Environ 30 à 40 % des personnes souffrant d'astigmatisme ne sont
                pas conscientes de leur condition, car les symptômes peuvent
                être légers ou s'aggraver progressivement.
              </p>
            </div>
            <div className="chiffres">
              <h3>Impact sur la vision</h3>
              <p>
                L'astigmatisme provoque une vision floue ou déformée à toutes
                les distances, rendant difficile la lecture, la conduite, ou
                même la reconnaissance des visages.
              </p>
            </div>
          </article>
        </section>

        <section className="causes">
          <article className="textContainer">
            <h2>LES CAUSES</h2>
            <p>
              L’astigmatisme est principalement causé par une courbure
              irrégulière de la cornée, qui au lieu d’être parfaitement ronde,
              adopte une forme plus ovale, semblable à celle d’un ballon de
              rugby. Cela provoque une focalisation incorrecte des rayons
              lumineux sur la rétine. Cette anomalie est souvent héréditaire et
              présente dès la naissance. D’autres facteurs peuvent également
              être à l’origine de l’astigmatisme, comme des traumatismes
              oculaires, des infections, ou encore des maladies comme le
              kératocône, où la cornée s’amincit progressivement. Parfois, il
              peut aussi être une conséquence de chirurgies oculaires ou de
              cicatrices sur la cornée.
            </p>
          </article>
          <article className="glasses">
            <Glasses />
          </article>
        </section>

        <section className="traitements">
          <h2>LES TRAITEMENTS</h2>
          <p>
            Pour corriger l’astigmatisme, plusieurs solutions existent en
            fonction de son degré de gravité. Les lunettes avec des verres
            cylindriques sont une méthode simple et efficace pour compenser
            l’irrégularité de la cornée. Les lentilles de contact, en
            particulier les lentilles toriques, offrent une correction plus
            précise, notamment pour les cas modérés à sévères. Pour une solution
            permanente, la chirurgie réfractive comme le LASIK ou la PKR peut
            remodeler la cornée pour restaurer une vision nette. Enfin, dans les
            cas plus graves ou liés à des affections comme le kératocône, des
            traitements spécifiques comme les implants cornéens ou la greffe de
            cornée peuvent être envisagés. Un suivi régulier auprès d’un
            ophtalmologue est essentiel pour surveiller l’évolution du trouble
            et adapter les corrections si nécessaire.
          </p>

          <article className="articlesContainer">
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

            <Link to="/articles/daltonisme" className="articleLink">
              <div>
                <h3>LE DALTONISME</h3>
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
              <p>
                C'est un trouble de la vision des couleurs qui empêche certaines
                personnes....
              </p>
            </Link>

            <Link to="/articles/presbytie" className="articleLink">
              <div>
                <h3>LA PRESBYTIE</h3>
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
              <p>
                C'est un trouble visuel lié au vieillissement naturel de l'œil,
                qui se traduit....
              </p>
            </Link>
          </article>
        </section>
        <CommentsSection subject="astigmatisme" />
      </main>
    </>
  );
}
