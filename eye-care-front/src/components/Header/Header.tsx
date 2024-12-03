import { Link } from "react-router-dom";

import EyeCareLogo from "../../assets/Eye_care_proposition_finale.svg?react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import "./header.scss";

interface HeaderProps {
  active: string;
}

export default function Header({ active }: HeaderProps) {
  return (
    <>
      <header>
        <div className="headerContainer">
          <Link to="/">
            <EyeCareLogo className="logo"></EyeCareLogo>
          </Link>

          <nav>
            <Link to="/" className={"linkContainer " + (active == "accueil" ? "isActive" : "")}>
              <p>Accueil</p>
            </Link>

            <Link to="/blog" className={"linkContainer " + (active == "blog" ? "isActive" : "")}>
              <p>Blog</p>
            </Link>

            <Link
              to="/articles"
              className={"linkContainer " + (active == "articles" ? "isActive" : "")}
            >
              <p>Articles</p>
            </Link>

            <Link to="/tests" className={"linkContainer " + (active == "tests" ? "isActive" : "")}>
              <p>Tests</p>
            </Link>
          </nav>

          <div className="headers-side">
            <div className="slide">a</div>

            <Link to="/" className="userProfile">
              <FontAwesomeIcon icon={faUser} />
              <p>John Doe</p>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
