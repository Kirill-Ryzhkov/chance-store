import React, { useState, useRef } from 'react';
import ProductCounter from './ProductCounter';
import UnderLine from '../common/UnderLine';
import CardMain from './CardMain';
import SyrupList from './SyrupList';
import TypeCoffee from './TypeCoffee';
import AddOnsList from './AddOnsList';
import AddToCartButton from '../common/AddToCartButton';

export default function CardBody ({ product }) {
    //coffee type
    const [coffeeType, setCoffeeType] = useState(null);
    const [error, setError] = useState(false);
    const coffeeRef = useRef(null);

    //syrups
    const [syrupType, setSyrupType] = useState('none');

    //add-ons
    const [addOnsType, setAddOnsType] = useState('none');

    //counter
    const [count, setCount] = useState(1);

    const increment = () => setCount(prevCount => prevCount + 1);
    const decrement = () => setCount(prevCount => (prevCount > 1 ? prevCount - 1 : 1));

    //notification
    const [showNotification, setShowNotification] = useState(false);

    const handleAddToCart = () => {
        if (!coffeeType) {
            setError(true);
            coffeeRef.current.scrollIntoView({ behavior: 'smooth' });
        } else {
            setError(false);

            let cart = JSON.parse(localStorage.getItem("cart"));
            if (!Array.isArray(cart)) {
                cart = [];
            }

            const newOrder = { product, coffeeType, syrupType, addOnsType, count };

            let orderExists = false;

            cart.forEach(element => {
                if (
                    element.product === newOrder.product &&
                    element.coffeeType === newOrder.coffeeType &&
                    element.syrupType === newOrder.syrupType &&
                    element.addOnsType === newOrder.addOnsType
                ) {
                    element.count += newOrder.count;
                    orderExists = true;
                }
            });

            if (!orderExists) {
                cart.push(newOrder);
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            console.log("Added to cart:", { product, coffeeType, syrupType, addOnsType, count });

            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
        }
    };

    const handleSetCoffeeType = (type) => {
        setCoffeeType(type);
        setError(false);
    }

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
                    <CardMain product={product} />
                    <ProductCounter count={count} increment={increment} decrement={decrement}/>
                </div>

                <div className="md:w-1/2 flex flex-col space-y-4">
                    <div ref={coffeeRef}>
                        <TypeCoffee coffeeType={coffeeType} setCoffeeType={handleSetCoffeeType} error={error} />
                    </div>
                    <UnderLine />
                    <SyrupList syrupType={syrupType} setSyrupType={setSyrupType}/>
                    <UnderLine />
                    <AddOnsList addOnsType={addOnsType} setAddOnsType={setAddOnsType}/>
                    <AddToCartButton onClick={handleAddToCart} />
                </div>
            </div>
        </>
    )
}