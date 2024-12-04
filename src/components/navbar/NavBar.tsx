"use client"

import React from 'react';
import Link from 'next/link';

function NavBar() {
    return (
        <nav className="bg-[#1E2328] p-4 border-b border-gray-700">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <img src="/images/logo.png" alt="Logo" className="p-3 w-32 h-auto" />
                </div>
                <div className="flex space-x-4">
                    <Link href="/signup" className="relative group text-white font-bold py-2">
                        Cadastro
                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#FFC700] transition-all duration-500 group-hover:w-full" />
                    </Link>
                    <Link href="/login" className="text-black bg-[#FFC700] px-4 py-2 rounded font-bold hover:bg-yellow-500 transition-colors duration-200">
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
