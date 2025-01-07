import { createBrowserRouter } from "react-router-dom";
import { routePath } from "../config";
import Home from "../pages/home";
import PageNotFound from "../pages/notFound";
import Notes from "../pages/notes";
import PageLayout from "../layouts";

export const router = createBrowserRouter([
    {
        path : routePath.home,
        element : <Home />
    },
    {
        path : routePath.notes,
        element : <Notes />
    },
    {
        path : routePath.dummy,
        element : <PageLayout />
    },
    {
        path : " ",
        element : <PageNotFound />
    }
])