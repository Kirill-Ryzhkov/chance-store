import React from 'react';
import ProductRadioList from '../common/ProductRadioList';

export default function SyrupList ({ syrupType, setSyrupType }) {
    const syrups = [
        "None",
        "Strawberry",
        "Caramel",
        "Vanilla"
    ];

    return (
        <div className="flex flex-col items-start mt-3">
            <label className="regular-bold-font md:text-4xl text-3xl mb-3">syrup</label>
            <div className="flex flex-col space-y-2">
                {syrups.map((syrup, index) => (
                    <ProductRadioList
                        key={index}
                        label={syrup}
                        value={syrup.toLowerCase()}
                        checked={syrupType === syrup.toLowerCase()}
                        onChange={() => setSyrupType(syrup.toLowerCase())}
                    />
                ))}
                
            </div>
        </div>
    );
}