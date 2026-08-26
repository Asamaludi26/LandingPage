import React from 'react';
import { HiOutlineMenu } from 'react-icons/hi';
import { NAV_LINKS } from '@/data/constants';

export const Header: React.FC<{ 
    isScrolled: boolean; 
    onMenuToggle: () => void; 
    activeSection: string; 
    onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}> = ({ isScrolled, onMenuToggle, activeSection, onNavClick }) => {
    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/80 shadow-lg backdrop-blur-md' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
                <a href="#home" onClick={(e) => onNavClick(e, 'home')} className="text-2xl font-bold text-white tracking-wider">
                    Your<span className="text-amber-500">Brand</span>
                </a>
                <nav className="hidden md:flex space-x-8">
                    {NAV_LINKS.map(link => (
                        <a 
                            key={link.name} 
                            href={`#${link.id}`}
                            onClick={(e) => onNavClick(e, link.id)}
                            className={`text-gray-300 hover:text-amber-500 transition-colors duration-300 font-medium hover-underline-animation ${activeSection === link.id ? 'text-amber-500' : ''}`}
                            aria-current={activeSection === link.id ? 'page' : undefined}
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>
                <button aria-label="Open menu" onClick={onMenuToggle} className="md:hidden text-white">
                    <HiOutlineMenu className="w-6 h-6" />
                </button>
            </div>
        </header>
    );
};

export default Header;
