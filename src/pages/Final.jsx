import React, { useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import { useGetStoreTransactionConfirmMutation } from "../services/redux/apiSlice";

export default function Final () {
    const [urlParams, setUrlParams] = useSearchParams();
    const paymentIntentId = urlParams.get('payment_intent');
    const [getStoreTransactionConfirm, { data, isLoading, isError }] =
        useGetStoreTransactionConfirmMutation();

    useEffect(() => {
        getStoreTransactionConfirm({ paymentIntentId });
    }, [paymentIntentId, getStoreTransactionConfirm]);

    return (
        <div className="min-h-svh w-full flex justify-center">
            <div className="md:w-4/5 w-full h-full shadow-lg">
                { data?.success ? "Payment was successful" : "Payment diclined" }
            </div>
        </div>
    );
}