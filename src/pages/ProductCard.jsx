import { useParams } from "react-router-dom";
import Card from "../components/ProductCard/Card";
import { useGetStoreSingleQuery } from "../services/redux/apiSlice";
import Loader from "../components/common/Loader";

export default function ProductCard({ page }) {
  const { slug } = useParams();

  const { data, isLoading, isError } = useGetStoreSingleQuery({ page, slug });

  if (isLoading) return <Loader />;
  if (isError) return <div>Error loading product</div>;

  return (
    <div className="bg-background min-h-screen text-colorPrimary flex">
      <Card page={page} product={data} />
    </div>
  );
}
