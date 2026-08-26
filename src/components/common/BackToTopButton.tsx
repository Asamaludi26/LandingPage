import React from 'react';
import { HiOutlineArrowUp } from 'react-icons/hi';

export const BackToTopButton: React.FC<{ isVisible: boolean; isMenuOpen: boolean; }> = ({ isVisible, isMenuOpen }) => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-50 bg-amber-500 hover:bg-amber-600 text-white p-3 rounded-full shadow-lg transform transition-all duration-500 ease-in-out
                       ${isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-full pointer-events-none'}
                       ${isMenuOpen ? '!opacity-0 !translate-x-full' : 'translate-x-0'}`}
            aria-label="Go back to top"
            title="Back to Top"
            disabled={!isVisible || isMenuOpen}
        >
            <HiOutlineArrowUp className="w-6 h-6" />
        </button>
    );
};

export default BackToTopButton;
