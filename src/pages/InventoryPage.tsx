import { Button, Divider } from "antd";

export function InventoryPage() {
    return (
        <div className="flex flex-col justify-between h-full w-full p-8">
            <div className="flex flex-col w-full items-center">
                <h3 className="font-bold text-xl">My Items</h3>
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
