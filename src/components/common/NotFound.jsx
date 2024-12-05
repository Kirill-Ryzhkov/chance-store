import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center text-center w-full mt-6">
            <h1 className="md:text-7xl text-5xl regular-bold-font">404</h1>
            <p className="md:text-5xl text-3xl regular-bold-font mt-4">Page Not Found</p>
            <Link to="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Go Home
            </Link>
        </div>
    );
}