import { useSelector } from "react-redux";
import Login from "../../pages/admin/Login"
import {ReactNode} from "react"
import { RootState } from "../../state/rooState";

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider = ({ children }:AuthProviderProps) => {
  const isAuth = Boolean(useSelector((state: RootState) => state.admin.adminToken));

  return (
    <>
      {!isAuth && <Login />}
      {children}
    </>
  );
};

export default AuthProvider;
