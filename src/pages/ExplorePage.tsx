import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Input } from "antd";

export function ExplorePage() {
    const [position, setPosition] = useState<[number, number] | null>(null);

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
            },
        );
    }, []);

    if (!position) return <div>Loading map...</div>;

    return (
        <div className="flex h-full flex-col gap-3 pt-8">
            <h4 className="text-center font-bold text-lg border-b border-gray-300 pb-4">Explore</h4>
            <div className="px-4 py-4">
                <Input.Search placeholder="Search item" className="h-full"/>
            </div>
            <MapContainer center={position} zoom={13} style={{ height: "100vh", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                    <Popup>Your current location</Popup>
                    <Tooltip direction="top" offset={[-15, -10]} permanent>
                        You are here
                    </Tooltip>
                </Marker>
            </MapContainer>
        </div>
    );
}
