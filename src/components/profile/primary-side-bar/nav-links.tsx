import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import {
  ChevronDown,
  ChevronRight,
  Fingerprint,
  Home,
  LucideIcon,
  UserRoundPen,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
interface SubLink {
  href: string;
  label: string;
}

interface NavLink {
  href: string;
  icon: LucideIcon;
  label: string;
  subLinks?: Record<string, SubLink>;
}

export const navLinks: Record<string, NavLink> = {
  home: {
    href: '/',
    icon: Home,
    label: 'Inicio',
  },
  Profile: {
    href: '/profile',
    icon: UserRoundPen,
    label: 'Perfil',
  },
  Seguridad: {
    href: '/security',
    icon: Fingerprint,
    label: 'Seguridad',
  },
};
export function NavLinks() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {Object.keys(navLinks).map((key) => {
        const link = navLinks[key];
        if (link.subLinks) {
          return (
            <div key={key} className="mb-2">
              <Button
                variant="ghost"
                className="justify-start w-full"
                onClick={() => setIsOpen(!isOpen)}
              >
                <link.icon className="mr-2 h-4 w-4 flex-shrink-0" />
                <span className="text-left flex-grow">{link.label}</span>
                {isOpen ? (
                  <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
                ) : (
                  <ChevronRight className="ml-2 h-4 w-4 flex-shrink-0" />
                )}
              </Button>
              {isOpen && (
                <div className="ml-4 mt-2 space-y-2">
                  {link.subLinks &&
                    Object.keys(link.subLinks)?.map((subKey) => {
                      const subLink = link.subLinks?.[subKey];
                      return (
                        <Button
                          key={subKey}
                          variant="ghost"
                          size="sm"
                          className="justify-start w-full"
                          asChild
                        >
                          <Link href={subLink?.href ?? ''}>
                            <span
                              className={clsx(
                                'text-left',
                                pathname === subLink?.href
                                  ? 'text-dodger-blue-600'
                                  : '',
                              )}
                            >
                              {subLink?.label}
                            </span>
                          </Link>
                        </Button>
                      );
                    })}
                </div>
              )}
            </div>
          );
        }
        return (
          <Button
            key={key}
            variant="ghost"
            className="justify-start mb-2 w-full"
            asChild
          >
            <a href={link.href}>
              <link.icon className="mr-2 h-4 w-4 flex-shrink-0" />
              <span
                className={clsx(
                  'text-left',
                  pathname === link.href ? 'text-dodger-blue-600' : '',
                )}
              >
                {link.label}
              </span>
            </a>
          </Button>
        );
      })}
    </>
  );
}
