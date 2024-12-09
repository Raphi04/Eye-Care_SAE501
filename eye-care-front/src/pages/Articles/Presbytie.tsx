import { Link } from "react-router-dom";
import ModelViewer from "../../components/ModelViewer";

import Model from "../../assets/3D_Model/glasses.glb";
import Glasses from "../../assets/glasses.svg?react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Presbytie() {
  return (
    <>
      <main>
        <section className="presentationMaladie">
          <article className="textContainer">
            <h2>LA PRESBYTIE</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nibh elit, tincidunt at
              sapien id, commodo ornare dolor. Praesent pellentesque et est sit amet congue. Aliquam
              erat volutpat. Suspendisse molestie porttitor lacus a convallis. Praesent lacinia
              purus vel lacus pulvinar, ac ultricies neque scelerisque. Sed non imperdiet nisl.
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
              egestas. Aenean vehicula augue nec risus rhoncus interdum.
            </p>
          </article>
          <article className="model">
            <ModelViewer
              src={Model}
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
          <h2>QUELQUES CHIFFRES</h2>
          <article className="chiffresContainer">
            <div className="chiffres">
              <h3>51%</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nibh elit, tincidunt
                at sapien id, commodo ornare dolor.
              </p>
            </div>
            <div className="chiffres">
              <h3>2/3</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nibh elit, tincidunt
                at sapien id, commodo ornare dolor.
              </p>
            </div>
          </article>
          <article className="chiffresContainer">
            <div className="chiffres">
              <h3>51 245</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nibh elit, tincidunt
                at sapien id, commodo ornare dolor.
              </p>
            </div>
            <div className="chiffres">
              <h3>25</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nibh elit, tincidunt
                at sapien id, commodo ornare dolor.
              </p>
            </div>
          </article>
        </section>

        <section className="traitements">
          <article className="textContainer">
            <h2>LES TRAITEMENTS</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nibh elit, tincidunt at
              sapien id, commodo ornare dolor. Praesent pellentesque et est sit amet congue. Aliquam
              erat volutpat. Suspendisse molestie porttitor lacus a convallis. Praesent lacinia
              purus vel lacus pulvinar, ac ultricies neque scelerisque. Sed non imperdiet nisl.
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
              egestas. Aenean vehicula augue nec risus rhoncus interdum.
            </p>
          </article>
          <article>
            <Glasses />
          </article>
        </section>

        <section className="causes">
          <h2>LES CAUSES</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nibh elit, tincidunt at
            sapien id, commodo ornare dolor. Praesent pellentesque et est sit amet congue. Aliquam
            erat volutpat. Suspendisse molestie porttitor lacus a convallis. Praesent lacinia purus
            vel lacus pulvinar, ac ultricies neque scelerisque. Sed non imperdiet nisl. Pellentesque
            habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean
            vehicula augue nec risus rhoncus interdum.
          </p>

          <article className="articlesContainer">
            <Link to="/articles/myopie" className="articleLink">
              <div>
                <h3>LA MYOPIE</h3>
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Link>

            <Link to="/articles/astigmatisme" className="articleLink">
              <div>
                <h3>L'ASTIGMATISME</h3>
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Link>

            <Link to="/articles/daltonisme" className="articleLink">
              <div>
                <h3>LE DALTONISME</h3>
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Link>
          </article>
        </section>
      </main>{" "}
    </>
  );
}
