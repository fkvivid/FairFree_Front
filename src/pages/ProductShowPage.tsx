import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router";
import { InventoryService } from "../services/InventoryService";
import { Card, Alert, Row, Col, Image, Descriptions, Tag, Space, Typography, Divider, Button, Modal, List } from "antd";
import { ArrowLeftOutlined, InfoCircleOutlined, CloseCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router";

const { Title, Text } = Typography;

type Location = { address?: string; city?: string; state?: string; country?: string; latitude?: number; longitude?: number };
type Owner = { id?: number; fullName?: string; email?: string };
type Claim = { id: number; userId: number; userName: string; status: string; message?: string };

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
  claims?: Claim[];
  [key: string]: any;
};

export const ProductShowPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string>("");
  const [showErrorDetails, setShowErrorDetails] = useState(false);
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchItem = async () => {
    if (!id) return;
    setLoading(true);
    try {
            const { data } = await InventoryService.getItem(id);
            console.log("Fetched item data:", data);
            setItem(data);
        } 
        catch (error) {
            console.log("ERROR:", error);
            setError("Failed to fetch item details.");
        } 
        finally {
            setLoading(false);
        }
  };

  useEffect(() => {
    fetchItem();
  }, [id]);

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

  const expiryText = item.neverExpires
    ? "Never expires"
    : item.expiresAfterDays
    ? `Expires after ${item.expiresAfterDays} days`
    : "No expiry info";

  const handleClaim = async () => {
    if (!item?.id) return;
    setError("");
    try {
        await InventoryService.claimItem(item.id);
        fetchItem();
    } 
    catch (error) {
        console.log("Claim error:", error);
        setError("Failed to claim the item");
    }
  };
  const isOwner = item.owner?.id === loggedInUser.id;

  // Find a pending claim for the logged-in user (only if they are NOT the owner)
    const myClaim = !isOwner
        ? item.claims?.find(c => c.userId === loggedInUser.id && c.status === "PENDING")
        : undefined;

  const handleCancel = async () => {
    if (!myClaim) return;
    setError("");
    try {
        await InventoryService.cancelClaim(myClaim.id);
        fetchItem();
    } 
    catch (error) {
        console.log("Cancel claim error:", error);
        setError("Failed to cancel the claim.");
    }
  };

  const handleApprove = async (claimId: number) => {
    setError("");
    try {
        await InventoryService.approveClaim(claimId);
        fetchItem();
    } 
    catch (error) {
        console.log("Approve claim error:", error);
        setError("Failed to approve the claim.");
    }
  };

  const handleDelete = async () => {
    if (!item?.id) return;
    setError("");
    try {
        await InventoryService.deleteItem(item.id);
        navigate('/inventory');
    } 
    catch (error) {
        console.log("Delete error:", error);
        setError("Failed to delete the item.");
    }
  };

  return (
    <div className="flex flex-col p-8 gap-3">
      <div className="flex flex-col w-full items-center">
        <div className="flex justify-between w-full items-center">
          <div onClick={() => window.history.back()}>
            <ArrowLeftOutlined />
          </div>
          <h3 className="font-bold text-xl">Details of the selected item.</h3>
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
        extra={
          isOwner && (
            <Button danger onClick={handleDelete}>
              Delete Item
            </Button>
          )
        }
      >
        <Row gutter={[24, 24]}>
          <Col xs={24} md={10}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {item.imageUrls && item.imageUrls.length > 0 ? (
                <div>
                  <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", 
                    gap: 12,
                    marginBottom: 12
                  }}>
                    {item.imageUrls.map((imageUrl, index) => (
                      <div key={index} style={{ borderRadius: 8, overflow: "hidden", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
                        <Image
                          src={imageUrl}
                          alt={`${item.name} ${index + 1}`}
                          width="100%"
                          height={120}
                          style={{ objectFit: "cover" }}
                          preview
                          fallback="https://plus.unsplash.com/premium_vector-1731660866636-d6ee4dcd6806?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: 240,
                    background: "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 8,
                    border: "2px dashed #d9d9d9",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  <span style={{ fontSize: 32 }}>🖼️</span>
                  <Text type="secondary">No image available</Text>
                </div>
              )}
              <Space>
                <Tag>📦 Quantity: {item.quantity ?? 0}</Tag>
                <Tag>⏰ {expiryText}</Tag>
              </Space>
            </div>
          </Col>

          <Col xs={24} md={14}>
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Description">{item.description || "-"}</Descriptions.Item>
              <Descriptions.Item label="Location">
  {item.location ? (
    <Space direction="vertical" size={2}>
      {/* Address line */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 14 }}>🏠</span>
        <Text>{item.location.address}</Text>
      </div>

      {/* City, State, Country */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 14 }}>📍</span>
        <Text>
          {[item.location.city, item.location.state, item.location.country].filter(Boolean).join(", ")}
        </Text>
      </div>

      {/* See on Map link */}
      {item.location.latitude != null && item.location.longitude != null && (
        <div style={{ marginLeft: 22 }}>
          <Text>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${item.location.latitude},${item.location.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              See on Map
            </a>
          </Text>
        </div>
      )}
    </Space>
  ) : (
    "-"
  )}
</Descriptions.Item>

              {item.owner && (
                <Descriptions.Item >
                        <Card size="small" bordered={false} style={{ backgroundColor: "#fff7e6", borderRadius: 8, padding: "12px", boxShadow: "0 2px 8px rgba(212, 136, 6, 0.15)" }}>
                    <Space direction="vertical" size={4}>
                        <Text strong style={{ color: "#d48806", fontSize: 14 }}>👤 Owner / Donator</Text>
                        <Text style={{ fontSize: 13 }}>{item.owner.fullName}</Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>{item.owner.email}</Text>
                         <Text type="danger" style={{ marginTop: 4, fontSize: 13 }}>
                            Contact the owner for any inquiries regarding this donation
                          </Text>
                    </Space>
                    </Card>
                </Descriptions.Item>
                )}
                { item.receiver && (
                        <Descriptions.Item>
                            <Card size="small" bordered={false} style={{ backgroundColor: "#ffe7e7", borderRadius: 8, padding: "12px", boxShadow: "0 2px 8px rgba(255, 77, 79, 0.15)" }}>
                              <Space direction="vertical" size={4}>
                                <Text strong style={{ color: "#439f42ff", fontSize: 14 }}>✓ Allocated Recipient</Text>
                                <Text style={{ fontSize: 13 }}>{item.receiver.fullName}</Text>
                                <Text type="secondary" style={{ fontSize: 12 }}>{item.receiver.email}</Text>
                                <Text type="danger" style={{ marginTop: 4, fontSize: 13 }}>
                                    ⚠  This item has already been donated and is not available
                                </Text>
                              </Space>
                            </Card>
                        </Descriptions.Item>
                )}
              <Descriptions.Item label="Claims">
                <Space>
                  <Tag color="blue">{item.claims ? item.claims.length : 0}</Tag>
                  {item.claims && item.claims.length > 0 && (
                    <Space size={4}>
                      <Tag color="orange">{item.claims.filter(c => c.status === "PENDING").length} total pending claims</Tag>
                    </Space>
                  )}
                </Space>
              </Descriptions.Item>
              {error && (
                <Descriptions.Item>
                  <Alert
                    type="error"
                    showIcon={false}
                    description={
                      <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <Button
                            type="text"
                            size="small"
                            icon={<InfoCircleOutlined style={{ color: "#13c2c2", fontSize: 18, fontWeight: "bold" }} />}
                            onClick={() => setShowErrorDetails(true)}
                            title="Click to see possible reasons"
                          />
                          <span>{error}</span>
                        </div>
                        <Button
                          type="text"
                          size="small"
                          icon={<CloseCircleFilled style={{ fontSize: 16, color: "#ff4d4f" }} />}
                          onClick={() => setError("")}
                          title="Close"
                        />
                      </div>
                    }
                    style={{ marginTop: 4 }}
                  />
                </Descriptions.Item>
              )}

              {/* Error Details Modal - Only shows when info icon is clicked */}
              {showErrorDetails && (
                <Modal
                  title="Why did my claim fail?"
                  open={showErrorDetails}
                  onCancel={() => setShowErrorDetails(false)}
                  closable={true}
                  footer={[
                    <Button key="close" type="primary" onClick={() => setShowErrorDetails(false)}>
                      Close
                    </Button>,
                  ]}
                >
                  <div style={{ marginTop: 16 }}>
                    <Text strong>Possible reasons:</Text>
                    <div style={{ marginTop: 12 }}>
                      {[
                        "✓ You have already claimed this item",
                        "⏰ Your session has expired, please log in again",
                        "📋 Your previous claim was cancelled - you cannot claim it again",
                        "✓ Someone else has already received this item",
                        "📦 The item is no longer available",
                        "⏰ This item has expired",
                        "🌐 Network connectivity issue",
                        "🔒 You don't have permission to claim this item",
                      ].map((reason: string, idx: number) => (
                        <div key={idx} style={{ marginBottom: 8, paddingLeft: 8, borderLeft: "3px solid #ff4d4f" }}>
                          <Text>{reason}</Text>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 16, padding: 8, backgroundColor: "#f0f2f5", borderRadius: 4 }}>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        💬 If you believe this is an error, please contact the item owner or support team.
                      </Text>
                    </div>
                  </div>
                </Modal>
              )}
              <Descriptions.Item label="Actions">
                <Space direction="vertical" size={8} style={{ width: "100%" }}>
                  {/* Claim button,  */}
                  {!isOwner && item.status !== "DONATED" && !myClaim && (
                    <Button type="primary" size="middle" onClick={handleClaim} style={{ background: "#13c2c2", borderColor: "#13c2c2" }}>Claim Item</Button>
                  )}
                  {/* Cancel claim button */}
                  {myClaim && (
                    <Button danger size="large" block onClick={handleCancel}>Cancel My Claim</Button>
                  )}
                  {/* Approve buttons for owner */}
                  {isOwner && (item.claims ?? []).filter((c) => c.status === "PENDING").length > 0 && (
                    <div style={{ width: "100%" }}>
                      <Text strong style={{ marginBottom: 12, display: "block", fontSize: 13 }}>Pending claims to approve:</Text>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 120px", gap: 8, alignItems: "center" }}>
                        {(item.claims ?? []).filter((c) => c.status === "PENDING").map((claim) => (
                          <React.Fragment key={claim.id}>
                            <div style={{ paddingLeft: 8, borderLeft: "3px solid #1890ff" }}>
                              <Text style={{ fontSize: 13, display: "block" }}>{claim.userName}</Text>
                              {claim.message && <Text type="secondary" style={{ fontSize: 12 }}>{claim.message}</Text>}
                            </div>
                            <Button type="primary" onClick={() => handleApprove(claim.id)} size="small" style={{ width: "100%" }}>Approve</Button>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}
                </Space>
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>

      {/* Error Details Modal - Only shows when info icon is clicked */}
      {showErrorDetails && (
        <Modal
          title="Why did my claim fail?"
          open={showErrorDetails}
          onCancel={() => setShowErrorDetails(false)}
          closable={true}
          footer={[
            <Button key="close" type="primary" onClick={() => setShowErrorDetails(false)}>
              Close
            </Button>,
          ]}
        >
          <div style={{ marginTop: 16 }}>
            <Text strong>Possible reasons:</Text>
            <div style={{ marginTop: 12 }}>
              {[
                "1. You have already claimed this item",
                "2. Your previous claim was cancelled - you cannot claim it again",
                "3. Someone else has already received this item",
                "4. The item is no longer available",
                "5. This item has expired",
                "6. Network connectivity issue",
                "7. You don't have permission to claim this item",
              ].map((reason: string, idx: number) => (
                <div key={idx} style={{ marginBottom: 8, paddingLeft: 8, borderLeft: "3px solid #ff4d4f" }}>
                  <Text>{reason}</Text>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, padding: 8, backgroundColor: "#f0f2f5", borderRadius: 4 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                💬 If you believe this is an error, please contact the item owner or support team.
              </Text>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProductShowPage;
