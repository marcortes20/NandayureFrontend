'use client';

import React from 'react';
import { NavLinks } from './nav-links';
import clsx from 'clsx';
import { useSidebarState } from '@/store/dashboard/useSidebar';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export function Sidebar() {
  const { isOpen, MenuIsOpen, MenuIsClose } = useSidebarState();

  const toggleSidebar = () => {
    isOpen ? MenuIsClose() : MenuIsOpen();
  };

  return (
    <aside
      className={clsx(
        'flex flex-col h-screen transition-all duration-300 bg-white border rounded border-gray-200',
        isOpen ? 'w-64' : 'w-20 items-center'
      )}
    >
      <div className="flex items-center p-2">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-200"
          aria-label="Toggle Sidebar"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <Link
        className="mb-2 flex h-20 items-center justify-center rounded-md p-4 md:h-40"
        href="/"
      >
        <Image
          src="/LogoMuni.png"
          alt="logo"
          width={100}
          height={100}
          priority
        />
      </Link>

      <nav className={clsx('flex flex-col flex-grow', !isOpen && 'items-center')}>
        <NavLinks isOpen={isOpen} />
      </nav>
    </aside>
  );
}

export default Sidebar;
