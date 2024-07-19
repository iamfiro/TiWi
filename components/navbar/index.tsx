'use client'

import { ReactNode } from 'react';
import style from './style.module.scss';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface NavBarProps {
    children?: React.ReactNode
}

function NavBar({ children }: NavBarProps) {
    return (
        <>
        <footer className={style.container}>
            {children}
            s
        </footer>
        </>
    );
}

interface NavBarItemProps {
    children?: React.ReactNode
    name: string
    id: string;
    icon: ReactNode
}

function NavBarItem({ name, id, icon }: NavBarItemProps) {
    const pathname = usePathname()
    return (
        <Link href={`/${id}`} className={style.item} data-selected={`/${id}` == pathname}>
            {icon}
            <span>{name}</span>
        </Link>
    );
}

export default NavBar;