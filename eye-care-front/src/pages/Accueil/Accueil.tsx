import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";

import "./accueil.scss";

export default function Accueil() {
  return (
    <>
      <Header active={"accueil"} />
      <main>
        <h1>BIENVENUE</h1>
        <section className="welcomeContainer">
          <article className="textContainer">
            <h2>Qu'est ce qu'Eye-Care ?</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nibh elit, tincidunt at
              sapien id, commodo ornare dolor. Praesent pellentesque et est sit amet congue. Aliquam
              erat volutpat. Suspendisse molestie porttitor lacus a convallis. Praesent lacinia
              purus vel lacus pulvinar, ac ultricies neque scelerisque. Sed non imperdiet nisl.
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
              egestas. Aenean vehicula augue nec risus rhoncus interdum.
            </p>
          </article>

          <Link to="/articles">
            <article className="articleContainer">
              <h2>Se renseigner sur la myopie</h2>
              <img src="./src/assets/myopie.png" />
            </article>
          </Link>
        </section>

        <section className="fonctionnementOeil">
          <article className="textContainer">
            <h2>Comment fonctionne un œil</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nibh elit, tincidunt at
              sapien id, commodo ornare dolor. Praesent pellentesque et est sit amet congue. Aliquam
              erat volutpat. Suspendisse molestie porttitor lacus a convallis. Praesent lacinia
              purus vel lacus pulvinar, ac ultricies neque scelerisque. Sed non imperdiet nisl.
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
              egestas. Aenean vehicula augue nec risus rhoncus interdum.
            </p>
            <Link to="/articles" className="button button-white">
              VOIR L'ARTICLE <FontAwesomeIcon icon={faArrowRight} className="arrow" />
            </Link>
          </article>
          <article className="bigEyes">
            <img src="./src/assets/bigEyes.png"></img>
          </article>
        </section>

        <section className="testDeVue">
          <article className="imgTest">
            <img src="./src/assets/testVue.png"></img>
          </article>
          <article className="textContainer">
            <h2>Testez votre vue</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nibh elit, tincidunt at
              sapien id, commodo ornare dolor. Praesent pellentesque et est sit amet congue. Aliquam
              erat volutpat. Suspendisse molestie porttitor lacus a convallis. Praesent lacinia
              purus vel lacus pulvinar, ac ultricies neque scelerisque. Sed non imperdiet nisl.
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
              egestas. Aenean vehicula augue nec risus rhoncus interdum.
            </p>
            <Link to="/tests" className="button button-blue">
              TESTEZ VOTRE VUE <FontAwesomeIcon icon={faArrowRight} className="arrow" />
            </Link>
          </article>
        </section>

        <section className="lesArticles">
          <h2>Les problèmes occulaires</h2>
          <section className="allArticlesContainer">
            <Link to="/articles" className="article">
              <article>QUOIFEUR</article>
            </Link>
            <Link to="/articles" className="article">
              <article>QUOICOUBEH</article>
            </Link>
            <Link to="/articles" className="article">
              <article>APANYAN</article>
            </Link>
            <Link to="/articles" className="article">
              <article>UwU</article>
            </Link>
            <Link to="/articles" className="article">
              <article>B-BAKA</article>
            </Link>
            <Link to="/articles" className="article">
              <article>Onii-chan Tasukete ~~</article>
            </Link>
          </section>
        </section>

        <section className="blogDiscussion">
          <h2>Blog</h2>
          <article className="discussion1">
            <div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nibh elit, tincidunt
                at sapien id, commodo ornare dolor. Praesent pellentesque et est sit amet congue.
                Aliquam erat volutpat. Suspendisse molestie porttitor lacus a convallis.
              </p>
              <div className="username">
                <p>John Doe</p>
              </div>
            </div>
            <img src="./src/assets/femelle.png"></img>
          </article>

          <article className="discussion2">
            <div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nibh elit, tincidunt
                at sapien id, commodo ornare dolor. Praesent pellentesque et est sit amet congue.
                Aliquam erat volutpat. Suspendisse molestie porttitor lacus a convallis.
              </p>
              <div className="username">
                <p>John Doe</p>
              </div>
            </div>
            <img src="./src/assets/pere.png"></img>
          </article>
          <Link to="/blog" className="button button-blue end">
            ACCEDER AU BLOG
            <FontAwesomeIcon icon={faArrowRight} className="arrow"></FontAwesomeIcon>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
