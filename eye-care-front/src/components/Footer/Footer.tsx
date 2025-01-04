import { Link } from "react-router-dom";
import "./footer.scss";

export default function Footer() {
  return (
    <>
      <footer>
        <div className="orga">
          <div>
            <h2>Navigation</h2>
            <p>
              <Link to="/accueil">Qui sommes-nous ?</Link>
            </p>
            <p>
              <Link to="/articles">Fonctionnement d'un œil ?</Link>
            </p>
            <p>
              <Link to="/tests">Tester votre vue</Link>
            </p>
            <p>
              <Link to="/articles">Les problèmes occulaires</Link>
            </p>
            <p>
              <Link to="/blog">Blog</Link>
            </p>
          </div>
          <div>
            <h2>Nos Githubs</h2>
            <p>
              <a href="https://github.com/Raphi04" target="_blank">
                Raphael CADETE
              </a>
            </p>
            <p>
              <a href="https://github.com/Jeremie-PARANT" target="_blank">
                Jéremie PARANT
              </a>
            </p>
            <p>
              <a href="https://github.com/BajoueHugo" target="_blank">
                Hugo BAJOUE
              </a>
            </p>
            <p>
              <a href="https://github.com/MatthieuTissier" target="_blank">
                Matthieu TISSIER
              </a>
            </p>
            <p>
              <a href="https://github.com/ArnoLM7" target="_blank">
                Arnaud LE MOIL
              </a>
            </p>
            <p className="cr">
              Copyright ©2024 - Tous droits réservés -
              <Link to="/mentionslegales"> Mentions légales</Link>
            </p>
          </div>
          <div>
            <h2>Nous Contacter</h2>
            <p>raphaelcadete04@gmail.com</p>
            <p>parantjeremie.pro@gmail.com</p>
            <p>hbajoue@gmail.com</p>
            <p>matthieutissier77@gmail.com</p>
            <p>arno.lemoil.pro@gmail.com</p>
          </div>
        </div>
      </footer>
    </>
  );
}
