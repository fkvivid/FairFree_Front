import type { AxiosResponse } from "axios";
import { service } from "./fetchInterceptor";

export const InventoryService = {
    donate: (data: any): Promise<AxiosResponse<any>> => {
        return service({
            url: "/api/v1/items",
            method: "post",
            data: data,
            headers: data instanceof FormData ? { "Content-Type": "multipart/form-data" } : {},
        });
    },
    getMyItems: (): Promise<AxiosResponse<any>> => {
        return service({
            url: "/api/v1/items/my-items",
            method: "get",
        });
    },
    getItem: (id: string): Promise<AxiosResponse<any>> => {
        return service({
            url: `/api/v1/items/${id}`,
            method: "get",
        });
    },
};
