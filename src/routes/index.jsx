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
import About from "../components/Dashboard/HomeDashboard/About/About";
import ModelQuestionGenerator from "../pages/modelQuestionGenerator";
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
        element: <AdminHomePage />
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
        path: routePath.admin,
        element: <AdminHomePage />,
    },
    {
        path: routePath.department,
        element: <DepartmentPage />,
        children: [
            {
                path: `${routePath.viewDepartment}/:entityId`,
                element: <ViewDepartment />
            },
            {
                path: routePath.addDepartment,
                element: <AddDepartment />
            },
            {
                path: `${routePath.editDepartment}/:entityId`,
                element: <EditDepartment />
            }
        ]
    },
    {
        path: routePath.department,
        element: <DepartmentPage />
    },
    {
        path: routePath.users,
        element: <UsersPage />,
        children: [
            {
                path: `${routePath.addUser}`,
                element: <AddUserDrawer />
            }
        ]
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
        path: "*",
        element: <PageNotFound />
    }
])