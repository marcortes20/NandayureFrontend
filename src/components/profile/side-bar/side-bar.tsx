'use client';
import Link from 'next/link';
import NavLinks from './nav-links';
import Image from 'next/image';
import { titleFont } from '@/config/fonts';

const SideBar = () => {
  return (
    <div className="flex h-full w-1/4">
      <aside className="flex flex-col px-3 py-4 md:px-2 border rounded transition-all duration-300 ease-in-out">
        <Link
          className="mb-2 flex h-20 items-center justify-center rounded-m p-4 md:h-40"
          href="/"
        >
          <Image src="/LogoMuni.png" alt="logo" width={100} height={100} />
        </Link>

        <h2 className={`text-xl font-bold mb-4 ${titleFont.className}`}>
          Perfil
        </h2>
        <NavLinks />
      </aside>
    </div>
  );
};

export default SideBar;
