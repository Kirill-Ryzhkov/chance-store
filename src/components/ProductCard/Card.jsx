import ProductTitle from "../common/ProductTitle";
import CardBody from "./CardBody";
import Breadcrumbs from "../common/Breadcrumbs";

export default function Card ({ page, product }) {
    return (
        <div className="md:mt-28 mt-20 min-h-svh w-full flex justify-center">
            <div className="md:w-4/5 w-full h-full shadow-lg">
                <ProductTitle page={page} />
                <Breadcrumbs />
                <CardBody data={product} />
            </div>
        </div>
    )
}