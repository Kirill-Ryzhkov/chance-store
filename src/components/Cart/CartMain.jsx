import React, { useState, useEffect } from "react";
import CartTable from "./CartTable";
import CartTileMobile from "./CartTileMobile";
import Button from "../common/Button";
import ProductTitle from "../common/ProductTitle";
import UnderLine from "../common/UnderLine";
import EmptyCart from "./EmptyCart";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiSlice } from "../../services/redux/apiSlice";

export default function CartMain({ cart, page, setCart }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  const { data } = useSelector(apiSlice.endpoints.getAllStore.select());

  let fields;
  if(page === "cafe") {
    fields = ['name', 'count', 'syrup', 'price', 'delete'];
  } else {
    fields = ['name', 'count', 'size', 'price', 'delete'];
  }

  const handleCheckout = () => {
    if(!data?.status?.open && page === "cafe"){
      return "Store is closed";
    } else {
      navigate(`/checkout/${page}`, { state: { cart } });
    }
  };

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
                fields={fields}
                setCart={setCart}
              />
            ))}
            <div className="sticky mt-2 bottom-2 right-0">
              <Button
                disabled={!data?.status?.open && page === "cafe"}
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
              fields={fields}
              cart={cart}
              setCart={setCart}
              page={page}
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
