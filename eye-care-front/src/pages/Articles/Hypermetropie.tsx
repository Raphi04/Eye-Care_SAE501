import { Link } from "react-router-dom";

import Glasses from "../../assets/glasses.svg?react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import CommentsSection from "../../components/CommentsSection/CommentsSection";

export default function Hypermetropie() {
  return (
    <>
      <main>
        <section className="presentationMaladie">
          <article className="textContainer">
            <h2>HYPERMÉTROPIE</h2>
            <p>
              L’hypermétropie est un trouble de la vision qui se traduit par une
              difficulté à voir nettement les objets proches, tandis que la
              vision des objets éloignés reste généralement claire. Cela est dû
              à un problème de focalisation : les rayons lumineux entrant dans
              l'œil convergent derrière la rétine au lieu de converger
              directement sur celle-ci. Cette anomalie peut résulter d’un œil
              trop court ou d’une courbure insuffisante de la cornée ou du
              cristallin. Les personnes atteintes d’hypermétropie peuvent
              ressentir des symptômes tels que des maux de tête, une fatigue
              oculaire, ou une gêne après une lecture prolongée ou l’utilisation
              d’écrans. Ce trouble peut survenir à tout âge, mais il est souvent
              détecté chez les enfants ou devient plus prononcé avec l’âge,
              lorsque la capacité naturelle de l’œil à compenser le défaut
              diminue.
            </p>
          </article>
        </section>

        <section className="quelquesChiffres">
          <h2>INFORMATIONS CLÉS</h2>
          <article className="chiffresContainer">
            <div className="chiffres">
              <h3>≃ 15 %</h3>
              <p>
                L’hypermétropie touche environ 15 % de la population mondiale.
              </p>
            </div>
            <div className="chiffres">
              <h3>≃ 8 %</h3>
              <p>
                Chez les enfants, près de 8 % des moins de 6 ans sont
                hypermétropes, avec des cas modérés à sévères.
              </p>
            </div>
          </article>
          <article className="chiffresContainer">
            <div className="chiffres">
              <h3>Facteurs génétiques</h3>
              <p>
                Si l’un des parents est hypermétrope, l’enfant a environ 2 à 3
                fois plus de chances de l’être également.
              </p>
            </div>
            <div className="chiffres">
              <h3>Risque</h3>
              <p>
                Les personnes hypermétropes ont un risque accru de développer un
                strabisme accommodatif, notamment chez les enfants, car
                l'accommodation excessive de l'œil pour voir de près peut
                entraîner un désalignement des yeux.
              </p>
            </div>
          </article>
        </section>

        <section className="causes">
          <article className="textContainer">
            <h2>LES CAUSES</h2>
            <p>
              L’hypermétropie est principalement causée par une anomalie dans la
              structure de l’œil. Un œil trop court ou une courbure insuffisante
              de la cornée ou du cristallin empêche la lumière de se focaliser
              correctement sur la rétine. Ce défaut peut être d’origine
              génétique, ce qui explique pourquoi il est parfois observé dès
              l’enfance.
            </p>
            <p>
              Dans de nombreux cas, les enfants hypermétropes parviennent à
              compenser ce trouble grâce à une forte capacité d’accommodation du
              cristallin. Cependant, cette capacité diminue avec l’âge, rendant
              l’hypermétropie plus perceptible. Dans de rares cas, des
              conditions comme des maladies oculaires ou des interventions
              chirurgicales peuvent également provoquer une hypermétropie
              acquise.
            </p>
          </article>
          <article className="glasses">
            <Glasses />
          </article>
        </section>

        <section className="traitements">
          <h2>LES TRAITEMENTS</h2>
          <p>
            L’hypermétropie peut être corrigée efficacement grâce à plusieurs
            solutions. Les lunettes sont l’option la plus courante, avec des
            verres convexes (ou "positifs") qui permettent de focaliser la
            lumière directement sur la rétine. Les lentilles de contact
            représentent une alternative pratique pour ceux qui préfèrent éviter
            les lunettes.
          </p>
          <p>
            Pour une correction permanente, des interventions chirurgicales,
            comme la chirurgie au laser (LASIK ou PKR), peuvent être envisagées.
            Ces techniques consistent à remodeler la cornée pour améliorer la
            focalisation. Dans certains cas plus sévères, le remplacement du
            cristallin par une lentille intraoculaire peut être une option.
          </p>
          <p>
            Enfin, une consultation régulière avec un ophtalmologiste est
            essentielle pour détecter l’hypermétropie, particulièrement chez les
            enfants, car un diagnostic précoce peut prévenir des complications
            comme le strabisme ou l’amblyopie (œil paresseux).
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
        <CommentsSection subject="hypermetropie" />
      </main>
    </>
  );
}
