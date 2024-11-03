import './NavigationBar.css'
import { IoMdPerson } from "react-icons/io";
import { useState } from 'react';
import SideMenu from "./SideMenu.tsx";

const NavigationBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const sideMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    return (
        <header className="header">
            <a className="logo">StoreManager</a>

            <nav className="navigationBar">
                <a href="/goods">Goods</a>
                <a href="/warehouses">Warehouses</a>
                <a href="/about">About</a>
                <a href="/person"><IoMdPerson/></a>
            </nav>

            <SideMenu isOpen={isMenuOpen} onToggle={sideMenu} />

            {isMenuOpen && <div className="overlay" onClick={sideMenu}></div>}
        </header>
    )
}

export default NavigationBar;