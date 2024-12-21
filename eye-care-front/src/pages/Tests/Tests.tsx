import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

import "./tests.scss";
import TestsNavigation from "../../components/testsNavigation/TestsNavigation";

export default function Tests() {
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
      <Footer />
    </>
  );
}
