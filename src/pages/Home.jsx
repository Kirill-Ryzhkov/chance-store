import React, { useEffect } from "react";
import Product from "../components/Home/Product";
import { useGetStoreMultipleMutation } from "../services/redux/apiSlice";
import Loader from "../components/common/Loader";

export default function Home({ page }) {
  const [getStoreMultiple, { data, isLoading, isError }] =
    useGetStoreMultipleMutation();

  useEffect(() => {
    getStoreMultiple({ type: page });
  }, [page, getStoreMultiple]);

  if (isLoading)
    return (
      <div>
        <Loader />;
      </div>
    );
  if (isError) return <div>Error loading products</div>;
  if (!data || !data.items) return <div>No products found</div>;

  return (
    <div className="bg-background min-h-screen text-colorPrimary flex">
      <Product page={page} products={data} />
    </div>
  );
}
