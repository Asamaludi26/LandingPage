import React, { useRef, useEffect } from 'react';
import { HiOutlineX, HiOutlineMail } from 'react-icons/hi';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import { NAV_LINKS } from '@/data/constants';

export const MobileMenu: React.FC<{ 
    isOpen: boolean; 
    onMenuToggle: () => void; 
    onJoinClick: () => void; 
    activeSection: string; 
    onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}> = ({ isOpen, onMenuToggle, onJoinClick, activeSection, onNavClick }) => {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                onMenuToggle();
            }

            if (e.key === 'Tab' && menuRef.current) {
                const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
                    'a[href], button'
                );
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        }
        
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            setTimeout(() => {
                const closeButton = menuRef.current?.querySelector('button');
                closeButton?.focus();
            }, 100);
        }

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onMenuToggle]);
    
    return (
        <div 
          className={`fixed inset-0 z-50 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={onMenuToggle}
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
        >
            <div className="absolute inset-0 bg-black/60"></div>
            <div 
              ref={menuRef}
              className={`absolute top-0 right-0 h-full w-full max-w-sm bg-gray-900 shadow-xl transition-transform duration-500 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
              onClick={(e) => e.stopPropagation()}
            >
                <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center flex-shrink-0">
                     <h1 id="mobile-menu-title" className="text-2xl font-bold text-white tracking-wider">Your<span className="text-amber-500">Brand</span></h1>
                     <button aria-label="Close menu" onClick={onMenuToggle} className="text-white">
                         <HiOutlineX className="w-8 h-8"/>
                     </button>
                </div>
                <nav className="flex-grow p-6 overflow-y-auto">
                     {NAV_LINKS.map((link, index) => (
                        <div 
                            key={link.name} 
                            className={`transition-all duration-500 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                            style={{ transitionDelay: `${250 + index * 50}ms`}}
                        >
                            <a 
                                href={`#${link.id}`} 
                                onClick={(e) => onNavClick(e, link.id)} 
                                className={`flex items-center text-gray-300 hover:text-amber-500 rounded-lg p-4 transition-colors duration-300 font-semibold text-xl ${activeSection === link.id ? 'bg-gray-800 text-amber-500' : 'hover:bg-gray-800'}`}
                                aria-current={activeSection === link.id ? 'page' : undefined}
                            >
                                <link.icon className="w-6 h-6 mr-4 text-amber-500 flex-shrink-0" />
                                {link.name}
                            </a>
                            {index < NAV_LINKS.length - 1 && <hr className="border-gray-700 my-2" />}
                        </div>
                    ))}
                </nav>
                <div 
                    className={`p-6 mt-auto flex-shrink-0 transition-all duration-500 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: '500ms'}}
                >
                    <button onClick={onJoinClick} className="w-full bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-3 px-6 text-base rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-500/30">
                        Join Our Next Ride
                    </button>
                    <div className="flex justify-center space-x-6 mt-6">
                        <a href="mailto:contact@yourbrand.com" aria-label="Email us" className="text-gray-400 hover:text-amber-500 transition-colors"><HiOutlineMail className="w-7 h-7" /></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-amber-500 transition-colors"><FaInstagram className="w-7 h-7" /></a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-amber-500 transition-colors"><FaFacebookF className="w-7 h-7" /></a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;
