import React from "react";
import CartTileDesktop from "./CartTileDesktop";

export default function CartTable ({ fields, cart, setCart }) {

    return (
        <table className="table-auto w-full bg-backgound text-colorPrimary h-full shadow-lg">
            <thead className="uppercase text-lg">
                <tr>
                    {fields.map((field, index) => (
                        <th key={index} className="py-3 px-1 text-center border-b border-backgroundDiff">
                            {field}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="text-colorPrimary text-center text-md">
                {cart.map((item, index) => (
                    <CartTileDesktop
                        key={index}
                        item={item}
                        index={index}
                        setCart={setCart}
                    />
                ))}
                
            </tbody>
        </table>
    );
}