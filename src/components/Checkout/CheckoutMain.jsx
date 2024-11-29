import React, { useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_TEST_KEY);
const API_URL = process.env.REACT_APP_API_URL;

export default function CheckoutMain ({ cart, transaction }) {
    const checkoutRef = useRef(null);

    useEffect(() => {
        const initialize = async () => {
            if (!transaction?.clientSecret || !transaction?.paymentIntentId) {
                console.error("Missing transaction data: clientSecret or paymentIntentId");
                return;
            }

            const stripe = await stripePromise;

            const elements = stripe.elements({
                clientSecret: transaction?.clientSecret, 
                appearance: {
                    theme: 'flat',
                },
            });
            if (checkoutRef.current) {
                const expressCheckoutElement = elements.create('expressCheckout');
                expressCheckoutElement.mount(checkoutRef.current);
                expressCheckoutElement.on('confirm', function (event) {
                    stripe.confirmPayment({
                        elements,
                        clientSecret: transaction?.clientSecret,
                        confirmParams: {
                          return_url: 'http://localhost:3000/final',
                        },
                      })
                      .then(function(result) {
                        if (result.error) {
                          console.log(result.error);
                        }
                      });
                });
            }
        }
        initialize();
    }, [transaction])

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
                        <div>тутуту пупупу оплата</div>
                    </div>
                </div>

                <div ref={checkoutRef}></div>
            </div>
        </div>
    );
}