import React from 'react';
import { TiTick } from "react-icons/ti";

export default function SquareRadioButton({ checked, onChange }) {
    return (
        <span
            onClick={onChange}
            className={`form-radio w-6 h-6 border-2 rounded-md flex items-center justify-center cursor-pointer ${
                checked ? 'bg-backgroundDiff text-background' : 'bg-background text-colorPrimary'
            }`}
        >
            {checked && <TiTick size={40}/>}
        </span>
    );
}