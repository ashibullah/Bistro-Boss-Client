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
import DasboardMenu from "../Components/Dashboard/DashboardMenu";
import AllUsers from "../Components/Dashboard/AllUsers";
import AddReview from "../Components/Dashboard/AddReview";
import OrderRequest from "../Components/Dashboard/OrderRequest";

const router = createBrowserRouter([
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
        path: "addReview",
        element: <AddReview />
      },
      {
        path: "allUser",
        element: <AdminRoute><AllUsers /></AdminRoute>
      },
      {
        path: "menu",
        element: <AdminRoute><DasboardMenu /></AdminRoute>
      },
      {
        path: "orderRequest",
        element: <AdminRoute><OrderRequest /></AdminRoute>
      },
    ]
  }
]);

export default router;