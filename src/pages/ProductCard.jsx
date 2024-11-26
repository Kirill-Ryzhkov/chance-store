import { useParams } from "react-router-dom";
import Header from "../components/common/Header";
import Card from "../components/ProductCard/Card";
import { useGetStoreSingleQuery } from "../services/redux/apiSlice";

export default function ProductCard({ page }) {
  const { slug } = useParams();

  const { data, isLoading, isError } = useGetStoreSingleQuery({ page, slug });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading product</div>;

  return (
    <div className="bg-background min-h-screen text-colorPrimary flex">
      <Header page={page} />
      <Card page={page} product={data} />
    </div>
  );
}
