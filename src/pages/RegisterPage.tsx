import { Button, Form, Input } from "antd";
import { NavLink } from "react-router";

export function RegisterPage() {
    const onSubmit = (values: any) => {
        console.log(values);
    };
    return (
        <div className="flex flex-col h-full items-center p-8">
            <div className="my-30 font-bold text-3xl"> FairFree </div>
            <div className="flex h-full flex-col w-full items-center gap-3">
                <h3 className="font-bold">Create an account</h3>
                <p>Enter your email to sign up for this app </p>
                <Form className="w-full " onFinish={onSubmit}>
                    <Form.Item name="username" rules={[{ required: true, message: "Please input your username!" }]}>
                        <Input placeholder="email@domain.com" />
                    </Form.Item>
                    <Form.Item label={null}>
                        <Button type="primary" className="w-full" htmlType="submit">
                            Continue
                        </Button>
                    </Form.Item>
                </Form>
                <span className="text-sm text-center text-gray-500">
                    By clicking continue, you agree to our <NavLink to="#">Terms of Service</NavLink> and <NavLink to="#">Privacy Policy </NavLink>
                </span>
            </div>
        </div>
    );
}
