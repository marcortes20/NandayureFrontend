import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Inicio', href: '/' },
  { name: 'Creación de planillas', href: '/planillas' },
  { name: 'Gestión de documentos', href: '/documentos' },
  { name: 'Gestión de solicitudes', href: '/solicitudes' },
  { name: 'Control de marcas de ingresos y salidas', href: '/marcas' },
];

export default function NavLinks({ isOpen }: { isOpen: boolean }) {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(`m-2 p-2 rounded-md transition-all hover:bg-gray-200
                ${pathname === link.href ? 'text-dodger-blue-600' : ''}
                 ${isOpen ? '' : 'hidden'}
                `)}
            title={link.name}
          >
            {link.name}
          </Link>
        );
      })}
    </>
  );
}
