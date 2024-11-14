import React from 'react';
import ProductRadioList from '../common/ProductRadioList';

export default function TypeCoffee({ coffeeType, setCoffeeType, error }) {
    return (
        <div className="flex flex-col items-start mt-3">
            <label className="regular-bold-font md:text-4xl text-3xl mb-3">type*</label>
            {error && (
                <p className="text-red-500 text-sm mb-2">Please select one of the options.</p>
            )}
            <div className="flex flex-col space-y-2">
                <ProductRadioList
                    label="Hot"
                    value="hot"
                    checked={coffeeType === 'hot'}
                    onChange={() => setCoffeeType('hot')}
                />
                <ProductRadioList
                    label="Iced"
                    value="iced"
                    checked={coffeeType === 'iced'}
                    onChange={() => setCoffeeType('iced')}
                />
            </div>
        </div>
    );
}