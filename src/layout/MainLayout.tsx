import React from "react";
import type { ReactNode } from "react";
import { MainFooter } from "./MainFooter";

interface MainLayoutProps {
    children?: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="h-screen flex flex-col overflow-hidden bg-white">
            
            {/* Scrollable content with padding */}
            <div className="flex-1 overflow-auto px-5 pt-4 pb-24">
                {children}
            </div>

            {/* Fixed footer on the page*/}
            <MainFooter />
        </div>
    );
};
