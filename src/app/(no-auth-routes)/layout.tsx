import React, { ReactNode } from "react";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../../lib/authOptions";
import NavBar from "@/components/navbar/NavBar";
interface PrivateLayoutProps {
    children: ReactNode
}

interface MenuItem {
    href: string;
    description: string;
}

const menuItems: MenuItem[] = [
    {
        href: "/",
        description: "Home"
    },
    {
        href: "/#about",
        description: "About"
    },
    {
        href: "/#solutions",
        description: "Solutions"
    }
];

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
    const session = await getServerSession(nextAuthOptions);

    if (session) {
        redirect('/dashboard')
    }

    return <>
        <NavBar links={[{ href: '/signup', label: 'Cadastro' }, { href: '/login', label: 'Login' }]} />
        {children}
    </>
};