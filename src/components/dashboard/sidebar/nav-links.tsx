import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LinkItem {
  name: string;
  href: string;
}

interface DropdownLinkItem extends LinkItem {
  dropdownItems: LinkItem[];
}

type NavLinkItem = LinkItem | DropdownLinkItem;

const links: NavLinkItem[] = [
  { name: 'Inicio', href: '/' },
  { name: 'Creación de planillas', href: '/planillas' },
  { name: 'Gestión de documentos', href: '/documentos' },
  {name: 'Gestión de solicitudes',  href: '/solicitudes',
    dropdownItems: [
      { name: 'Solicitud de vacaciones', href: '/404' },
      { name: 'Boleta de pago', href: '/404' },
      { name: 'Constancia salarial', href: '/404' },
    ],
  },
  { name: 'Control de marcas de ingresos y salidas', href: '/marcas' },
];

export default function NavLinks({ isOpen }: { isOpen: boolean }) {
  const pathname = usePathname();

  const renderLink = (link: NavLinkItem) => {
    const linkClass = clsx(
      'm-2 p-2 rounded-md transition-all hover:bg-gray-200',
      {
        'text-dodger-blue-600': pathname === link.href,
        hidden: !isOpen,
      }
    );

    if ('dropdownItems' in link) {
      return (
        <DropdownMenu key={link.name}>
          <DropdownMenuTrigger className={linkClass}>
            {link.name}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {link.dropdownItems.map((item) => (
              <DropdownMenuItem key={item.name}>
                <Link href={item.href} className="w-full">
                  {item.name}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <Link
        key={link.name}
        href={link.href}
        className={linkClass}
        title={link.name}
      >
        {link.name}
      </Link>
    );
  };

  return <>{links.map(renderLink)}</>;
}