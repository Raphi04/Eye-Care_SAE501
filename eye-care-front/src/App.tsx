import { Navigate, Outlet } from "react-router-dom";

interface AppProps {
  token: string;
}

export default function App({ token }: AppProps) {
  if (token !== "gzfeiynkz45z") {
    return (
      <>
        <Navigate to="/login"></Navigate>
      </>
    );
  }
  return (
    <>
      <Outlet />
    </>
  );
}
