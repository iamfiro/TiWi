import { ReactNode } from 'react';
import style from './style.module.scss';

interface NavBarProps {
    children?: React.ReactNode
}

function NavBar({ children }: NavBarProps) {
    return (
        <>
        <footer className={style.container}>
            {children}
        </footer>
        </>
    );
}

interface NavBarItemProps {
    children?: React.ReactNode
    name: string
    id: string;
    icon: ReactNode
    isHome: boolean;
}

function NavBarItem({ name, id, icon, isHome }: NavBarItemProps) {
    return (
        <a href={`/${id}`} className={style.item} data-selected={isHome}>
            {icon}
            <span>{name}</span>
        </a>
    );
}

NavBar.Item = NavBarItem;

export default NavBar;