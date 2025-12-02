import { Button, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export function InventoryPage() {
    return (
        <div className="flex flex-col justify-between h-full w-full p-8">
            <div className="flex flex-col w-full items-center">
                <div className="flex justify-between w-full items-center">
                    <div></div>
                    <h3 className="font-bold text-xl">My Items</h3>
                    <Button type="primary" icon={<PlusOutlined />} />
                </div>
                <Divider />
            </div>
            <div className="mb-16 flex flex-col w-full">
                <Button type="primary" className="w-full">
                    Donate
                </Button>
            </div>
        </div>
    );
}
