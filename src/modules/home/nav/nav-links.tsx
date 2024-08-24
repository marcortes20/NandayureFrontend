"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  {
    name: "Inicio",
    href: "/",
  },
  {
    name: "Consultas",
    href: "/querys",
  },
  {
    name: "Documentos",
    href: "/docs",
  },
  {
    name: "RH en línea",
    href: "/dashboard",
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(`m-2 p-2 rounded-md transition-all hover:bg-gray-50
                ${pathname === link.href ? "text-dodger-blue-600" : ""}
                `)}
          >
            {link.name}
          </Link>
        );
      })}
    </>
  );
}
