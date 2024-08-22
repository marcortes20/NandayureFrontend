import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
  } from '@/components/ui/dropdown-menu';
import { signOut } from 'next-auth/react';
import Image from "next/image";
import { IoPersonCircleOutline, IoPersonOutline } from 'react-icons/io5';

export default function User() {  
    return (
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="overflow-hidden rounded-full border-2 p-1"
        >
         <IoPersonOutline size={24} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
          <DropdownMenuItem>
            <form
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <button type="submit">Sign Out</button>
            </form>
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    );
  }