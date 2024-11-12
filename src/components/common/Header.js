import React, { useState, useEffect } from 'react';
import { FiAlignJustify } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import LogoBlack from '../../assets/images/logo_black.png';
import LogoWhite from '../../assets/images/logo_white.png';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [theme, setTheme] = useState('light');

    // Функция для переключения темы
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.className = newTheme; // Устанавливаем тему на <html>
    };

    useEffect(() => {
        document.documentElement.className = theme;
    }, [theme]);

    return (
        <nav className="fixed top-0 w-full bg-background shadow-md z-50">
            <div className="container mx-auto flex items-center justify-between h-20 md:h-28 px-4">
                
                {/* Логотип */}
                <div className="md:w-1/12 w-1/5"><img src={ theme === "light" ? LogoBlack : LogoWhite } /> </div>
                
                {/* Кнопки для десктопа */}
                <div className="hidden md:flex space-x-4">
                    <button className="text-colorPrimary text-2xl">Merch</button>
                    <button className="text-colorPrimary" onClick={toggleTheme}>
                        {theme === 'light' ? <MdDarkMode size={27}/> : <MdOutlineLightMode size={27}/>}
                    </button>
                    <button className="text-colorPrimary"><FaShoppingCart size={25}/></button>
                </div>
                
                {/* Кнопка меню для мобильных устройств */}
                <div className="flex items-center space-x-4 md:hidden">
                    <button className="text-colorPrimary" onClick={toggleTheme}>
                        {theme === 'light' ? <MdDarkMode size={23}/> : <MdOutlineLightMode size={23}/>}
                    </button>
                    <button className="text-colorPrimary"><FaShoppingCart size={20}/></button>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-colorPrimary"
                    >
                        <FiAlignJustify size={25}/>
                    </button>
                </div>
            </div>
            
            {/* Мобильное меню */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-background w-full">
                    <ul className="flex flex-col items-center space-y-4 p-4">
                        <li>
                            <button className="text-colorPrimary text-2xl">Merch</button>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}