import { ReactNode } from "react";
import SideNavBar from "../components/navbar/side-navbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {

    return (
        <div className="min-h-screen w-full flex flex-row  mx-4 md:container">
            <SideNavBar />
            {
                children
            }
        </div>
    )

}