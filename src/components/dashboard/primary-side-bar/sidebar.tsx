
'use client';

import React from 'react';
import { HiMenuAlt2, HiX } from 'react-icons/hi';
import { NavLinks } from './nav-links';
import clsx from 'clsx';
import { useSidebarState } from '@/store/dashboard/useSidebar';
import Link from 'next/link';
import Image from 'next/image';

export function Sidebar() {
  const { isOpen, MenuIsOpen, MenuIsClose } = useSidebarState();

  const toggleSidebar = () => {
    isOpen ? MenuIsClose() : MenuIsOpen();
  };

  return (
    <aside
      className={clsx(
        'flex flex-col h-full transition-all duration-300 bg-white border-r border-gray-200',
        isOpen ? 'w-64' : 'w-20'
      )}
    >
    
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-full hover:bg-gray-200 self-end m-2"
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <HiX size={24} /> : <HiMenuAlt2 size={24} />}
      </button>

      <Link
        className="mb-2 flex h-20 items-center justify-center rounded-md p-4 md:h-40"
        href="/"
      >
        <Image src="/LogoMuni.png" alt="logo" width={100} height={100} priority />
      </Link>

      <nav className="flex flex-col flex-grow">
        <NavLinks isOpen={isOpen} />
      </nav>
    </aside>
  );
}

export default Sidebar;