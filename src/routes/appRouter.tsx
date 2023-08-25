import { createBrowserRouter } from "react-router-dom";
import { AdminRoutes,AdminLogin } from "./admin/AdminRoutes";
import {userLogin,userRegister,userRoutes,verifyEmail,userForgotPassword} from "./user/UserRoutes"


const appRouter = createBrowserRouter([
    userLogin,
    userForgotPassword,
    userRegister,
    userRoutes,
    verifyEmail,

    //admin routes
     AdminLogin,
     AdminRoutes

])


export default appRouter