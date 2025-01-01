import { createBrowserRouter } from "react-router-dom";
import { routePath } from "../config";
import Home from "../pages/home";

export const router = createBrowserRouter([
    {
        path : routePath.home,
        element : <Home />
    }
])