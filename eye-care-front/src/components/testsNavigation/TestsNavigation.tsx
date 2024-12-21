import { Link, useLocation } from "react-router-dom";
import "./testsNavigation.scss";
import { useEffect, useState } from "react";

export default function TestsNavigation() {
  const location = useLocation();
  const [currentArticle, setCurrentArticle] = useState<string>("");

  useEffect(() => {
    setCurrentArticle(location.pathname.split("/").pop() || "");
  }, [location]);

  return (
    <>
      <div className="testNavigation">
        <div className="linkContainer">
          <Link to="acuite" className={`link ${currentArticle == "acuite" ? "active" : ""}`}>
            <p>Test d'acuité visuel</p>
          </Link>
        </div>
        <div className="linkContainer">
          <Link to="ishihara" className={`link ${currentArticle == "ishihara" ? "active" : ""}`}>
            <p>Test d'Ishihara</p>
          </Link>
        </div>
        <div className="linkContainer">
          <Link to="dmla" className={`link ${currentArticle == "dmla" ? "active" : ""}`}>
            <p>Test de DMLA</p>
          </Link>
        </div>
        <div className="linkContainer">
          <Link
            to="daltonisme"
            className={`link ${currentArticle == "daltonisme" ? "active" : ""}`}
          >
            <p>Test de Daltonisme</p>
          </Link>
        </div>
      </div>
    </>
  );
}
