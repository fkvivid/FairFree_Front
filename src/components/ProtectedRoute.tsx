import React from "react";
import { Navigate } from "react-router";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
    element: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
        return <Navigate to="/signin" replace />;
    }

    return <>{element}</>;
};
