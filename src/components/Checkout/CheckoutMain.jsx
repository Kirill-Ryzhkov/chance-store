import React, { useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from 'react-redux';
import Button from "../common/Button";
import ProductTitle from "../common/ProductTitle";

const APP_URL = process.env.REACT_APP_ORIGINAL_URL;

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_TEST_KEY);

export default function CheckoutMain ({ cart, transaction }) {
    const theme = useSelector((state) => state.theme.theme);
    const paymentElementRef = useRef(null);
    const stripeRef = useRef(null);
    const elementsRef = useRef(null);

    useEffect(() => {
        
        const initialize = async () => {
            if (!transaction) {
                console.log("Transaction not loaded yet");
                return;
            }
    
            if (!transaction.clientSecret) {
                console.error("Missing clientSecret");
                return;
            }
    
            const stripe = await stripePromise;
            stripeRef.current = stripe

            const elements = stripe.elements({
                clientSecret: transaction?.clientSecret,
                appearance: {
                    theme: theme === "light" ? "flat" : "night"
                }
            });
            elementsRef.current = elements;

            const paymentElement = elements.create("payment");
            paymentElement.mount(paymentElementRef.current);
        };

        initialize();
    }, [transaction, theme]);

    const handlePaymentClick = async () => {
    
        if (!stripeRef.current || !elementsRef.current) {
            console.error("Stripe or Elements not initialized");
            return;
        }
        try {
            const { error } = await stripeRef.current.confirmPayment({
                elements: elementsRef.current,
                confirmParams: {
                    return_url: `${APP_URL}/final`,
                },
            });

            if (error) {
                console.error("Payment failed:", error.message);
            }
        } catch (err) {
            console.error("Unexpected error:", err);
        }
    }

    return (
        <div className="min-h-svh w-full flex justify-center">
            <div className="md:w-4/5 w-full h-full shadow-lg">
                <ProductTitle page={"checkout"} />
                <div className="md:px-10 px-6 mt-3 pb-12 space-y-6 md:space-y-0">
                <div className="mb-4">
                    {cart.map((item, index) => {
                    const extraFields = Object.keys(item)
                        .filter((key) => !['name', 'count', 'price'].includes(key) && item[key] !== 'none') 
                        .map((key) => item[key])
                        .join(', ');

                    return (
                        <p className="regular-not-bold-font text-2xl" key={index}>
                            {index + 1}. {item.name}
                            {extraFields ? `, ${extraFields}` : ''}
                            ({item.count} x ${item.price})
                            {index < cart.length - 1 ? ', ' : ''}
                        </p>
                    );
                    })}
                    <hr className="mt-2 border-dashed border-1 border-colorPrimary" />
                    <h3 className="mt-2 regular-not-bold-font text-2xl text-right">
                        Total: ${transaction?.total.toFixed(2)}
                    </h3>
                </div>
                    
                
                    <div ref={paymentElementRef} id="payment-element"></div>
                    <div className="mt-4">
                        <Button
                            onClick={handlePaymentClick}
                            text={"Make Payment"}
                            color={"bg-green-500"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}