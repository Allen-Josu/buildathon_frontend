import { createBrowserRouter } from "react-router-dom";
import { routePath } from "../config";
import Home from "../pages/home";
import PageNotFound from "../pages/notFound";
import Notes from "../pages/notes";
import PageLayout from "../layouts";
import GradePredictor from "../pages/gradePredictor/gradePredictor";


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
        path:routePath.gradePredictor,
        element:<GradePredictor/>
    },
    {
        path : " ",
        element : <PageNotFound />
    }
])