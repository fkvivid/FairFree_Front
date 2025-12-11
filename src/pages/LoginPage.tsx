import { Button, Divider, Form, Input, message } from "antd";
import { NavLink, useNavigate } from "react-router";
import { AuthService } from "../services/AuthService";
import { useState } from "react";

type LoginType = {
    email?: string;
    fullName?: string;
    password?: string;
};

export function LoginPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit = async (values: LoginType) => {
        try {
            if (loading) return;
            setLoading(true);
            const response = await AuthService.login(values);
            if (response.status === 200) {
                message.success("Successfully logged in!");
                localStorage.setItem("auth_token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data));
                navigate("/profile");
            }
        } catch (error: any) {
            message.error(error?.response?.data?.message || error.toString());
            console.log("ERROR:", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex flex-col h-full items-center p-8">
            <div className="my-20 font-bold text-3xl"> FairFree </div>
            <div className="flex flex-col w-full items-center gap-3">
                <h3 className="font-bold">Login to account</h3>
                <Form className="w-full " onFinish={onSubmit}>
                    <Form.Item name="email" rules={[{ required: true, message: "Please input your email!" }]}>
                        <Input placeholder="Email@domain.com" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
                        <Input type={"password"} placeholder="Password" />
                    </Form.Item>
                    <Form.Item label={null}>
                        <Button loading={loading} type="primary" className="w-full" htmlType="submit">
                            Continue
                        </Button>
                    </Form.Item>
                </Form>
                <Divider />
                 <span className="text-sm text-center text-gray-500">
                    Don't have an account?{" "}
                    <NavLink to="/signup" className="text-blue-600 hover:underline">Sign Up</NavLink>
                </span>
                <span className="text-sm text-center text-gray-500">
                    By clicking continue, you agree to our <NavLink to="#">Terms of Service</NavLink> and <NavLink to="#">Privacy Policy </NavLink>
                </span>
            </div>
        </div>
    );
}
