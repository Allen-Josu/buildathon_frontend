import { createBrowserRouter } from "react-router-dom";
import { routePath } from "../config";
import Home from "../pages/home";
import PageNotFound from "../pages/notFound";
import Notes from "../pages/notes";

import PreviousYear from "../pages/previousYearQuestions";
import GradePredictor from "../pages/gradePredictor/gradePredictor";
import AttendanceRegulator from "../pages/attendanceRegulator/AttendanceRegulator";


export const router = createBrowserRouter([
    {
        path: routePath.home,
        element: <Home />
    },
    {
        path: routePath.notes,
        element: <Notes />
    },
    {
        path: routePath.dummy,
        element: <PreviousYear />
    },
    {
        path: routePath.pyq,
        element: <PreviousYear />
    },
    {
        path:routePath.gradePredictor,
        element:<GradePredictor/>
    },
    {
        path:routePath.attendanceRegulator,
        element:<AttendanceRegulator/>
    },
    {
        path: " ",
        element: <PageNotFound />
    }
])