import React from 'react';
import ProductRadioList from '../common/ProductRadioList';

export default function ExtraField ({ field, fieldList, setFieldList, error, setError }) {
    const handleChange = (fieldOption) => {
        const newFields = {...fieldList};
        newFields[field.field_name] = fieldOption;
        setFieldList(newFields);
        setError((prev) => ({
            ...prev,
            [field?.field_name]: false
        }));
    }

    return (
        <div className="flex flex-col items-start mt-3">
            <label className="regular-bold-font md:text-4xl text-3xl mb-3">{ field?.field_name }</label>
            {error && (
                <p className="text-red-500 text-sm mb-2">Please select one of the options.</p>
            )}
            <div className="flex flex-col space-y-2">
            {Array.isArray(field?.field_options)
                ? field.field_options.map((option, index) => (
                    <ProductRadioList
                        key={index}
                        label={option}
                        value={option.toLowerCase()}
                        checked={fieldList[field.field_name] === option.toLowerCase()}
                        onChange={() => handleChange(option.toLowerCase())}
                    />
                ))
                : Object.keys(field?.field_options || {})
                    .filter(key => field.field_options[key] > 0)
                    .map((key, index) => (
                        <ProductRadioList
                            key={index}
                            label={`${key} (${field.field_options[key]} in stock)`}
                            value={key.toLowerCase()}
                            checked={fieldList[field.field_name] === key.toLowerCase()}
                            onChange={() => handleChange(key.toLowerCase())}
                        />
            ))}
            </div>
        </div>
    );
}