'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useGetRoles from '@/hooks/common/useGetRoles';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { IoPersonOutline } from 'react-icons/io5';

export default function User() {
  const { roles } = useGetRoles();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="overflow-hidden rounded-full border-2 p-1">
          <IoPersonOutline size={24} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Mi perfil</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/profile">Configuración </Link>
        </DropdownMenuItem>
        {roles && roles.includes('RH') && (
          <DropdownMenuItem>
            <Link href={'/auth/register'}>Registrar usuario</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>Ayuda</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button onClick={() => signOut()} className="w-full text-left">
            Cerrar sesión
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
