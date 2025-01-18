/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";

export default function UserProtectedRoute({ children }) {
    const user = useUserStore((state) => state.user);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
