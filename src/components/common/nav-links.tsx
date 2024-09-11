
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight, LucideIcon } from 'lucide-react';

export interface SubLink {
  href: string;
  label: string;
}

export interface NavLink {
  href: string;
  icon: LucideIcon;
  label: string;
  subLinks?: Record<string, SubLink>;
}

interface Props {
  isOpen: boolean;
  navLinks: Record<string, NavLink>;
}

export function NavLinks({ isOpen, navLinks }: Props) {
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <div className="flex flex-col space-y-2">
      {Object.keys(navLinks).map((key) => {
        const link = navLinks[key];

        if (link.subLinks) {
          return (
            <div key={key}>
              <Button
                variant="ghost"
                className="flex items-center justify-between w-full"
                onClick={() => setOpenSubMenu(openSubMenu === key ? null : key)}
              >
                <link.icon className="mr-2 h-5 w-5" />
                {isOpen && (
                  <span className="flex-grow text-left">{link.label}</span>
                )}
                {isOpen &&
                  (openSubMenu === key ? (
                    <ChevronDown className="ml-2 h-4 w-4" />
                  ) : (
                    <ChevronRight className="ml-2 h-4 w-4" />
                  ))}
              </Button>
              {isOpen && openSubMenu === key && (
                <div className="pl-6 mt-2 space-y-2">
                  {link.subLinks &&
                    Object.keys(link.subLinks).map((subKey) => {
                      const subLink = link.subLinks?.[subKey];
                      return (
                        subLink && (
                          <Button
                            key={subKey}
                            variant="ghost"
                            size="sm"
                            className="w-full flex items-center justify-start"
                            asChild
                          >
                            <Link href={subLink.href}>
                              <span
                                className={clsx(
                                  'text-left',
                                  pathname === subLink.href
                                    ? 'text-blue-600'
                                    : 'text-gray-700',
                                )}
                              >
                                {subLink.label}
                              </span>
                            </Link>
                          </Button>
                        )
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
            className="flex items-center justify-start w-full"
            asChild
          >
            <Link href={link.href}>
              <link.icon className="mr-2 h-5 w-5" />
              {isOpen && (
                <span
                  className={clsx(
                    'text-left',
                    pathname === link.href ? 'text-blue-600' : 'text-gray-700',
                  )}
                >
                  {link.label}
                </span>
              )}
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
