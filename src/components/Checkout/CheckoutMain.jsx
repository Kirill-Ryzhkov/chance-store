import React, { useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_TEST_KEY);

export default function CheckoutMain ({ cart, transaction }) {
    const checkoutRef = useRef(null);

    useEffect(() => {
        const initialize = async () => {
            if (!transaction?.clientSecret) {
                console.error("Missing clientSecret");
                return;
            }

            const stripe = await stripePromise;

            const elements = stripe.elements({
                clientSecret: transaction?.clientSecret, 
                appearance: {
                    theme: 'flat',
                },
            });

            const paymentRequest = stripe.paymentRequest({
                country: 'US',
                currency: 'usd',
                total: {
                    label: 'Total',
                    amount: transaction.total * 100
                },
                requestPayerName: true,
                requestPayerEmail: true,
            });

            paymentRequest.canMakePayment().then((result) => {
                if (result) {
                    const prButton = elements.create('paymentRequestButton', {
                        paymentRequest,
                    });
                    prButton.mount(checkoutRef.current);
                } else {
                    checkoutRef.current.style.display = 'none';
                }
            });
        

            if (checkoutRef.current) {
                paymentRequest.on('paymentmethod', async (ev) => {
                    const { error } = await stripe.confirmPayment({
                        elements,
                        confirmParams: {
                            return_url: 'http://localhost:3000/final',
                        },
                        redirect: 'if_required',
                    });
            
                    if (error) {
                        ev.complete('fail');
                        console.error(error);
                    } else {
                        ev.complete('success');
                        window.location.href = 'http://localhost:3000/final';
                    }
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

                <div ref={checkoutRef} id="payment-request-button"></div>
            </div>
        </div>
    );
}