import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import LogoBlack from '../../assets/images/logo_black.png';
import LogoWhite from '../../assets/images/logo_white.png';

export default function Header({ page }) {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const iconSize = screenWidth < 768 ? 22 : 27;
    const nextPage = page === "merch" ? "cafe" : "merch";

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.className = newTheme;
        localStorage.setItem('theme', newTheme);
    };

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        document.documentElement.className = theme;
    }, [theme]);

    return (
        <nav className="fixed top-0 w-full bg-background shadow-lg z-30">
            <div className="container mx-auto flex items-center justify-between h-20 md:h-28 px-4">
                
                
                <div className="md:w-1/6 lg:w-1/12 w-1/5">
                    <Link to={`/${page}`}><img alt='Logo' src={ theme === "light" ? LogoBlack : LogoWhite } /> </Link> 
                </div>

                <div className="md:flex space-x-6">
                    <button className="text-colorPrimary text-2xl">
                        <Link to={'/' + nextPage}>{ nextPage.toUpperCase() }</Link>
                    </button>
                    <button className="text-colorPrimary" onClick={toggleTheme}>
                        {theme === 'light' ? <MdDarkMode size={iconSize}/> : <MdOutlineLightMode size={iconSize}/>}
                    </button>
                    <Link to={`/cart/${page}`}>
                        <button className="text-colorPrimary"><FaShoppingCart size={iconSize}/></button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}