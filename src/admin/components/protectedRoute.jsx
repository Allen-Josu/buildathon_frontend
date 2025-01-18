/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/userStore';

export default function ProtectedRoute({ children }) {
    const admin = useAuthStore((state) => state.admin);

    if (!admin) {
        return <Navigate to="/admin-login" replace />;
    }

    return children;
};

