import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Perfil', href: '/profile' },
  { name: 'Seguridad y inicio de sesión', href: '/security' },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <div className="flex flex-col space-y-2">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={clsx(
            'm-2 p-2 rounded-md transition-all hover:bg-gray-200',
            pathname === link.href ? 'text-dodger-blue-600' : '',
          )}
          title={link.name}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}
