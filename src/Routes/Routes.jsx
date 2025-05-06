import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/main";
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import OrderNow from "../pages/OrderNow";
import ContactUs from "../pages/ContactUs";
import Login from "../pages/Login";
import Signup from "../pages/SignUp";
import PrivateRoute from "./PrivateRoute";
import Bypass from "./PrivateRoute";
import Dashboard from "../pages/Dashboard";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        
        {
          path: "/",
          element: <Home />
        },
       {
        
          path: "/menu",
          element: <Menu />
       },
       {
          path: "/order/:category?",
          element: <OrderNow />
       },
       {
        path: "/contact",
        element: <ContactUs />
       },
       {
        path: "/login",
        element: <Bypass><Login/></Bypass>
       },
       {
        path: "/signup",
        element: <Bypass><Signup/></Bypass>
       }
             
      ],
    }
    ,
    {
      path : "/dashboard",
      element : <Dashboard/>
    }
  ]);