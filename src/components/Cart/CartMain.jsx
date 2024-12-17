import React, { useState, useEffect } from "react";
import CartTable from "./CartTable";
import CartTileMobile from "./CartTileMobile";
import Button from "../common/Button";
import ProductTitle from "../common/ProductTitle";
import UnderLine from "../common/UnderLine";
import EmptyCart from "./EmptyCart";
import { useGetStoreFieldsQuery } from "../../services/redux/apiSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../common/Loader";

export default function CartMain({ cart, page, setCart }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  const { data: cafeFields, isLoading, isError } = useGetStoreFieldsQuery(page);
  const handleCheckout = () => {
    navigate(`/checkout/${page}`, { state: { cart } });
  };

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) return <Loader />;
  if (isError) return <div>Error loading data</div>;

  return (
    <div className="w-full flex justify-center h-fit">
      {cart.length > 0 ? (
        screenWidth < 768 ? (
          <div className="flex flex-col w-full space-y-4 px-4">
            <div className="title-font text-5xl pt-5">CART</div>
            <UnderLine />
            {cart.map((item, index) => (
              <CartTileMobile
                key={index}
                item={item}
                index={index}
                fields={cafeFields?.fields}
                setCart={setCart}
              />
            ))}
            <div className="sticky mt-2 bottom-2 right-0">
              <Button
                onClick={handleCheckout}
                text={"Checkout"}
                color={"bg-green-500"}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-4/5">
            <ProductTitle page={"Cart"} />
            <CartTable
              fields={cafeFields?.fields}
              cart={cart}
              setCart={setCart}
            />
            <div className="w-full mt-4 sticky mt-2 bottom-2 right-0">
              <Button
                onClick={handleCheckout}
                text={"Checkout"}
                color={"bg-green-500"}
              />
            </div>
          </div>
        )
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}
