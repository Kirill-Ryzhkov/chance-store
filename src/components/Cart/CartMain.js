import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import CartTable from "./CartTable";
import CartTileMobile from "./CartTileMobile";
import GreenButton from "../common/GreenButton";
import ProductTitle from "../common/ProductTitle";
import UnderLine from "../common/UnderLine";
import EmptyCart from "./EmptyCart";

export default function CartMain ({ cart, page, setCart }) {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const handleCheckout = () => {
        console.log("hello");
    };

    const cafeFields = useFetch(`/store/field/list/${page}`);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="md:mt-28 mt-20 w-full flex justify-center h-fit">
            {cart.length > 0 ? (
                screenWidth < 768 ? (
                    <div className="flex flex-col w-full space-y-4 px-4">
                        <div className="title-font text-5xl pt-5">CART</div>
                        <UnderLine />
                        {cart.map((item, index) => (
                            <CartTileMobile key={index} item={item} index={index} setCart={setCart}/>
                        ))}
                        <GreenButton onClick={handleCheckout} text={"Checkout"} />
                    </div>
                ) : (
                    <div className="flex flex-col w-4/5">
                        <ProductTitle page={"Cart"} />
                        <CartTable fields={cafeFields?.fields} cart={cart} setCart={setCart}/>
                        <div className="w-full mt-4">
                            <GreenButton onClick={handleCheckout} text={"Checkout"} />
                        </div>
                    </div>
                )
            ) : (
                <EmptyCart />
            )}
        </div>
    );
}