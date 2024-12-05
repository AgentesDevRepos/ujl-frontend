"use client"

import React, { useState } from 'react';
import Link from 'next/link';

function NavBar({ links }: { links: { href: string; label: string }[] }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-[#1E2328] p-4 border-b border-gray-700">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <a 
                        href="https://www.ujliberdade.org.br/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <img src="/images/logo.png" alt="Logo" className="p-3 w-24 md:w-32 h-auto" />
                    </a>
                </div>

                {/* Botão do Menu Hambúrguer */}
                <button 
                    className="md:hidden text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg 
                        className="w-6 h-6" 
                        fill="none" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        {isMenuOpen ? (
                            <path d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>

                {/* Menu para Desktop */}
                <div className="hidden md:flex space-x-4">
                    {links.map((link, index) => {
                        if (index === links.length - 1) {
                            return (
                                <Link 
                                    key={link.href}
                                    href={link.href} 
                                    className="text-black bg-[#FFC700] px-4 py-2 rounded font-bold hover:bg-yellow-500 transition-colors duration-200"
                                >
                                    {link.label}
                                </Link>
                            );
                        }
                        return (
                            <Link 
                                key={link.href}
                                href={link.href} 
                                className="relative group text-white font-bold py-2"
                            >
                                {link.label}
                                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#FFC700] transition-all duration-500 group-hover:w-full" />
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Menu Mobile */}
            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} pt-4`}>
                <div className="flex flex-col space-y-3">
                    {links.map((link, index) => {
                        if (index === links.length - 1) {
                            return (
                                <Link 
                                    key={link.href}
                                    href={link.href} 
                                    className="text-black bg-[#FFC700] px-4 py-2 rounded font-bold hover:bg-yellow-500 transition-colors duration-200 text-center"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            );
                        }
                        return (
                            <Link 
                                key={link.href}
                                href={link.href} 
                                className="text-white font-bold py-2 text-center hover:bg-gray-800 rounded"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
