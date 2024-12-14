import { Outlet } from "react-router-dom";
import "../authentification.scss";

interface LoginProps {
	token: string;
}

export default function Register({ token }: LoginProps) {
	return (
		<>
			<Outlet />
		</>
	);
}
