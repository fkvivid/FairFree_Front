import { Button, Divider, Form, Input, message } from "antd";
import { NavLink, useNavigate } from "react-router";
import { AuthService } from "../services/AuthService";

type LoginType = {
    email?: string;
    fullName?: string;
    password?: string;
};

export function LoginPage() {
    const navigate = useNavigate();

    const onSubmit = async (values: LoginType) => {
        try {
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
                        <Button type="primary" className="w-full" htmlType="submit">
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
