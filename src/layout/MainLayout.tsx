import React from "react";
import type { ReactNode } from "react";
import { MainFooter } from "./MainFooter";

interface MainLayoutProps {
    children?: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="h-screen flex flex-col justify-between ">
            {/* <MainHeader /> */}
            <div className="h-full ">{children}</div>
            <MainFooter />
        </div>
    );
};
