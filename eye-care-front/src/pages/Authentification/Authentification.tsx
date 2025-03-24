import { Link, Outlet } from "react-router-dom";
import EyeCareLogo from "../../assets/Eye_care_proposition_finale.svg?react";
import DayNightMode from "../../components/DayNightMode/DayNightMode";
import "./authentification.scss";

export default function Authentification() {
	return (
		<>
			<main className="login">
				<div className="topScreen">
					<Link to={"/"}>
						<EyeCareLogo className="logo" />
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
