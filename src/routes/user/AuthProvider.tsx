import { useSelector,useDispatch } from "react-redux";
import Login from "../../pages/user/Login";
import {ReactNode} from "react"
import { RootState } from "../../state/rooState";
import { setLogout } from "../../state/user";
import { useEffect } from "react";
import apiCalls from "../../services/user/apiCalls";

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider = ({ children }:AuthProviderProps) => {
  const dispatch=useDispatch()
  const isAuth = Boolean(useSelector((state: RootState) => state.user.token));
  
  useEffect(() => {
    fetchUserBlockedStatus();
   
  },[]);

  const  fetchUserBlockedStatus=async()=>{
     try {
      await apiCalls.ValidUser()
      
     } catch (error) {
        dispatch(setLogout())
        localStorage.removeItem("userAuth")
     }
  }

  return (
    <>
      {!isAuth && <Login />}
      {children}
    </>
  );
};

export default AuthProvider;
