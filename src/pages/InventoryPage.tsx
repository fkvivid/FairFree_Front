import { Button, Divider } from "antd";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import { InventoryService } from "../services/InventoryService";
import { Image } from "antd";

export function InventoryPage() {
    const [items, setItems] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const { data } = await InventoryService.getMyItems();
                setItems(data);
            } catch (error) {
                console.error("Failed to fetch items:", error);
            }
        })();
    }, []);

    return (
        <div className="flex flex-col h-screen w-full p-8 gap-3">
            {/* Header */}
            <div className="flex flex-col w-full items-center">
                <div className="flex justify-between w-full items-center">
                    <div></div>
                    <h3 className="font-bold text-xl">My Items</h3>
                    <div></div>
                </div>
                <Divider />
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-auto flex flex-col gap-3 mb-4">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-between gap-5 border border-gray-300 rounded p-4 cursor-pointer hover:shadow-md transition"
                        onClick={() => navigate(`/inventory/${item.id}`)}
                    >
                        <div>
                            <Image
                                alt="basic image"
                                width={80}
                                height={80}
                                src={item.imageUrls.length > 0 ? item.imageUrls[0] : undefined}
                                preview={false}
                                fallback="https://plus.unsplash.com/premium_vector-1731660866636-d6ee4dcd6806?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            />
                        </div>
                        <div className="w-full">
                            <h4 className="font-semibold text-lg">{item.name}</h4>
                            <p className="text-sm text-gray-600 line-clamp-3">{item.description}</p>
                        </div>
                        <div className="flex items-center">{item.quantity}</div>
                    </div>
                ))}
            </div>
            <div className="pb-auto" >
                <NavLink to="/inventory/new">
                    <Button type="primary" className="w-full mb-4">
                        Donate
                    </Button>
                </NavLink>
            </div>
        </div>
    );
}
