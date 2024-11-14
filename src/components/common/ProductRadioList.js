import React from 'react';
import SquareRadioButton from '../common/SquareRadioButton';

export default function ProductRadioList({ label, value, checked, onChange }) {
    return (
        <label className="flex items-center space-x-2">
            <input
                type="radio"
                value={value}
                checked={checked}
                onChange={onChange}
                className="hidden"
            />
            <SquareRadioButton checked={checked} onChange={onChange} />
            <span className="text-colorPrimary text-xl regular-not-bold-font">{label}</span>
        </label>
    );
}