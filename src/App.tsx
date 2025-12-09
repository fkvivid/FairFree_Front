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
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ProductFormPage } from "./pages/ProductFormPage";
import { ProductShowPage } from "./pages/ProductShowPage";

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
                {/* Public routes */}
                <Route index path="/" element={<MainLayout children={<HomePage />} />} />
                <Route path="/profile" element={<MainLayout children={<ProfilePage />} />} />
                <Route path="/signin" element={<MainLayout children={<LoginPage />} />} />
                <Route path="/signup" element={<MainLayout children={<RegisterPage />} />} />

                {/* Protected routes */}
                <Route path="/explore" element={<ProtectedRoute element={<MainLayout children={<ExplorePage />} />} />} />
                <Route path="/inventory" element={<ProtectedRoute element={<MainLayout children={<InventoryPage />} />} />} />
                <Route path="/notifications" element={<ProtectedRoute element={<MainLayout children={<NotificationPage />} />} />} />
                <Route path="/inventory/new" element={<ProtectedRoute element={<MainLayout children={<ProductFormPage/>} />} />} />
                <Route path="/inventory/:id" element={<ProtectedRoute element={<MainLayout children={<ProductShowPage />} />} />} />
            </Routes>
        </ConfigProvider>
    );
}

export default App;
