import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/main";
import Home from "../pages/Home";
import Menu from "../pages/Menu";

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
       }
      ]
    }
  ]);