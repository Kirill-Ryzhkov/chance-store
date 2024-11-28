import React, { useEffect } from "react";
import Product from "../components/Home/Product";
import { useGetStoreMultipleMutation } from "../services/redux/apiSlice";

export default function Home({ page }) {
  const [getStoreMultiple, { data, isLoading, isError }] =
    useGetStoreMultipleMutation();

  useEffect(() => {
    getStoreMultiple({ type: page });
  }, [page, getStoreMultiple]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  return (
    <div className="bg-background min-h-screen text-colorPrimary flex">
      <Product page={page} products={data} />
    </div>
  );
}
