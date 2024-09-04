'use client';
import Image from 'next/image';
import Link from 'next/link';
import { NavLinks } from './nav-links';

export function Sidebar() {

  return (
    <div className="w-72 p-4 flex flex-col rounded-r-lg shadow border">
      <Link
        className="mb-2 flex h-20 items-center justify-center rounded-m p-4 md:h-40"
        href="/"
      >
        <Image src="/LogoMuni.png" alt="logo" width={100} height={100} />
      </Link>
      <NavLinks />
    </div>
  );
}
