import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/main";
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import OrderNow from "../pages/OrderNow";
import ContactUs from "../pages/ContactUs";

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
       }
             
      ]
    }
  ]);