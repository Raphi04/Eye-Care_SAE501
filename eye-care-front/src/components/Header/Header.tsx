import { Link } from "react-router-dom";
import "./header.scss";

interface HeaderProps {
  active: string;
}

export default function Header({ active }: HeaderProps) {
  return (
    <>
      <header>
        <Link to="/">
          <img src="./src/assets/eye-care-logo.svg" className="logo"></img>
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
            <img src="./src/assets/accountIcon.svg"></img>
            <p>John Doe</p>
          </Link>
        </div>
      </header>
    </>
  );
}
