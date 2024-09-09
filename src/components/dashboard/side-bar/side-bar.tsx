'use client';
import React from 'react';
import { NavLink, NavLinks } from '../../common/nav-links';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import {
  Clock,
  FileText,
  Folder,
  Home,
  Menu,
  UserCheck,
  X,
} from 'lucide-react';
import { useSidebarStore } from '@/store/dashboard/useSidebar';

export const navLinks: Record<string, NavLink> = {
  home: {
    href: '/',
    icon: Home,
    label: 'Inicio',
  },
  creacionPlanillas: {
    href: '/payroll-creation',
    icon: FileText,
    label: 'Creación de planillas',
  },
  gestionDocumentos: {
    href: '/document-management',
    icon: Folder,
    label: 'Gestión de documentos',
  },
  gestionSolicitudes: {
    href: '/request-management',
    icon: UserCheck,
    label: 'Gestión de solicitudes',
    subLinks: {
      solicitudVacaciones: {
        href: '/vacation-request',
        label: 'Solicitud de vacaciones',
      },
      boletaPago: {
        href: '/pay-slip',
        label: 'Boleta de pago',
      },
      constanciaSalarial: {
        href: '/salary-certificate',
        label: 'Constancia salarial',
      },
    },
  },
  controlMarcas: {
    href: '/time-tracking',
    icon: Clock,
    label: 'Control de marcas',
  },
};

export function SidebarDashboard() {
  const { isOpen, MenuIsOpen, MenuIsClose } = useSidebarStore();

  const toggleSidebar = () => {
    isOpen ? MenuIsClose() : MenuIsOpen();
  };

  return (
    <aside
      className={clsx(
        'flex flex-col h-screen transition-all duration-300 bg-white border rounded border-gray-200',
        isOpen ? 'w-64' : 'w-20 items-center',
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

      <nav
        className={clsx('flex flex-col flex-grow', !isOpen && 'items-center')}
      >
        <NavLinks isOpen={isOpen} navLinks={navLinks} />
      </nav>
    </aside>
  );
}

export default SidebarDashboard;
