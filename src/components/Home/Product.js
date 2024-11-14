import { Link } from "react-router-dom";
import ProductTile from "./ProductTile";
import ProductTitle from "../common/ProductTitle";
import CappuccinoImage from "../../assets/images/cappuccino.webp";
import LatteImage from "../../assets/images/latte.webp";


export default function Product ({ page }) {

    const productList = [
        {
            name: "Cappuccino",
            price: 3.00,
            description: "Cappuccino is the best",
            image: CappuccinoImage
        },
        {
            name: "Latte",
            price: 3.50,
            description: "Latte is the best",
            image: LatteImage
        }
    ];

    return (
        <div className="md:mt-28 mt-20 min-h-svh w-full flex justify-center">
            <div className="md:w-4/5 w-full h-full shadow-lg">
                <ProductTitle page={page} />
                <div className="p-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {productList.map((item, index) => (
                        <Link key={index} to={item.name.toLowerCase()}>
                            <ProductTile item={item}/>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}