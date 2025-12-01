import { List, Avatar, Divider } from "antd";

const notifications = [
    {
        fullName: "John",
        title: "Started following you",
    },
    {
        fullName: "John",
        title: "Started following you",
    },
    {
        fullName: "John",
        title: "Started following you",
    },
    {
        fullName: "John",
        title: "Started following you",
    },
];
export function NotificationPage() {
    return (
        <div className="w-full flex flex-col p-8">
            <h2 className="font-bold text-2xl">Activity</h2>
            <Divider />
            <List
                className="w-full"
                itemLayout="horizontal"
                dataSource={notifications}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={
                                <Avatar style={{ backgroundColor: "#87d068" }} size={50}>
                                    {item.fullName.charAt(0)}{" "}
                                </Avatar>
                            }
                            title={item.fullName}
                            description={item.title}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
}
