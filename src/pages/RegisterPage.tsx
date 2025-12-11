import { Button, Form, Input, message } from "antd";
import { NavLink } from "react-router";
import { AuthService } from "../services/AuthService";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

type RegisterType = {
    email?: string;
    fullName?: string;
    password?: string;
};

export function RegisterPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const stored = localStorage.getItem("auth_token");
        if (stored) {
            navigate("/profile");
            return;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = async (values: RegisterType) => {
        try {
            if (loading) return;
            setLoading(true);
            const response = await AuthService.register(values);
            if (response.status === 201) {
                message.success("Successfully registered!");
                navigate("/signin");
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
            <div className="my-7 font-bold text-2xl"> Register to FairFree </div>
            <div className="flex h-full flex-col w-full items-center gap-3">
                <h3 className="font-bold">Create an account for free</h3>
                <Form className="w-full " onFinish={onSubmit}>
                    <Form.Item name="email" rules={[{ required: true, message: "Please input your email!" }]}>
                        <Input placeholder="Email@domain.com" />
                    </Form.Item>
                    <Form.Item name="fullName" rules={[{ required: true, message: "Please input your name!" }]}>
                        <Input placeholder="Full Name" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
                        <Input placeholder="Password" type={"password"} />
                    </Form.Item>
                    <Form.Item label={null}>
                        <Button loading={loading} type="primary" className="w-full" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
                <span className="text-sm text-center text-gray-500">
                    Already have an account?{" "}
                    <NavLink to="/signin" className="text-blue-600 hover:underline">Sign in</NavLink>
                </span>
                <span className="text-sm text-center text-gray-500">
                    By clicking continue, you agree to our <NavLink to="#">Terms of Service</NavLink> and <NavLink to="#">Privacy Policy </NavLink>
                </span>
            </div>
        </div>
    );
}
