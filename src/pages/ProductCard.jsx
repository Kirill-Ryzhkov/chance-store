import React, { useEffect } from 'react'; 
import { useParams } from "react-router-dom";
import Card from "../components/ProductCard/Card";
import { apiSlice, useLazyGetAllStoreQuery } from "../services/redux/apiSlice";
import { useSelector } from "react-redux";
import Loader from "../components/common/Loader";

export default function ProductCard({ page }) {
  const { slug } = useParams();

  const cachedData = useSelector(apiSlice.endpoints.getAllStore.select());
  const [trigger, { data: queryData, isLoading, isError }] = useLazyGetAllStoreQuery();

  useEffect(() => {
    if (!cachedData) {
      trigger()
        .unwrap()
        .then((result) => console.log("Query success:", result))
        .catch((error) => console.error("Query failed:", error));
    } 
  }, [cachedData, trigger]);

  const data = cachedData.data || queryData;

  const product = data?.store?.filter((item) => item.slug === slug);

  if(!product) {
    return <Loader />;
  }

  let productFields;

  switch (product[0]?.type) {
    case "cafe":
      productFields = data?.storeCafeFields;
      break;
    case "merch":
      productFields = data?.storeMerchFields;
      break;
    default:
      productFields = [];
      break;
  }

  let fields;
  if (productFields.length > 0 && product[0].type === 'merch') {
    fields = productFields.filter(item => item.slug === slug);
  } else {
    fields = productFields;
  }

  const productData = {
    item: product,
    fields,
    open: data?.status?.open
  };

  if (isLoading) return <Loader />;
  if (isError) return <div>Error loading product</div>;

  return (
    <div className="bg-background min-h-screen text-colorPrimary flex">
      <Card page={page} product={productData} />
    </div>
  );
}
