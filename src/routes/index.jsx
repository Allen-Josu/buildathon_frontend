import { createBrowserRouter } from "react-router-dom";
import { routePath } from "../config";
import Home from "../pages/home";
import PageNotFound from "../pages/notFound";


export const router = createBrowserRouter([
    {
        path : routePath.home,
        element : <Home />
    },
  
    {
        path : " ",
        element : <PageNotFound />
    }
])