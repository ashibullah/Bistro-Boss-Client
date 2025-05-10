import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/main";
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import OrderNow from "../pages/OrderNow";
import ContactUs from "../pages/ContactUs";
import Login from "../pages/Login";
import Signup from "../pages/SignUp";
import PrivateRoute, { AdminRoute, PublicRoute } from "./PrivateRoute";
import Dashboard from "../pages/Dashboard";
import Cart from "../Components/Dashboard/Cart";

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
        element: <PublicRoute><Login /></PublicRoute>
      },
      {
        path: "/signup",
        element: <PublicRoute><Signup /></PublicRoute>
      }
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "allUser",
        element: <AdminRoute><Cart /></AdminRoute>
      },
    ]
  }
]);