import { titleFont } from '@/config/fonts'
import React from 'react'
import User from './user'

const Nav = () => {
    return (
        <div className='flex justify-between'>
            <div className={`hidden sm:block ml-3 text-2xl antialiased font-bold ${titleFont.className}`}>
                Recursos Humanos Nandayure
            </div>
            <div className='flex items-center'>
                <span className='mr-4'>Nombre</span>
                <User />
            </div>
        </div>
    )
}

export default Nav
