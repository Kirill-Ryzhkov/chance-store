import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import NotFound from "../components/common/NotFound";
import CartMain from "../components/Cart/CartMain";

export default function Cart() {
  const [notFound, setNotFound] = useState(false);

  const { page } = useParams();

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem(`cart_${page}`)) ?? []
  );

  useEffect(() => {
    if (page !== "cafe" && page !== "merch") {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
  }, [page]);

  return (
    <div className="bg-background min-h-screen text-colorPrimary flex">
      {notFound ? (
        <NotFound />
      ) : (
        <CartMain cart={cart} page={page} setCart={setCart} />
      )}
    </div>
  );
}
