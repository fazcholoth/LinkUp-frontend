import AdLogin from "../../pages/admin/Login"
import Dashboard from "../../pages/admin/Dashboard"
import App from "../../pages/admin/App";
import  Users  from "../../pages/admin/Users";
import AuthProvider from "./AuthProvider";
import Posts from "../../pages/admin/Posts";
import Reports from "../../pages/admin/Reports"
import LandingPage from "../../pages/admin/LandingPage";
export const AdminRoutes = 
  {
    path: "/admin",
    element: <AuthProvider><App/></AuthProvider>,
    children:[
      {
        path:"/admin",
        element:<LandingPage/>
      },
      {
        path:"dashboard",
        element:<Dashboard/>
      },
      {
        path:"users",
        element:<Users/>
      },
      {
        path:"posts",
        element:<Posts/>
      },
      {
        path:"reports",
        element:<Reports/>

      }
    ]
  }
 export const AdminLogin= {
    path: "/admin/login",
    element:<AdLogin/>,
  };
