import React, { useState } from 'react';
import { FaPlus, FaMinus } from "react-icons/fa6";

export default function ProductCounter({ count, increment, decrement }) {

    return (
        <div className="flex items-center space-x-4 mt-3">
            <button
                onClick={decrement}
                disabled={count === 1}
                className={`w-8 h-8 flex items-center justify-center border rounded bg-backgroundDiff ${count === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-colorSecond'}`}
            >
                <FaMinus />
            </button>
            <span className="text-lg">{count}</span>
            <button
                onClick={increment}
                className="w-8 h-8 flex items-center justify-center border rounded bg-backgroundDiff text-colorSecond"
            >
                <FaPlus />
            </button>
        </div>
    );
}