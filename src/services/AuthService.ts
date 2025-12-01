import type { AxiosResponse } from "axios";
import { service } from "./fetchInterceptor";

export const AuthService = {
    register: (data: any): Promise<AxiosResponse<any>> => {
        return service({
            url: "/api/v1/auth/register",
            method: "post",
            data: data,
        });
    },
    login: (data: any): Promise<AxiosResponse<any>> => {
        return service({
            url: "/api/v1/auth/login",
            method: "post",
            data: data,
        });
    },
};
