import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { name: 'Inicio', href: '/' },
    { name: 'Creación de planillas', href: '/planillas' },
    { name: 'Manejo de expedientes digitales', href: '/expedientes' },
    { name: 'Generación de constancias de salarios', href: '/constancias' },
    { name: 'Gestión de vacaciones', href: '/vacaciones' },
    { name: 'Gestión de permisos sin goce salarial', href: '/permisos' },
    { name: 'Gestión de licencias por maternidad', href: '/licencias' },
    { name: 'Control de marcas de ingresos y salidas', href: '/marcas' },
];

export default function NavLinks() {
    const pathname = usePathname()
    return (
        <>
            {links.map((link) => {
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(`m-2 p-2 rounded-md transition-all hover:bg-gray-200
                ${pathname === link.href ? 'text-dodger-blue-600' : ''}
                `)}
                    >
                        {link.name}
                    </Link >
                );
            })}
        </>
    );
}