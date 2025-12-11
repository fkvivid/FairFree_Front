import React from "react";
import type { ReactNode } from "react";
import { Navigate } from "react-router";

interface ProtectedRouteProps {
    element?: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const storedUser = localStorage.getItem("user");
    
    if (!storedUser) {
        return <Navigate to="/signin" replace />;
    }    
    return <>{element}</>;
};
