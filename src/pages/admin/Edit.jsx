import React from "react";
import { useParams } from "react-router-dom";
import LeftSidebar from "../../components/admin/Home/LeftSidebar";
import EditMain from "../../components/admin/Form/EditMain";

export default function Edit({ type, all }) {

    const { name } = useParams();

    const product = all?.[type].filter((item) => item.slug === name)[0];

    return (
        <div className="bg-background min-h-screen text-colorPrimary flex">
            <LeftSidebar />
            <div className="flex-1 p-8">
                <EditMain product={product}/>
            </div>
        </div>
    );
}