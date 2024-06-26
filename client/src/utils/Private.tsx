import { useSelector } from "react-redux";
import { ReduxUserState } from "../Redux/store";
import { Navigate, Outlet } from "react-router-dom";

function Private() {
  const { user } = useSelector((state: ReduxUserState) => state.user);
  return user ? <Outlet /> : <Navigate to={"/login"} />;
}

export function AdminAccess() {
  const { user } = useSelector((state: ReduxUserState) => state.user);
  return user?.role === "admin" ? <Outlet /> : <Navigate to={"/notfound"} />;
}

export default Private;
