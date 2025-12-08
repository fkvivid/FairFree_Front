import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { InventoryService } from "../services/InventoryService";
import { Card, Alert, Row, Col, Image, Descriptions, Tag, Space, Typography, Divider } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

type Location = {
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
};

type Owner = {
    id?: number;
    fullName?: string;
    email?: string;
};

type Item = {
    id?: number;
    name?: string;
    description?: string;
    quantity?: number;
    location?: Location;
    imageUrls?: string[];
    status?: string;
    owner?: Owner;
    receiver?: any;
    expiresAfterDays?: number;
    neverExpires?: boolean;
    claims?: any[];
    [key: string]: any;
};

export const ProductShowPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [item, setItem] = useState<Item | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!id) return;
        (async () => {
            if (loading) return;
            setLoading(true);
            try {
                const { data } = await InventoryService.getItem(id);
                setItem(data);
            } catch (error) {
                console.log("ERROR:", error);
            }
        })();
    });

    if (!item)
        return (
            <div className="flex flex-col p-8 gap-3">
                <div className="flex flex-col w-full items-center">
                    <div className="flex justify-between w-full items-center">
                        <div onClick={() => window.history.back()}>
                            <ArrowLeftOutlined />
                        </div>
                        <h3 className="font-bold text-xl">Show item</h3>
                        <div></div>
                    </div>
                    <Divider />
                </div>
                <Alert message="No item found" type="warning" />
            </div>
        );

    const imageSrc = item.imageUrls && item.imageUrls.length > 0 ? item.imageUrls[0] : undefined;
    const expiryText = item.neverExpires ? "Never expires" : item.expiresAfterDays ? `Expires after ${item.expiresAfterDays} days` : "No expiry info";

    return (
        <div className="flex flex-col p-8 gap-3">
            <div className="flex flex-col w-full items-center">
                <div className="flex justify-between w-full items-center">
                    <div onClick={() => window.history.back()}>
                        <ArrowLeftOutlined />
                    </div>
                    <h3 className="font-bold text-xl">Show item</h3>
                    <div></div>
                </div>
                <Divider />
            </div>
            <Card
                title={
                    <Title level={4} style={{ margin: 0 }}>
                        {item.name}
                    </Title>
                }
            >
                <Row gutter={[24, 24]}>
                    <Col xs={24} md={10}>
                        {imageSrc ? (
                            <Image
                                src={imageSrc}
                                alt={item.name}
                                width={100}
                                height={100}
                                fallback="https://plus.unsplash.com/premium_vector-1731660866636-d6ee4dcd6806?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            />
                        ) : (
                            <div
                                style={{
                                    width: "100%",
                                    height: 240,
                                    background: "#f5f5f5",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Text type="secondary">No image</Text>
                            </div>
                        )}
                        <Space style={{ marginTop: 12 }}>
                            <Tag>{`Quantity: ${item.quantity ?? 0}`}</Tag>
                            <Tag>{expiryText}</Tag>
                        </Space>
                    </Col>

                    <Col xs={24} md={14}>
                        <Descriptions column={1} size="small">
                            <Descriptions.Item label="Description">{item.description || "-"}</Descriptions.Item>
                            <Descriptions.Item label="Location">
                                {item.location ? (
                                    <div>
                                        <div>{item.location.address}</div>
                                        <div>{[item.location.city, item.location.state, item.location.country].filter(Boolean).join(", ")}</div>
                                    </div>
                                ) : (
                                    "-"
                                )}
                            </Descriptions.Item>
                            <Descriptions.Item label="Claims">{item.claims ? item.claims.length : 0}</Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default ProductShowPage;
