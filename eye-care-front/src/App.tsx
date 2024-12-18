import { Outlet } from "react-router-dom";
import ApiProvider from "./components/ApiProvider";

export default function App() {
  return (
    <>
      <ApiProvider>
        <Outlet />
      </ApiProvider>
    </>
  );
}
