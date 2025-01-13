import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import ProductCounter from './ProductCounter';
import UnderLine from '../common/UnderLine';
import CardMain from './CardMain';
import Button from '../common/Button';
import ExtraField from './ExtraField';
import Loader from '../common/Loader';
import { useStatusStoreQuery } from '../../services/redux/apiSlice';

export default function CardBody ({ data, page }) {
    const navigate = useNavigate();

    const { data: statusStore, refetch } = useStatusStoreQuery();

    const [status, setStatus] = useState(statusStore?.status?.open || true);
    const [refreshing, setRefreshing] = useState(false);

    const [errorFields, setErrorFields] = useState({});

    const [count, setCount] = useState(1);
    const increment = () => setCount(prevCount => prevCount + 1);
    const decrement = () => setCount(prevCount => (prevCount > 1 ? prevCount - 1 : 1));

    const [fieldList, setFieldList] = useState({});

    const [showNotification, setShowNotification] = useState(false);
    const [textNotification, setTextNotification] = useState('');

    const fieldRefs = useRef({});

    if (!data?.item || !data?.fields) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    const checkFilledFields = () => {
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

        return hasError;
    }

    const handleAddToCart = () => {
        const newStatus = statusStore?.status?.open;
        refetch();
        setStatus(newStatus);

        if (!newStatus && page === "cafe") {
            return;
        }

        const cartName = `cart_${page}`;

        const hasError = checkFilledFields();

        if (hasError) {
            const firstErrorField = data?.fields.find((field) => !fieldList[field.field_name]);
            fieldRefs.current[firstErrorField.field_name]?.scrollIntoView({ behavior: 'smooth' });
        } else {
            let cart = JSON.parse(localStorage.getItem(cartName));
            if (!Array.isArray(cart)) {
                cart = [];
            }

            if (page === 'merch') {
                const name = Object.keys(fieldList)[0];
                const size = data?.fields.filter(item => item.field_name === name)[0].field_options;
                const maxCount = size[fieldList[name]];
                if (count > maxCount) {
                    setCount(maxCount);
                    setTextNotification('Max count is 10')
                    setShowNotification(true);
                    setTimeout(() => setShowNotification(false), 2000);
                    return;
                }
            }

            const newOrder = { 
                name: data?.item[0].slug,
                count,
                ...fieldList,
                price: data?.item[0].price
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

            setTextNotification('Your order has been added to the cart!')
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
        }
    };

    const handleBuyNow = () => {
        const newStatus = statusStore?.status?.open;
        refetch();
        setStatus(newStatus);

        if (!newStatus && page === "cafe") {
            return;
        }

        const hasError = checkFilledFields();

        if (hasError) {
            const firstErrorField = data?.fields.find((field) => !fieldList[field.field_name]);
            fieldRefs.current[firstErrorField.field_name]?.scrollIntoView({ behavior: 'smooth' });
        } else {

            if (page === 'merch') {
                const name = Object.keys(fieldList)[0];
                const size = data?.fields.filter(item => item.field_name === name)[0].field_options;
                const maxCount = size[fieldList[name]];
                if (count > maxCount) {
                    setCount(maxCount);
                    setTextNotification('Max count is 10')
                    setShowNotification(true);
                    setTimeout(() => setShowNotification(false), 2000);
                    return;
                }
            }

            const cart = [{
                name: data?.item[0].slug,
                count,
                ...fieldList,
                price: data?.item[0].price
            }];
            navigate(`/checkout/${page}`, { state: { cart } });
        }
    }

    const refetchStatus = async () => {
        setRefreshing(true);

        try {
            const { data } = await refetch();
            setStatus(data?.status?.open);
        } catch (error) {
            console.error("Failed to refresh status:", error);
        } finally {
            setRefreshing(false);
        }
    }

    return (
        <>
            {showNotification && (
                <>
                    <div className="fixed h-screen inset-0 bg-black opacity-50 z-40"></div>
                    
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-6 rounded-md shadow-md z-50">
                        {textNotification}
                    </div>
                </>
            )}
            <div className="relative md:px-10 px-6 mt-3 pb-12 flex flex-col md:flex-row space-y-6 md:space-y-0">

                <div className="md:w-1/2 flex flex-col space-y-4">
                    <CardMain product={data?.item[0]} />
                    <ProductCounter count={count} increment={increment} decrement={decrement}/>
                </div>

                <div className="md:w-1/2 flex flex-col space-y-4">

                    {data?.fields?.map((item, index) => (
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
                    <div className="sticky mt-2 bottom-2 right-0 text-center">
                        {!status && page === 'cafe' && 
                            <div className='bg-background'>
                                <p className='text-xl'>The store is currently closed</p>
                                <p className='text-xs'>{ refreshing ? "Refreshing..." : "If it remains closed for a long time, click the button below to refresh the status"}</p>
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                                    onClick={refetchStatus}
                                >
                                    Refresh Store Status
                                </button>
                            </div>
                        }
                        <Button 
                            disabled={(!status && page === 'cafe')}
                            onClick={handleAddToCart}
                            text={"Add to Cart"}
                            color={"bg-green-500"}
                        />
                        <Button 
                            disabled={!status && page === 'cafe'}
                            onClick={handleBuyNow}
                            text={"Buy now"}
                            color={"bg-yellow-400"}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}