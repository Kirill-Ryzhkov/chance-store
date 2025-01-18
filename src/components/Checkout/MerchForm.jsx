import React from "react";

export default function MerchForm ({ formData, setFormData, errors }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="mb-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="first_name" className="block text-xl regular-not-bold-font text-colorPrimary">
                        First Name *
                    </label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                        className="bg-background mt-1 block w-full p-3 border-2 border-colorSecond rounded-md shadow-sm focus:ring-colorPrimary focus:border-colorPrimary"
                    />
                    {errors.first_name && (
                        <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="last_name" className="block text-xl regular-not-bold-font text-colorPrimary">
                        Last Name *
                    </label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                        className="bg-background mt-1 block w-full p-3 border-2 border-colorSecond rounded-md shadow-sm focus:ring-colorPrimary focus:border-colorPrimary"
                    />
                    {errors.last_name && (
                        <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                    <label htmlFor="email" className="block text-xl regular-not-bold-font text-colorPrimary">
                        Email *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-background mt-1 block w-full p-3 border-2 border-colorSecond rounded-md shadow-sm focus:ring-colorPrimary focus:border-colorPrimary"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="phone" className="block text-xl regular-not-bold-font text-colorPrimary">
                        Phone *
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="bg-background mt-1 block w-full p-3 border-2 border-colorSecond rounded-md shadow-sm focus:ring-colorPrimary focus:border-colorPrimary"
                    />
                    {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                </div>
            </div>
        </div>
    );
};