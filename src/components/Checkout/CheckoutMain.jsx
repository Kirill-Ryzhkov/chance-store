import React, { useEffect, useRef, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from 'react-redux';
import Button from "../common/Button";
import ProductTitle from "../common/ProductTitle";
import MerchForm from "./MerchForm";
import { useCreateMerchOrderMutation } from "../../services/redux/apiSlice";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_TEST_KEY);

export default function CheckoutMain ({ cart, transaction, page }) {
    const [createMerchOrder] = useCreateMerchOrderMutation();

    const theme = useSelector((state) => state.theme.theme);
    const paymentElementRef = useRef(null);
    const stripeRef = useRef(null);
    const elementsRef = useRef(null);

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: ""
    });

    const [errors, setErrors] = useState({});

    const [isLoading, setIsLoading] = useState(false);

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
        if (isLoading) return;

        setIsLoading(true);

        if (!stripeRef.current || !elementsRef.current) {
            console.error("Stripe or Elements not initialized");
            return;
        }

        if (page === "merch") {
            const newErrors = {};
            Object.entries(formData).forEach(([key, value]) => {
                if (!value.trim()) {
                    newErrors[key] = "This field is required.";
                }
            });
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (formData.email && !emailRegex.test(formData.email)) {
                newErrors.email = "Please enter a valid email address.";
            }
            const phoneRegex = /^[0-9]{10,15}$/;
            if (formData.phone && !phoneRegex.test(formData.phone)) {
                newErrors.phone = "Phone must contain 10-15 digits.";
            }
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                const firstErrorField = Object.keys(newErrors)[0];
                const fieldElement = document.getElementById(firstErrorField);
                if (fieldElement) {
                    fieldElement.scrollIntoView({ behavior: "smooth", block: "center" });
                    fieldElement.focus();
                }
                setIsLoading(false);
                return;
            }
            await createMerchOrder({
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                phone: formData.phone,
                intent_id: transaction.paymentIntentId
            });
            setErrors({});
        }

        try {
            const { error } = await stripeRef.current.confirmPayment({
                elements: elementsRef.current,
                confirmParams: {
                    return_url: 'https://thechance.xyz/final',
                    // return_url: 'http://localhost:3000/final',
                },
            });

            if (error) {
                setIsLoading(false);
                console.error("Payment failed:", error.message);
            }
        } catch (err) {
            setIsLoading(false);
            console.error("Unexpected error:", err);
        }
    }

    return (
        <div className="min-h-svh w-full flex justify-center">
            {isLoading && 
                <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center"></div>
            }
            <div className="md:w-4/5 w-full h-full shadow-lg">
                <ProductTitle page={"checkout"} />
                <div className="md:px-10 px-6 mt-3 pb-12 space-y-6 md:space-y-0">
                    {page === "merch" && 
                        <MerchForm 
                            formData={formData} 
                            setFormData={setFormData}
                            errors={errors} 
                        />}
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
                            disabled={isLoading}
                            isLoading={isLoading} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}