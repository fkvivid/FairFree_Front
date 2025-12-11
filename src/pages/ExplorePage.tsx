import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Input, Radio, Spin, Image } from "antd";
import { InventoryService } from "../services/InventoryService";
import { useNavigate } from "react-router";
import L from "leaflet";

// Fix Leaflet marker icons in production
const defaultIcon = L.icon({
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

L.Marker.prototype.setIcon(defaultIcon);

export function ExplorePage() {
    const [position, setPosition] = useState<[number, number] | null>(null);
    const [menu, setMenu] = useState<string>("map");
    const [items, setItems] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosition([pos.coords.latitude, pos.coords.longitude]);
            },
            (err) => {
                console.error(err);
                alert("Unable to retrieve your location");
            }
        );

        // eslint-disable-next-line react-hooks/immutability
        getItems();
    }, []);

    const getItems = async () => {
        try {
            const { data } = await InventoryService.getAvailableItems();
            setItems(data);
        } catch (error) {
            console.log("ERROR:", error);
        }
    };

    if (!position)
        return (
            <div className="flex w-full h-full items-center justify-center">
                <Spin />
            </div>
        );

    return (
        <div className="flex h-full flex-col gap-3 pt-8">
            <h4 className="text-center font-bold text-lg border-b border-gray-300 pb-4">
                Explore
            </h4>
            <div className="px-4 py-2">
                <Input.Search placeholder="Search item" className="h-full" />
            </div>
            <div className="px-4 mb-2">
                <Radio.Group
                    block
                    options={[
                        { label: "Map", value: "map" },
                        { label: "List", value: "list" },
                    ]}
                    onChange={(e) => setMenu(e.target.value)}
                    defaultValue={menu}
                    optionType="button"
                    buttonStyle="solid"
                />
            </div>
            {menu === "map" ? (
                <MapContainer
                    center={position}
                    zoom={13}
                    style={{ height: "100vh", width: "100%" }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={position} icon={defaultIcon}>
                        <Tooltip direction="top" offset={[0, -30]} permanent>
                            You are here
                        </Tooltip>
                    </Marker>
                    {items.map((item) => {
                        if (!item.location.latitude || !item.location.longitude)
                            return null;
                        const itemPosition: [number, number] = [
                            item.location.latitude,
                            item.location.longitude,
                        ];
                        return (
                            <Marker
                                key={item.id}
                                position={itemPosition}
                                icon={defaultIcon}
                                // eventHandlers={{
                                //     click: () =>
                                //         navigate(`/inventory/${item.id}`),
                                // }}
                            >
                                <Popup>
                                    <div className="flex flex-col gap-2">
                                        <h4 className="font-semibold">
                                            {item.name}
                                        </h4>
                                        <p className="text-sm text-gray-600 max-w-xs">
                                            {item.description}
                                        </p>
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                                            onClick={() =>
                                                navigate(
                                                    `/inventory/${item.id}`
                                                )
                                            }
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </Popup>
                                <Tooltip
                                    direction="top"
                                    offset={[0, -35]}
                                    permanent
                                >
                                    <span className="text-xs font-semibold bg-white px-2 py-1 rounded">
                                        {item.name}
                                    </span>
                                </Tooltip>
                            </Marker>
                        );
                    })}
                </MapContainer>
            ) : (
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
                                    src={
                                        item.imageUrls.length > 0
                                            ? item.imageUrls[0]
                                            : undefined
                                    }
                                    preview={false}
                                    fallback="https://plus.unsplash.com/premium_vector-1731660866636-d6ee4dcd6806?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                />
                            </div>
                            <div className="w-full">
                                <h4 className="font-semibold text-lg">
                                    {item.name}
                                </h4>
                                <p className="text-sm text-gray-600 line-clamp-3">
                                    {item.description}
                                </p>
                            </div>
                            <div className="flex items-center">
                                {item.quantity}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
