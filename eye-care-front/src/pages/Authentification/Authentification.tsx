import { Outlet } from "react-router-dom";
import EyeCareLogo from "../../assets/eye-care-logo.svg?react";
import DayNightMode from "../../components/DayNightMode/DayNightMode";

// import { Navigate } from "react-router-dom";
interface LoginProps {
	token: string;
}

export default function Authentification({ token }: LoginProps) {
	// if (token !== localStorage.getItem("token")) {
	//   return (
	//     <>
	//       <Navigate to="/" />
	//     </>
	//   );
	// }

	return (
		<>
			<main className="login">
				<div className="topScreen">
					<EyeCareLogo />
					<div className="bgSwitch">
						<DayNightMode />
					</div>
				</div>
				<Outlet />
			</main>
		</>
	);
}
