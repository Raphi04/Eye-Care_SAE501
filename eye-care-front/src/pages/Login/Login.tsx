import { Navigate } from "react-router-dom";
import ButtonBlue from "../../components/Buttons/ButtonBlue";

interface LoginProps {
  token: string;
}

export default function Login({ token }: LoginProps) {
  if (token !== localStorage.getItem("token")) {
    return (
      <>
        <Navigate to="/" />
      </>
    );
  }

  return (
    <>
      <ButtonBlue goTo="/">Dabedi</ButtonBlue>
    </>
  );
}
