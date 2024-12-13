import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

import "./articles.scss";
import ScrollToTop from "../../components/ScrollToTop";

export default function Articles() {
  return (
    <>
      <Header active="articles" />
      <Outlet />
      <ScrollToTop />
      <Footer />
    </>
  );
}
