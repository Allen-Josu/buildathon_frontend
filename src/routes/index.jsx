import { createBrowserRouter } from "react-router-dom";
import { routePath } from "../config";
import Home from "../pages/home";
import PageNotFound from "../pages/notFound";
import Notes from "../pages/notes";

import PreviousYear from "../pages/previousYearQuestions";
import AdminHomePage from "../admin/pages/home";
import DepartmentPage from "../admin/pages/department";
import UsersPage from "../admin/pages/users";
import AddUserDrawer from "../admin/drawer/add-user";
import ViewDepartment from "../admin/drawer/view-department";
import AddDepartment from "../admin/drawer/add-department";
import EditDepartment from "../admin/drawer/edit-department";
import About from "../pages/about"
import GradePredictor from "../pages/gradePredictor/gradePredictor";

import QuestionPaperGenerator from "../pages/modelQuestionGenerator";
import AttendanceRegulator from "../pages/attendanceRegulator/attendanceRegulator";
import Signup from "../pages/signup";
import Login from "../pages/login/login";
import ViewUser from "../admin/drawer/view-user";

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
    path: routePath.pyq,
    element: <PreviousYear />,
  },
  {
    path: routePath.gradePredictor,
    element: <GradePredictor />,
  },
  {
    path: routePath.attendanceRegulator,
    element: <AttendanceRegulator />,
  },
  {
    path: routePath.admin,
    element: <AdminHomePage />,
  },
  {
    path: routePath.login,
    element: <Login />
  },
  {
    path: routePath.signup,
    element: <Signup />
  },
  {
    path: routePath.department,
    element: <DepartmentPage />,
    children: [
      {
        path: `${routePath.viewDepartment}/:entityId`,
        element: <ViewDepartment />,
      },
      {
        path: routePath.addDepartment,
        element: <AddDepartment />,
      },
      {
        path: `${routePath.editDepartment}/:entityId`,
        element: <EditDepartment />,
      },
    ],
  },
  {
    path: routePath.department,
    element: <DepartmentPage />,
  },
  {
    path: routePath.users,
    element: <UsersPage />,
    children: [
      {
        path: `${routePath.addUser}`,
        element: <AddUserDrawer />,
      },
      {
        path: `${routePath.viewUser}/:entityId`,
        element: <ViewUser />
      },
      // {
      //   path: `${routePath.editUser}/:entityId`,
      //   element: <ViewUser />
      // }
    ],
  },
  {
    path: routePath.about,
    element: <About />,
  },
  {
    path: routePath.modelQuestionGenerator,
    element: <QuestionPaperGenerator />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
