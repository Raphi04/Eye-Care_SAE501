import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

import "./tests.scss";
import TestsNavigation from "../../components/testsNavigation/TestsNavigation";
import ScrollToTop from "../../components/ScrollToTop";
import { useEffect } from "react";

export default function Tests() {
  const location = useLocation();

  useEffect(() => {
    const textContainer = document.querySelector(".testArticleContainer");
    if (textContainer) {
      textContainer.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <Header active="tests" />
      <main className="tests">
        <div className="testsInfoContainer">
          <TestsNavigation />
          <section className="testArticleContainer">
            <Outlet></Outlet>
          </section>
        </div>
      </main>
      <ScrollToTop />
      <Footer />
    </>
  );
}
