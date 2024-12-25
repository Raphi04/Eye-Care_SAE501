import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import DayNightMode from "../DayNightMode/DayNightMode";

import EyeCareLogo from "../../assets/Eye_care_proposition_finale.svg?react";

import "./header.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useApiContext } from "../ApiProvider";

interface HeaderProps {
  active: string;
}

export default function Header({ active }: HeaderProps) {
  //Utilisation de ApiContext pour récuperer les données de l'utilisateur connecté
  const { connectedUser, loadingState } = useApiContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  //Gestion des hovers et des clicks de la barre de navigation
  const [onProfileClick, setOnProfileClick] = useState<boolean>(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  //const [onArticleHover, setOnArticleHover] = useState<boolean>(false);

  function handleOnProfileDisplay() {
    let newState = !onProfileClick;
    setOnProfileClick(newState);
  }
  function handleOnArticleDisplay() {
    let newState = !isDropdownOpen;
    setIsDropdownOpen(newState);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setOnProfileClick(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* function handleOnArticleHover() {
    let newState = !onArticleHover;
    setOnArticleHover(newState);
  }*/

  function getInitials() {
    if (connectedUser.username) {
      let usernameSplited = connectedUser.username.split(" ");

      let onlyInitials = usernameSplited.map((word: string) => {
        return word.charAt(0).toUpperCase();
      });

      return onlyInitials.join("");
    }
  }

  return (
    <>
      <header>
        <div className="headerContainer">
          <Link to="/">
            <EyeCareLogo className="logo"></EyeCareLogo>
          </Link>

          <nav>
            <Link
              to="/"
              className={
                "linkContainer " + (active == "accueil" ? "isActive" : "")
              }
            >
              <p>Accueil</p>
            </Link>

            <Link
              to="/blog"
              className={
                "linkContainer " + (active == "blog" ? "isActive" : "")
              }
            >
              <p>Blog</p>
            </Link>

            <div
              className={
                "linkContainer linkArticles " +
                (active == "articles" ? "isActive" : "") +
                (isDropdownOpen ? "isActive" : "")
              }
              onClick={handleOnArticleDisplay}
            >
              <p>Articles</p>
              {isDropdownOpen && (
                <div className="dropDownArticle">
                  <Link to="/articles/myopie" className="linkMenu">
                    Myopie
                  </Link>
                  <Link to="/articles/presbytie" className="linkMenu">
                    Presbytie
                  </Link>
                  <Link to="/articles/astigmatisme" className="linkMenu">
                    Astigmatisme
                  </Link>
                  <Link to="/articles/dmla" className="linkMenu">
                    DMLA
                  </Link>
                  <Link to="/articles/daltonisme" className="linkMenu">
                    Daltonisme
                  </Link>
                  <Link to="/articles/hypermetropie" className="linkMenu">
                    Hypermétropie
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/tests"
              className={
                "linkContainer " + (active == "tests" ? "isActive" : "")
              }
            >
              <p>Tests</p>
            </Link>
          </nav>

          <div className="headers-side">
            <DayNightMode />

            <div className="separator"></div>

            {loadingState ||
              (!connectedUser && (
                <Link to="/login" className="seConnecter">
                  <p>Se connecter</p>
                </Link>
              ))}

            {!loadingState && connectedUser && (
              <div className="userProfile" onClick={handleOnProfileDisplay}>
                <div className="icon">
                  <p>{getInitials()}</p>
                </div>
                <p className="username">{connectedUser.username}</p>

                {onProfileClick && (
                  <div className="dropDown" ref={profileRef}>
                    <Link to="/profile" className="link">
                      <p>Mon profile</p>
                    </Link>
                    <Link to="/deconnexion" className="link">
                      <FontAwesomeIcon
                        icon={faArrowRightFromBracket}
                        className="exit"
                      />
                      <p>Déconnexion</p>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
