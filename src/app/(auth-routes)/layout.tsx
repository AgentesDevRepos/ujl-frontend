import React, { ReactNode } from "react";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../../lib/authOptions";
import NavBar from "@/components/navbar/NavBar";

interface PrivateLayoutProps {
    children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
    const session: any = await getServerSession(nextAuthOptions);

    if (!session) {
        redirect('/login');
    }

    return <>
        <div className="bg-[#1E2328]">
            <NavBar links={[
                { href: '/dashboard', label: 'Dashboard' },
                ...(session?.data?.user?.is_admin ? [{ href: '/admin/dashboard', label: 'Admin Dashboard' }] : [])
            ]} />
            {children}
        </div>
    </>
};