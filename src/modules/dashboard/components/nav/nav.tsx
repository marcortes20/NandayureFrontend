'use client'; 

import { titleFont } from '@/config/fonts';
import { useSession } from 'next-auth/react';
import React from 'react';
import User from './user';

const Nav = () => {
    const { data: session, status } = useSession();

    let userInfo = "Cargando...";

    if (status === "authenticated" && session?.user) {
        userInfo = session.user.email || session.user.name || "Usuario";
    } else if (status === "unauthenticated") {
        userInfo = "Invitado";
    }

    return (
        <div className='flex justify-between'>
            <div className={`hidden sm:block ml-3 text-2xl antialiased font-bold ${titleFont.className}`}>
                Recursos Humanos Nandayure
            </div>
            <div className='flex items-center'>
                <span className='mr-4'>{userInfo}</span>
                <User />
            </div>
        </div>
    );
}

export default Nav;
