import React, { useState, useRef } from 'react';
import ProductCounter from './ProductCounter';
import UnderLine from '../common/UnderLine';
import CardMain from './CardMain';
import GreenButton from '../common/GreenButton';
import ExtraField from './ExtraField';

export default function CardBody ({ data }) {
    const [errorFields, setErrorFields] = useState({});

    const [count, setCount] = useState(1);
    const increment = () => setCount(prevCount => prevCount + 1);
    const decrement = () => setCount(prevCount => (prevCount > 1 ? prevCount - 1 : 1));

    const [fieldList, setFieldList] = useState({});

    const [showNotification, setShowNotification] = useState(false);

    const fieldRefs = useRef({});

    const handleAddToCart = () => {
        const cartName = `cart_${data?.item?.type}`;

        const newErrorFields = {};
        let hasError = false;

        data?.fields.forEach((field) => {
            if (!fieldList[field.field_name]) {
                newErrorFields[field.field_name] = true;
                hasError = true;
            } else {
                newErrorFields[field.field_name] = false;
            }
        });

        setErrorFields(newErrorFields);

        if (hasError) {
            const firstErrorField = data?.fields.find((field) => !fieldList[field.field_name]);
            fieldRefs.current[firstErrorField.field_name]?.scrollIntoView({ behavior: 'smooth' });
        } else {
            let cart = JSON.parse(localStorage.getItem(cartName));
            if (!Array.isArray(cart)) {
                cart = [];
            }

            const newOrder = { 
                name: data?.item?.name, 
                count,
                ...fieldList,
                price: data?.item?.price
            };

            let orderExists = false;

            cart.forEach(element => {
                const isSameOrder = Object.keys(newOrder).every(key => {
                    if (key === 'count') return true;
                    return element[key] === newOrder[key];
                });

                if (isSameOrder) {
                    element.count += newOrder.count;
                    orderExists = true;
                }
            });

            if (!orderExists) {
                cart.push(newOrder);
            }

            localStorage.setItem(cartName, JSON.stringify(cart));

            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
        }
    };

    return (
        <>
            {showNotification && (
                <>
                    <div className="fixed h-screen inset-0 bg-black opacity-50 z-40"></div>
                    
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-6 rounded-md shadow-md z-50">
                        Your order has been added to the cart!
                    </div>
                </>
            )}
            <div className="relative md:px-10 px-6 mt-3 pb-12 flex flex-col md:flex-row space-y-6 md:space-y-0">

                <div className="md:w-1/2 flex flex-col space-y-4">
                    <CardMain product={data?.item} />
                    <ProductCounter count={count} increment={increment} decrement={decrement}/>
                </div>

                <div className="md:w-1/2 flex flex-col space-y-4">

                    {data?.fields.map((item, index) => (
                        <React.Fragment key={index}>
                            <div ref={(el) => (fieldRefs.current[item.field_name] = el)}>
                                <ExtraField 
                                    field={item} 
                                    setFieldList={setFieldList} 
                                    fieldList={fieldList} 
                                    error={errorFields[item.field_name]}
                                    setError={setErrorFields}
                                />
                            </div>
                            <UnderLine />
                        </React.Fragment>
                    ))}
                    <GreenButton onClick={handleAddToCart} text={"Add to Cart"} />
                </div>
            </div>
        </>
    )
}