import { useParams } from "react-router-dom";
import Card from "../components/ProductCard/Card";
import { apiSlice } from "../services/redux/apiSlice";
import { useSelector } from "react-redux";
import Loader from "../components/common/Loader";

export default function ProductCard({ page }) {
  const { slug } = useParams();

  const { data, isLoading, isError } = useSelector(apiSlice.endpoints.getAllStore.select());

  const product = data?.store?.filter((item) => item.slug === slug);
  let productFields;

  switch (product[0].type) {
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
