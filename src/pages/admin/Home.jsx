import React from "react";
import LeftSidebar from "../../components/admin/Home/LeftSidebar";
import Main from "../../components/admin/Home/Main";

export default function Home({ page }) {
    return (
        <div className="bg-background min-h-screen text-colorPrimary flex">
            <LeftSidebar />
            <div className="flex-1 p-8">
                <Main name={page} />
            </div>
        </div>
    );
}