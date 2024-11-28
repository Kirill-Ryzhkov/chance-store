import { Link } from "react-router-dom";
import ProductTile from "./ProductTile";
import ProductTitle from "../common/ProductTitle";

export default function Product({ page, products }) {
  return (
    <div className="min-h-svh w-full flex justify-center">
      <div className="md:w-4/5 w-full h-full shadow-lg">
        <ProductTitle page={page} />
        <div className="p-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products?.items?.map((item, index) => (
            <Link key={index} to={`/${page}/${item.slug}`}>
              <ProductTile item={item} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
