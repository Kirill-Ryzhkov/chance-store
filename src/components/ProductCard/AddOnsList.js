import React from 'react';
import ProductRadioList from '../common/ProductRadioList';

export default function AddOnsList ({ addOnsType, setAddOnsType }) {
    const addOns = [
        "None",
        "Chocolate Chips",
        "Whipped Cream",
        "Cookies"
    ];

    return (
        <div className="flex flex-col items-start mt-3">
            <label className="regular-bold-font md:text-4xl text-3xl mb-3">add-on</label>
            <div className="flex flex-col space-y-2">
                {addOns.map((addOn, index) => (
                    <ProductRadioList
                        key={index}
                        label={addOn}
                        value={addOn.toLowerCase()}
                        checked={addOnsType === addOn.toLowerCase()}
                        onChange={() => setAddOnsType(addOn.toLowerCase())}
                    />
                ))}
                
            </div>
        </div>
    );
}