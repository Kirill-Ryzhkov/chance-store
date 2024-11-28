import React, { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import ProductCounter from "../ProductCard/ProductCounter";

export default function CartTileDesktop({ item, fields, index, setCart }) {
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
    <tr className="border-b border-backgroundDiff">
      <td className="py-3 px-1">{item.name}</td>
      <div className="pb-2 flex justify-center items-center space-x-2">
        <ProductCounter
          count={count}
          increment={increment}
          decrement={decrement}
        />
      </div>

      {fields?.map((field, indexField) => (
        <td key={indexField} className="py-3 px-1">
          {item[field] || "-"}
        </td>
      ))}
      <td className="py-3 px-1 font-bold">
        ${(item.count * item.price).toFixed(2)}
      </td>
      <td className="py-3 px-1 flex justify-center">
        <button>
          <RiDeleteBinLine onClick={handleDelete} size={25} />
        </button>
      </td>
    </tr>
  );
}
