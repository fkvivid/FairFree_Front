import { Divider, Form, Input, InputNumber, Switch, Button, message, Upload } from "antd";
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { InventoryService } from "../services/InventoryService";
import { useNavigate } from "react-router";

export function ProductFormPage() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [locationLoading, setLocationLoading] = useState<boolean>(false);
    const [imageFiles, setImageFiles] = useState<Map<string, File>>(new Map());
    const navigate = useNavigate();

    const onSubmit = async (values: any) => {
        try {
            if (imageFiles.size === 0) {
                message.error("Please uploat at least one image");
                return;
            }
            if (loading) return;
            setLoading(true);

            // Create FormData
            const formData = new FormData();

            // Append form fields
            formData.append(
                "itemToBeAddedString",
                JSON.stringify({
                    title: values.title,
                    description: values.description,
                    quantity: values.quantity,
                    location: values.location,
                    neverExpires: values.neverExpires,
                    expiresAfterDays: values.expiresAfterDays,
                }),
            );

            formData.append("Content-Type", "application/json");

            // Append image files
            imageFiles.forEach((file) => {
                formData.append("images", file);
            });

            const response = await InventoryService.donate(formData);
            if (response.status === 201) {
                message.success("Successfully created!");
                form.resetFields();
                setImageFiles(new Map());
                navigate("/inventory");
            }
        } catch (error: any) {
            message.error(error?.response?.data?.message || error.toString());
            console.log("ERROR:", error);
        } finally {
            setLoading(false);
        }
    };

    const fillLocationAutomatically = () => {
        if (!navigator.geolocation) {
            message.error("Geolocation is not supported by your browser.");
            return;
        }

        setLocationLoading(true);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                // Fill top-level coordinates (for validation) and nested location
                // fields after reverse-geocoding.
                // Try reverse geocoding to extract address components.
                fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`)
                    .then((res) => res.json())
                    .then((data) => {
                        const display = data?.display_name || "";
                        const addr = data?.address || {};
                        const city = addr.city || addr.town || addr.village || "";
                        const state = addr.state || "";
                        const country = addr.country || "";

                        form.setFieldsValue({
                            // nested location object
                            location: {
                                address: display,
                                city,
                                state,
                                country,
                                latitude,
                                longitude,
                            },
                        });
                        message.success("Location auto-filled!");
                    })
                    .catch(() => {
                        // fallback: set coords only
                        form.setFieldsValue({
                            location: { address: "", city: "", state: "", country: "", latitude, longitude },
                            latitude,
                            longitude,
                        });
                        message.warning("Unable to auto-detect address components; coordinates were filled.");
                    })
                    .finally(() => setLocationLoading(false));
            },
            () => {
                setLocationLoading(false);
                message.error("Permission denied. Cannot fill location automatically.");
            },
        );
    };

    return (
        <div className="w-full items-center flex flex-col p-8 gap-3 pb-20">
            <div className="flex justify-between w-full items-center">
                <div onClick={() => window.history.back()}>
                    <ArrowLeftOutlined />
                </div>
                <h3 className="font-bold text-xl">Add donation</h3>
                <div></div>
            </div>
            <Divider />

            <Form
                form={form}
                className="w-full"
                layout="vertical"
                onFinish={onSubmit}
                initialValues={{
                    title: "",
                    description: "",
                    location: {
                        address: "Iowa, USA",
                        city: "Fairfield",
                        state: "IA",
                        country: "USA",
                        latitude: 41.7,
                        longitude: -93.0,
                    },
                    quantity: 1,
                    expiresAfterDays: 60,
                    neverExpires: false,
                }}
            >
                {/* Name */}
                <Form.Item name="title" label="Title" rules={[{ required: true, message: "Please input a title!" }]}>
                    <Input />
                </Form.Item>

                {/* Description */}
                <Form.Item name="description" label="Description" rules={[{ required: true, message: "Please input a description!" }]}>
                    <Input.TextArea rows={3} />
                </Form.Item>

                <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: "Please input a name!" }]}>
                    <InputNumber />
                </Form.Item>

                {/* Images */}
                <Form.Item label="Images" rules={[{ required: true, message: "Please upload at least one image!" }]}>
                    <Upload
                        multiple
                        accept="image/*"
                        maxCount={10}
                        listType="picture"
                        beforeUpload={(file) => {
                            setImageFiles((prev) => new Map(prev).set(file.name + file.size, file));
                            return false; // Prevent automatic upload
                        }}
                        onRemove={(file) => {
                            setImageFiles((prev) => {
                                const newMap = new Map(prev);
                                newMap.delete(file.name + file.size);
                                return newMap;
                            });
                        }}
                    >
                        <Button icon={<UploadOutlined />}>Upload Images (Max 10)</Button>
                    </Upload>
                </Form.Item>

                {/* Location fields */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Form.Item name={["location", "address"]} label="Address" rules={[{ required: true, message: "Please input an address!" }]}>
                        <Input placeholder="Street address / display name" />
                    </Form.Item>

                    <Form.Item name={["location", "city"]} label="City" rules={[{ required: true, message: "Please input a city!" }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name={["location", "state"]} label="State">
                        <Input />
                    </Form.Item>

                    <Form.Item name={["location", "country"]} label="Country" rules={[{ required: true, message: "Please input a country!" }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        hidden
                        name={["location", "latitude"]}
                        label="Latitude"
                        rules={[{ required: true, message: "Please input a country!" }]}
                    >
                        <InputNumber />
                    </Form.Item>

                    <Form.Item
                        hidden
                        name={["location", "longitude"]}
                        label="Longitude"
                        rules={[{ required: true, message: "Please input a country!" }]}
                    >
                        <InputNumber />
                    </Form.Item>

                    <div className="col-span-1 md:col-span-2 flex items-end mb-4">
                        <Button loading={locationLoading} onClick={fillLocationAutomatically}>
                            Use my location to fill location
                        </Button>
                    </div>
                </div>

                {/* Expiry */}
                <Form.Item name="neverExpires" label="Never Expires" valuePropName="checked">
                    <Switch
                        onChange={(checked) => {
                            if (checked) {
                                form.setFieldsValue({ expiresAfterDays: null });
                            } else {
                                form.setFieldsValue({ expiresAfterDays: 60 });
                            }
                        }}
                    />
                </Form.Item>

                <Form.Item shouldUpdate={(prev, curr) => prev.neverExpires !== curr.neverExpires} noStyle>
                    {({ getFieldValue }) =>
                        !getFieldValue("neverExpires") && (
                            <Form.Item
                                name="expiresAfterDays"
                                label="Expires After (Days)"
                                rules={[{ required: true, message: "Provide expiry days" }]}
                            >
                                <InputNumber min={1} className="w-full" />
                            </Form.Item>
                        )
                    }
                </Form.Item>

                <Form.Item>
                    <Button loading={loading} type="primary" htmlType="submit" className="w-full">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
