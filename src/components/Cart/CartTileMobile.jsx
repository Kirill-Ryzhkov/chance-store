import React, { useState } from "react";
import ProductCounter from "../ProductCard/ProductCounter";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function CartTileMobile({ item, index, fields, setCart }) {
    const excludedFields = ['name', 'count', 'price', 'delete'];
    const filteredFields = fields.filter(field => !excludedFields.includes(field));

    const [count, setCount] = useState(item.count);

    const cart = JSON.parse(localStorage.getItem(`cart_cafe`));

    const updateLocalStorage = (newCount) => {
        const updatedCart = [...cart];
        updatedCart[index].count = newCount;
        localStorage.setItem(`cart_cafe`, JSON.stringify(updatedCart));
        setCart(updatedCart);
    };

    const increment = () => {
        const newCount = count + 1;
        setCount(newCount);
        updateLocalStorage(newCount);
    };

    const decrement = () => {
        if (count > 1) {
            const newCount = count - 1;
            setCount(newCount);
            updateLocalStorage(newCount);
        }
    };

    const handleDelete = () => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        localStorage.setItem(`cart_cafe`, JSON.stringify(updatedCart));
        setCart(updatedCart);
    };

    return (
        <div className="relative w-full rounded-lg shadow-lg p-4 flex flex-col space-y-4 bg-background text-colorPrimary">   
            <div className="relative">
                <h3 className="font-bold text-lg text-colorPrimary">{item.name}</h3>
                    <p className="text-sm text-colorPrimary">{ filteredFields
                        .map(field => item[field])
                        .filter(value => value !== "none")
                        .join(' · ')
                    }</p>
                <button className="absolute top-0 right-0">
                    <RiDeleteBin5Line onClick={handleDelete} size={20} />
                </button>
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                        <ProductCounter count={count} increment={increment} decrement={decrement}/>
                    </div>
                    <span className="font-bold text-lg text-colorPrimary">${(item.price * count).toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
}