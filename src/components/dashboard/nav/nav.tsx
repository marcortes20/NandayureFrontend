'use client';
import { titleFont } from '@/config/fonts';
import { useSession } from 'next-auth/react';
import React from 'react';
import User from './user';

const Nav = () => {
  const { data: session, status } = useSession();

  let userInfo = 'Invitado';

  if (status === 'loading') {
    userInfo = 'Cargando...';
  } else if (status === 'authenticated' && session?.user) {
    userInfo = session.user.email || session.user.name || 'Usuario';
  }

  return (
    <div className="flex justify-between">
      <div
        className={`hidden sm:block ml-3 text-2xl antialiased font-bold ${titleFont.className}`}
      >
        Recursos Humanos Nandayure
      </div>
      <div className="flex items-center">
        <span className="mr-4">{userInfo}</span>
        <User />
      </div>
    </div>
  );
};

export default Nav;
