import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Header from "../components/common/Header";
import Card from "../components/ProductCard/Card";

export default function ProductCard ({ page }) {

    const { slug } = useParams();

    const data = useFetch(`/store/single/${page}/${slug}`);

    return (
        <div className="bg-background min-h-screen text-colorPrimary flex">
            <Header page={page} />
            <Card page={page} product={data} />
        </div>
    )

}