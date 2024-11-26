import React from 'react';
import { Link } from 'react-router-dom';

export default function EmptyCart() {
    return (
        <div className="flex flex-col items-center justify-center w-full">
            <h1 className="md:text-7xl text-5xl regular-bold-font">Your Cart is Empty</h1>
            <Link to="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Go to Home
            </Link>
        </div>
    );
}