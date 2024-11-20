import React, { useState, useRef } from 'react';
import ProductCounter from './ProductCounter';
import UnderLine from '../common/UnderLine';
import CardMain from './CardMain';
import SyrupList from './SyrupList';
import TypeCoffee from './TypeCoffee';
import AddOnsList from './AddOnsList';
import GreenButton from '../common/GreenButton';

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

            let cart = JSON.parse(localStorage.getItem("cart_cafe"));
            if (!Array.isArray(cart)) {
                cart = [];
            }

            const id = Math.random().toString(16).slice(2);
            const newOrder = { id, name: product, type: coffeeType, syrup: syrupType, addon: addOnsType, count, price: 3.00 };

            let orderExists = false;

            cart.forEach(element => {
                if (
                    element.name === newOrder.name &&
                    element.type === newOrder.type &&
                    element.syrup === newOrder.syrup &&
                    element.addon === newOrder.addon
                ) {
                    element.count += newOrder.count;
                    orderExists = true;
                }
            });

            if (!orderExists) {
                cart.push(newOrder);
            }

            localStorage.setItem("cart_cafe", JSON.stringify(cart));

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
                    <GreenButton onClick={handleAddToCart} text={"Add to Cart"} />
                </div>
            </div>
        </>
    )
}