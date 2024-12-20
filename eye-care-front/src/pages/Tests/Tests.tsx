import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

export default function Tests() {
  return (
    <>
      <Header active="tests" />
      <Outlet></Outlet>;
      <Footer />
    </>
  );
}
