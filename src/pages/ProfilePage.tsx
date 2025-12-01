import { Avatar, Button, Divider } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export function ProfilePage() {
    const navigate = useNavigate();
    const [user, _] = useState(() => {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
    });

    useEffect(() => {
        if (!user) {
            navigate("/signin");
        }
    }, [user, navigate]);

    return (
        <div className="flex flex-col h-screen p-8 justify-between items-center">
            <div className="flex flex-col w-full items-center gap-5">
                <h3 className="font-bold text-xl">Profile</h3>
                <Divider />

                <Avatar size={64} style={{ backgroundColor: "#87d068" }}>
                    {user?.fullName?.charAt(0)}
                </Avatar>
                <div className="font-bold">{user?.fullName}</div>
                <div className="text-gray-500">{user?.email}</div>
            </div>

            <Button
                onClick={() => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("auth_token");
                    window.location.reload();
                }}
                type="primary"
                className="w-full mb-20"
            >
                Sign out
            </Button>
        </div>
    );
}
