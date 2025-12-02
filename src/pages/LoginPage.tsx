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
                <NavLink to="/signup">or Sign up</NavLink>
            </div>
        </div>
    );
}
