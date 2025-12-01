import { useState, useEffect } from "react";
import { Navigate } from "react-router";

export function ProfilePage() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    if (!user) return <Navigate to="/signin" replace />;

    return <div>ProfilePage</div>;
}
