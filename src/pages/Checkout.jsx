import React, { useEffect, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import CheckoutMain from "../components/Checkout/CheckoutMain";
import { useGetStoreTransactionMutation } from "../services/redux/apiSlice";

export default function Checkout() {
  const location = useLocation();
  const cart = useMemo(() => location.state?.cart || [], [location.state?.cart]);
  const { page } = useParams();
  localStorage.setItem(`cart_${page}`, "[]");

  const [getStoreTransaction, { data, isLoading, isError }] =
    useGetStoreTransactionMutation();

  useEffect(() => {
    getStoreTransaction({ cart });
  }, [cart, getStoreTransaction]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  return (
    <div className="bg-background min-h-screen text-colorPrimary flex">
      <CheckoutMain cart={cart} transaction={data}/>
    </div>
  );
}
