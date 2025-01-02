import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import LeftSidebar from "../../components/admin/Home/LeftSidebar";
import EditMain from "../../components/admin/Form/EditMain";
import { apiSlice } from "../../services/redux/apiSlice";

export default function Edit({ type }) {

    const { name } = useParams();
    let product;

    const allStoreData = useSelector(apiSlice.endpoints.getAllStore.select());
    if (type === "store") {
        product = allStoreData?.data?.[type]?.find((item) => item.slug === name);
    } else if (type === "storeFields") {
        product = allStoreData?.data?.[type]?.find((item) => item.field_name === name);
    }

    return (
        <div className="bg-background min-h-screen text-colorPrimary flex">
            <LeftSidebar />
            <div className="flex-1 p-8">
                {product ? <EditMain product={product} type={type} /> : <div>Loading...</div>}
            </div>
        </div>
    );
}