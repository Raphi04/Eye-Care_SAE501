import { Navigate } from "react-router-dom";

interface LoginProps {
  token: string;
}

export default function Login({ token }: LoginProps) {
  if (token !== "") {
    return (
      <>
        <Navigate to="/" />
      </>
    );
  }
  return (
    <>
      <div>Login</div>
    </>
  );
}
