import { Avatar, Button, Divider } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";

export function ProfilePage() {
    const navigate = useNavigate();
    const [user, _] = useState(() => {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
    });

    const handleSignOut = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("auth_token");
        window.location.reload();
    };

    return (
        <div className="min-h-full flex flex-col items-center justify-start py-12 px-6 sm:px-8 md:px-12">
            <div className="w-full max-w-3xl">
                <h4 className="text-lg font-bold text-center">My Profile</h4>
                <Divider />
                <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="flex flex-col items-center gap-5">
                        <Avatar
                            size={96}
                            style={{ backgroundColor: "#87d068" }}
                        >
                            {user?.fullName?.charAt(0)}
                        </Avatar>
                        <div className="text-center">
                            <div className="text-2xl font-extrabold leading-tight">
                                {user?.fullName || "Anonymous"}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                                {user?.email}
                            </div>
                        </div>
                            <div className="w-full mt-4 grid grid-cols-2 gap-3 text-center">
                                <div className="bg-gray-50 rounded-md p-3">
                                    <div className="text-lg font-semibold">
                                        {/* placeholder */}0
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Donations
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-md p-3">
                                    <div className="text-lg font-semibold">
                                        {/* placeholder */}0
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Claims
                                    </div>
                                </div>
                            </div>
                        <Divider />

                        <div className="w-full flex flex-col sm:flex-row gap-3 h-12 ">
                            <Button
                                onClick={() => navigate("/inventory")}
                                className="flex-1 ">My Items
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <Button
                        type="primary"
                        className="w-full"
                        onClick={handleSignOut}
                    >
                        Sign out
                    </Button>
                </div>
            </div>
        </div>
    );
}
