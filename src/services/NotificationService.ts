import type { AxiosResponse } from "axios";
import { service } from "./fetchInterceptor";

export const NotificationService = {
    getAllMyUnreadNotifications: (data: any): Promise<AxiosResponse<any>> => {
        return service({
            url: "/api/v1/notifications/me",
            method: "get",
            data: data,
        });
    },

    markAllMyNotificationAsRead: (data: any): Promise<AxiosResponse<any>> => {
        return service({
            url: "/api/v1/notifications/mark-read",
            method: "put",
            data: data,
        });
    }
};