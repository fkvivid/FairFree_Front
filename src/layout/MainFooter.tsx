import { NavLink, useLocation } from "react-router";
import { HomeOutlined, EnvironmentOutlined, AppstoreOutlined, BellOutlined, UserOutlined } from "@ant-design/icons";

interface MenuItem {
    to: string;
    icon: React.ReactNode;
}

const menu: MenuItem[] = [
    { to: "/", icon: <HomeOutlined /> }, // Newsfeed
    { to: "/explore", icon: <EnvironmentOutlined /> }, // Explore / Map
    { to: "/inventory", icon: <AppstoreOutlined /> }, // Inventory
    { to: "/notifications", icon: <BellOutlined /> }, // Notification
    { to: "/profile", icon: <UserOutlined /> }, // Profile
];

// newsfeed(like faccebook) / explore(map) / inventory /notifcation/ profile
export const MainFooter: React.FC = () => {
    const location = useLocation();

    return (
        <div
            style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                height: "70px",
                borderTop: "1px solid #eee",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                zIndex: 1000,
            }}
        >
            {menu.map((item) => {
                return (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        style={{
                            color: location.pathname === item.to ? "#000" : "#888",
                            fontSize: "24px",
                        }}
                    >
                        {item.icon}
                    </NavLink>
                );
            })}
        </div>
    );
};
