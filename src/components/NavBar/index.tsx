import { ReactNode } from 'react';
import style from './style.module.scss';
import { useLocation } from 'react-router-dom';

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
}

function NavBarItem({ name, id, icon }: NavBarItemProps) {
    const router = useLocation();

    console.log(router.pathname)

    return (
        <a href={`/${id}`} className={style.item} data-selected={`/${id}` == router.pathname}>
            {icon}
            <span>{name}</span>
        </a>
    );
}

NavBar.Item = NavBarItem;

export default NavBar;