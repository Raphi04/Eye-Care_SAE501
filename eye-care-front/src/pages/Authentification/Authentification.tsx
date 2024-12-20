import { Link, Outlet } from "react-router-dom";
import EyeCareLogo from "../../assets/eye-care-logo.svg?react";
import DayNightMode from "../../components/DayNightMode/DayNightMode";

export default function Authentification() {
  return (
    <>
      <main className="login">
        <div className="topScreen">
          <Link to={"/"}>
            <EyeCareLogo />
          </Link>
          <div className="bgSwitch">
            <DayNightMode />
          </div>
        </div>
        <Outlet />
      </main>
    </>
  );
}
