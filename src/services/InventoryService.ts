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
    getAvailableItems: (): Promise<AxiosResponse<any>> => {
        return service({
            url: "/api/v1/items/available",
            method: "get",
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
    claimItem: (itemId: number): Promise<AxiosResponse<any>> => {
        return service({
            url: `/api/v1/items/${itemId}/claim`,
            method: "post",
        });
    },
    cancelClaim: (claimId: number): Promise<AxiosResponse<any>> => {
        return service({
            url: `/api/v1/items/cancel/claims/${claimId}`,
            method: "post",
        });
    },
    approveClaim: (claimId: number): Promise<AxiosResponse<any>> => {
        return service({
            url: `/api/v1/items/approve/claims/${claimId}`,
            method: "post",
        });
    },
    deleteItem: (itemId: number): Promise<AxiosResponse<any>> => {
        return service({
            url: `/api/v1/items/${itemId}`,
            method: "delete",
        });
    },
};
