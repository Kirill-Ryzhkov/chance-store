import React from "react";
import Product from "../components/Home/Product";
import { apiSlice } from "../services/redux/apiSlice";
import { useSelector } from "react-redux";
import Loader from "../components/common/Loader";

export default function Home({ page }) {
  const { data, isLoading, isError } = useSelector(apiSlice.endpoints.getAllStore.select());

  let dataFilter;
  if(page === "cafe") {
    dataFilter = data?.store?.filter((item) => item.type === page || item.type === "tea");
  } else {
    dataFilter = data?.store?.filter((item) => item.type === page);
  }

  if (isLoading)
    return (
      <div>
        <Loader />;
      </div>
    );
  if (isError) return <div>Error loading products</div>;
  if (!data || !data.store) return <div>No products found</div>;

  return (
    <div className="bg-background min-h-screen text-colorPrimary flex">
      <Product page={page} products={dataFilter} />
    </div>
  );
}
