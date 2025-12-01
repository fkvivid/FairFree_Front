import { Route, Routes } from "react-router";
import { HomePage } from "./pages/HomePage";
import { ExplorePage } from "./pages/ExplorePage";
import { InventoryPage } from "./pages/InventoryPage";
import { LoginPage } from "./pages/LoginPage";
import { NotificationPage } from "./pages/NotificationPage";
import { ProfilePage } from "./pages/ProfilePage";
import { MainLayout } from "./layout/MainLayout";
import { ConfigProvider } from "antd";
import { RegisterPage } from "./pages/RegisterPage";

function App() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#000",
                },
                components: {
                    Input: {
                        controlHeight: 38,
                    },
                    Button: {
                        controlHeight: 38, 
                    },
                },
            }}
        >
            <Routes>
                <Route index path="/" element={<MainLayout children={<HomePage />} />} />
                <Route path="/explore" element={<MainLayout children={<ExplorePage />} />} />
                <Route path="/inventory" element={<MainLayout children={<InventoryPage />} />} />
                <Route path="/notifications" element={<MainLayout children={<NotificationPage />} />} />
                <Route path="/profile" element={<MainLayout children={<ProfilePage />} />} />
                {/* auth */}
                <Route path="/signin" element={<MainLayout children={<LoginPage />} />} />
                <Route path="/signup" element={<MainLayout children={<RegisterPage/>} />} />
            </Routes>
        </ConfigProvider>
    );
}

export default App;
