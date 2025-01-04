import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";

export default function CartTileDesktop({ item, fields, index, setCart, page }) {
  // const [count, setCount] = useState(item.count);

  const cart = JSON.parse(localStorage.getItem(`cart_${page}`));

  // const updateLocalStorage = (newCount) => {
  //   const updatedCart = [...cart];
  //   updatedCart[index].count = newCount;
  //   localStorage.setItem(`cart_${page}`, JSON.stringify(updatedCart));
  //   setCart(updatedCart);
  // };

  // const increment = () => {
  //   const newCount = count + 1;
  //   setCount(newCount);
  //   updateLocalStorage(newCount);
  // };

  // const decrement = () => {
  //   if (count > 1) {
  //     const newCount = count - 1;
  //     setCount(newCount);
  //     updateLocalStorage(newCount);
  //   }
  // };

  const handleDelete = () => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    localStorage.setItem(`cart_${page}`, JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  return (
    <tr className="border-b border-backgroundDiff">
      {fields?.map((field, indexField) => (
        <td key={indexField} className="py-3 px-1">
          {field === "price" ? (
            `$${item[field]?.toFixed(2) || "0.00"}`
          ) : field === "delete" ? (
            <button onClick={() => handleDelete(item)}>
              <RiDeleteBinLine size={25} />
            </button>
          ) : (
            item[field] || "-"
          )}
        </td>
      ))}
    </tr>
  );
}
