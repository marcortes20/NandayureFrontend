'use client'
import Link from 'next/link'
import React from 'react'
import NavLinks from './nav-links'
import Image from 'next/image'

const SideBar = () => {
    return (
        <div className="flex w-72 h-full flex-col px-3 py-4 md:px-2 border rounded">
            <Link
                className="mb-2 flex h-20 items-center justify-center rounded-m p-4 md:h-40"
                href="/dashboard"
            >
                <Image src="/LogoMuni.png" alt="logo" width={100} height={100} />
            </Link>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks />
            </div>
        </div>
    )
}

export default SideBar
