import React from "react";
import LeftSidebar from "../../components/admin/Home/LeftSidebar";
import CreateMain from "../../components/admin/Form/CreateMain";

export default function Create({ type, all }) {
    const product = all?.[type][0];

    return (
        <div className="bg-background min-h-screen text-colorPrimary flex">
            <LeftSidebar />
            <div className="flex-1 p-8">
                <CreateMain product={product}/>
            </div>
        </div>
    );
}