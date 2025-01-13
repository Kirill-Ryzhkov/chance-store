import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetStoreTransactionConfirmMutation, apiSlice } from "../services/redux/apiSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../components/common/Loader";

export default function Final() {
  const [urlParams] = useSearchParams();
  const paymentIntentId = urlParams.get("payment_intent");
  const [getStoreTransactionConfirm, { data, isLoading, isError }] =
    useGetStoreTransactionConfirmMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    getStoreTransactionConfirm({ paymentIntentId });
  }, [paymentIntentId, getStoreTransactionConfirm]);

  useEffect(() => {
    dispatch(apiSlice.util.invalidateTags([{ type: 'StoreMerchField', id: 'LIST' }]));
  }, [dispatch]);

  if (isLoading) return <Loader />;
  if (isError && !data?.success) return <div>Payment declined</div>;

  return (
    <div className="bg-background min-h-screen text-colorPrimary flex">
      <div className="min-h-svh w-full flex justify-center">
        <div className="md:w-4/5 w-full h-full shadow-lg">
          <div className="flex flex-col items-center justify-center text-center w-full mt-6">
            <h1 className="md:text-7xl text-5xl regular-bold-font">
              Thanks for your order
            </h1>
            <p className="md:text-5xl text-3xl regular-bold-font mt-4">
              Your order number is {data?.order_number}
            </p>
            <Link
              to="/"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
