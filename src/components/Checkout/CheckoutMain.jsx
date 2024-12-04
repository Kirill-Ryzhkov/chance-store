import React, { useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Button from "../common/Button";

const APP_URL = process.env.REACT_APP_ORIGINAL_URL;

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_TEST_KEY);

export default function CheckoutMain ({ cart, transaction }) {
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
                    theme: 'flat',
                },
            });
            elementsRef.current = elements;

            const paymentElement = elements.create("payment");
            paymentElement.mount(paymentElementRef.current);
        };

        initialize();
    }, [transaction]);

    const handlePaymentClick = async () => {
        console.log(`${APP_URL}/final`);
        
        if (!stripeRef.current || !elementsRef.current) {
            console.error("Stripe or Elements not initialized");
            return;
        }
        try {
            const { error } = await stripeRef.current.confirmPayment({
                elements: elementsRef.current,
                confirmParams: {
                    return_url: `https://thechance.xyz/final`,
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
                <div className="">
                    <div className="order-summary">
                        <h2>Order Summary</h2>
                        {cart.map((item, index) => (
                            <div key={index}>
                                <p>{item.name}</p>
                                <p>{item.type}</p>
                                <p>{item.syrup}</p>
                                <p> {item.addon}</p>

                                <p>
                                {item.count} x ${item.price}
                                </p>
                                <p>-------------</p>
                            </div>
                        ))}

                        <h3>Total: ${transaction?.total.toFixed(2)}</h3>
                    </div>
                </div>

                
                <div ref={paymentElementRef} id="payment-element"></div>
                <Button
                    onClick={handlePaymentClick}
                    text={"Make Payment"}
                    color={"bg-green-500"}
                />
            </div>
        </div>
    );
}