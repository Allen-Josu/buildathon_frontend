import { createBrowserRouter } from "react-router-dom";
import { routePath } from "../config";
import Home from "../pages/home";
import PageNotFound from "../pages/notFound";
import Notes from "../pages/notes";
import PreviousYear from "../pages/previousYearQuestions";
import About from "../components/Dashboard/HomeDashboard/About/About";
import ModelQuestionGenerator from "../pages/modelQuestionGenerator";

export const router = createBrowserRouter([
  {
    path: routePath.home,
    element: <Home />,
  },
  {
    path: routePath.notes,
    element: <Notes />,
  },
  {
    path: routePath.dummy,
    element: <PreviousYear />,
  },
  {
    path: routePath.pyq,
    element: <PreviousYear />,
  },
  {
    path: routePath.about,
    element: <About />,
  },
  {
    path: routePath.modelQuestionGenerator,
    element: <ModelQuestionGenerator />,
  },
  {
    path: " ",
    element: <PageNotFound />,
  },
]);
