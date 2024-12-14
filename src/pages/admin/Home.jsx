import React from "react";
import LeftSidebar from "../../components/admin/Home/LeftSidebar";
import Main from "../../components/admin/Home/Main";

export default function Home({ all, page }) {

    const items = all?.store.filter(item => item.type === page);
    const fields = all?.storeFields.filter(item => item.type === page);

    return (
        <div className="bg-background min-h-screen text-colorPrimary flex">
            <LeftSidebar />
            <div className="flex-1 p-8">
                <Main name={page} items={items} fields={fields} />
            </div>
        </div>
    );
}