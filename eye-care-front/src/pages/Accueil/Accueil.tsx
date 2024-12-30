//Dependancies
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";

//SCSS files
import "./accueil.scss";

//Assets
import articleImage from "../../assets/myopie.png";
import grosYeux from "../../assets/bigEyes.png";
import testDeVue from "../../assets/testVue.png";
import male from "../../assets/pere.png";
import female from "../../assets/femelle.png";

export default function Accueil() {
  return (
    <>
      <Header active={"accueil"} />
      <main className="accueil">
        <h1>BIENVENUE</h1>
        <section className="welcomeContainer">
          <article className="textContainer">
            <h2>Qu'est ce qu'Eye-Care ?</h2>
            <p>
              Dans le cadre d’un projet universitaire, nous avions pour objectif
              de réaliser un site sur le thème des technologies numériques dans
              le domaine de la santé pour améliorer la qualité de vie des
              personnes.
            </p>
            <p>
              C’est pourquoi nous avons décidé de réaliser un site sur
              l’ophtalmologie du nom de Eye-Care ayant pour objectifs d’informer
              ses utilisateurs sur les différents problèmes existant, liés à la
              vision (daltonisme, presbytie, etc), de pouvoir réaliser des tests
              de vue et d'interagir avec des professionnels.
            </p>
          </article>

          <Link to="/articles">
            <article className="articleContainer">
              <h2>Se renseigner sur la myopie</h2>
              <img src={articleImage} />
            </article>
          </Link>
        </section>

        <section className="fonctionnementOeil">
          <article className="textContainer">
            <h2>Comment fonctionne un œil ?</h2>
            <p>
              L'œil fonctionne comme un appareil photo en capturant la lumière
              pour créer des images. Tout commence lorsque la lumière entre dans
              l’œil par la cornée, une surface transparente qui aide à diriger
              et à concentrer les rayons lumineux. Ensuite, la lumière traverse
              la pupille, dont la taille est ajustée par l’iris en fonction de
              la luminosité.
            </p>
            <p>
              Derrière la pupille se trouve le cristallin, une lentille
              naturelle qui ajuste sa forme pour focaliser la lumière
              précisément sur la rétine, située au fond de l’œil. La rétine,
              composée de millions de cellules sensibles à la lumière,
              transforme ces rayons lumineux en signaux électriques qui sont
              envoyés au cerveau via le nerf optique. Enfin, le cerveau
              interprète ces signaux pour former l'image que nous voyons.
            </p>
            <Link to="/articles" className="button button-white">
              VOIR L'ARTICLE{" "}
              <FontAwesomeIcon icon={faArrowRight} className="arrow" />
            </Link>
          </article>
          <article className="bigEyes">
            <img src={grosYeux}></img>
          </article>
        </section>

        <section className="testDeVue">
          <article className="imgTest">
            <img src={testDeVue}></img>
          </article>
          <article className="textContainer">
            <h2>Testez votre vue</h2>
            <p>
              Avez-vous déjà ressenti des vertiges en fixant un point, eu du mal
              à distinguer certaines couleurs ou éprouvé des difficultés à voir
              clairement de loin ou de près ? Ces symptômes pourraient indiquer
              un trouble visuel. Les problèmes de vision, s'ils ne sont pas
              détectés et corrigés à temps, peuvent impacter votre quotidien,
              que ce soit dans vos activités professionnelles, personnelles ou
              de loisirs.
            </p>
            <p>
              Notre site vous permet de tester votre vue facilement et
              rapidement grâce à des outils conçus pour évaluer différents
              aspects de votre vision. En quelques clics, vous pourrez mieux
              comprendre l’état de votre vision et savoir s'il est nécessaire de
              consulter un professionnel. N'attendez pas que vos problèmes
              s'aggravent, prenez soin de vos yeux dès aujourd'hui !
            </p>
            <Link to="/tests" className="button button-blue">
              TESTEZ VOTRE VUE{" "}
              <FontAwesomeIcon icon={faArrowRight} className="arrow" />
            </Link>
          </article>
        </section>

        <section className="lesArticles">
          <h2>Les problèmes oculaires</h2>
          <section className="allArticlesContainer">
            <Link to="/articles/myopie" className="article">
              <article>Myopie</article>
            </Link>
            <Link to="/articles/presbytie" className="article">
              <article>Presbytie</article>
            </Link>
            <Link to="/articles/daltonisme" className="article">
              <article>Daltonisme</article>
            </Link>
            <Link to="/articles/hypermetropie" className="article">
              <article>Hypermétropie</article>
            </Link>
            <Link to="/articles/astigmatisme" className="article">
              <article>Astigmatisme</article>
            </Link>
            <Link to="/articles/dmla" className="article">
              <article>DMLA</article>
            </Link>
          </section>
        </section>

        <section className="blogDiscussion">
          <h2>Blog</h2>
          <article className="discussion1">
            <div>
              <p>
                Bonjour, j’ai remarqué que depuis quelques jours, lorsque je me
                réveille, je suis totalement aveugle pendant quelques minutes.
                Cela dure plusieurs minutes avant que ma vision commence à
                revenir. Je dors souvent sur le ventre, est-ce que cela pourrait
                en être la cause ?
              </p>
              <div className="username">
                <p>Sara C.</p>
              </div>
            </div>
            <img src={female}></img>
          </article>

          <article className="discussion2">
            <div>
              <p>
                Bonjour ! Ce type de problème peut parfois être lié à une
                pression exercée sur vos yeux pendant que vous dormez. Dormir
                sur le ventre peut comprimer vos globes oculaires, ce qui
                pourrait expliquer cette perte de vision temporaire au réveil.
                Je vous recommande d’essayer de changer de position pour dormir
                et de surveiller si cela s’améliore. Toutefois, ce problème
                mérite d’être examiné de plus près par un professionnel si les
                symptômes persistent. Vous avez des doutes ou souhaitez d’autres
                conseils ?{" "}
                <b>
                  Rejoignez notre forum pour poser toutes vos questions.
                  D’autres utilisateurs ou professionnels pourront également
                  partager leurs expériences et vous guider !
                </b>
              </p>
              <div className="username">
                <p>Dr. Eggman</p>
              </div>
            </div>
            <img src={male}></img>
          </article>
          <Link to="/blog" className="button button-blue end">
            ACCEDER AU BLOG
            <FontAwesomeIcon
              icon={faArrowRight}
              className="arrow"
            ></FontAwesomeIcon>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
