import { List, Avatar, Divider, Spin, Button, Tooltip } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { NotificationService } from "../services/NotificationService";

interface Notification {
    id: number;
    message: string;
    itemId: number;
    type: string;
    createdAt: string;
    isRead: boolean;
}

// Helper function to format relative time
function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diff = (now.getTime() - date.getTime()) / 1000; // in seconds

    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;

    const days = Math.floor(diff / 86400);
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export function NotificationPage() {
    const [allNotifications, setAllNotifications] = useState<Notification[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedType, setSelectedType] = useState<string>("ALL");

    const navigate = useNavigate();

    const handleOnItemSelect = (itemId: number) => {
        // navigate to item details
        navigate(`/inventory/${itemId}`);
    };

    const handleOpenIcon = (e: React.MouseEvent, itemId: number) => {
        e.stopPropagation();
        handleOnItemSelect(itemId);
    };

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await NotificationService.getAllMyUnreadNotifications({});
                if (response.status === 200) {
                    setAllNotifications(response.data);
                    setNotifications(response.data);

                    // also mark all as read, next time user opens, they will be marked as read
                    markAllMyNotificationsAsRead();
                }
            } 
            catch (error) {
                console.error("Error loading notifications:", error);
            } 
            finally {
                setLoading(false);
            }
        };
        fetchNotifications();
    }, []);

    const handleFilterChange = (type: string) => {
        setSelectedType(type);
        if (type === "ALL") {
            setNotifications(allNotifications);
        }
        else if(type === "UNREAD") {
            setNotifications(allNotifications.filter(n => !n.isRead));
        }
        else {
            setNotifications(allNotifications.filter(n => n.type === type));
        }
    };

    const markAllMyNotificationsAsRead = async () => {
        try {
            const response = await NotificationService.markAllMyNotificationAsRead({});
                if (response.status === 200) {
                    // Just silently mark all as read in the DB, next time user opens, they won't see them unread.
                    console.log("All notifications marked as read.");
                }
            }
            catch (error) {
                console.error("Error marking notifications as read:", error);
            }
        }
        if (loading) {
            return (
                <div className="w-full h-screen flex items-center justify-center">
                    <Spin tip="Loading notifications from the server ..." />
                </div>
            );
        }

    return (
        <div className="w-full flex flex-col p-8">
            <h2 className="font-bold text-2xl mb-4">Activities For You</h2>

            {/* Filter buttons to choose specific types of notifications */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                    {["ALL", "UNREAD", "ITEM_CLAIMED", "CLAIM_APPROVED", "CLAIM_DENIED", "CLAIM_CANCELLED", "ITEM_EXPIRED"].map((type) => {
                        const labels: Record<string, string> = {
                            ALL: "All",
                            UNREAD: "Unread",
                            ITEM_CLAIMED: "Items Claimed",
                            CLAIM_APPROVED: "Approved Claims",
                            CLAIM_DENIED: "Denied Claims",
                            CLAIM_CANCELLED: "Cancelled Claims",
                            ITEM_EXPIRED: "Expired Items",
                        };
                        const isSelected = selectedType === type;
                        return (
                            <button
                                key={type}
                                onClick={() => handleFilterChange(type)}
                                className={`
                                    px-4 py-1 rounded-full font-medium
                                    transition-colors duration-200
                                    whitespace-nowrap
                                    cursor-pointer
                                    ${isSelected ? "bg-blue-500 text-white shadow-md" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
                                `}>
                                {labels[type]}
                            </button>
                        );
                    })}
            </div>

            <Divider />
            <List
                className="w-full"
                itemLayout="horizontal"
                dataSource={notifications}
                renderItem={(item) => {
                    const bgClass = item.isRead ? "bg-white" : "bg-blue-50";
                    const textClass = item.isRead ? "font-normal" : "font-semibold";
                    return (
                        <List.Item
                            className={`${bgClass} rounded-lg mb-2`}
                            style={{
                                cursor: "pointer",
                                transition: "background-color 0.2s",
                                padding: "12px",
                            }}
                            onClick={() => handleOnItemSelect(item.itemId)}
                            onMouseEnter={(e) => {
                                if (item.isRead) e.currentTarget.style.backgroundColor = "#f5f5f5";
                            }}
                            onMouseLeave={(e) => {
                                if (item.isRead) e.currentTarget.style.backgroundColor = "white";
                            }}
                            actions={[
                                <Tooltip key="open" title="Open details" placement="top">
                                    <Button
                                        type="text"
                                        onClick={(e) => handleOpenIcon(e, item.itemId)}
                                        icon={<ArrowRightOutlined />}
                                        aria-label="Open notification details"
                                        style={{ minWidth: 44, minHeight: 44, padding: 8, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                                    />
                                </Tooltip>,
                            ]}
                        >
                            <List.Item.Meta
                                avatar={
                                    <div className="relative">
                                        {!item.isRead && (
                                            <span className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded-full"></span>
                                        )}
                                        <Avatar style={{ backgroundColor: "#87d068" }} size={50}>
                                            {item.message.charAt(0)}
                                        </Avatar>
                                    </div>
                                }
                                title={
                                    <div className="flex justify-between items-start w-full gap-4" 
                                        style={{ marginTop: 10, display: "inline-flex"}}
                                    >
                                        <span
                                            className={`
                                                ${textClass}
                                                line-clamp-2 
                                                md:line-clamp-none 
                                                text-[15px]
                                                max-w-[200px] 
                                                sm:max-w-[300px] 
                                                md:max-w-full
                                            `}
                                        >
                                            {item.message}
                                        </span>
                                        <span className="text-gray-400 text-sm whitespace-nowrap mt-1">
                                            {formatRelativeTime(item.createdAt)}
                                        </span>
                                    </div>
                                }
                                description=""
                            />
                        </List.Item>
                    );
                }}
            />
        </div>
    );
}
