import { Navigate, Outlet } from "react-router-dom";

interface AppProps {
  token: string;
}

export default function App({ token }: AppProps) {
  if (token !== "") {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}
