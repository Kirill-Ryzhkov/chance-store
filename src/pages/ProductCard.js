import { useParams } from "react-router-dom";
import Header from "../components/common/Header";
import Card from "../components/ProductCard/Card";

export default function ProductCard ({ page }) {

    const { name } = useParams();

    return (
        <div className="bg-background min-h-screen text-colorPrimary flex">
            <Header page={page} />
            <Card page={page} product={name} />
        </div>
    )

}