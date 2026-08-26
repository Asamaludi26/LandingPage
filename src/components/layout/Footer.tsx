import React from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';

export const Footer: React.FC<{ onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void }> = ({ onNavClick }) => (
    <footer className="bg-gray-950 text-gray-500 py-8 sm:py-10">
        <div className="container mx-auto px-4 sm:px-6 text-center">
            <a href="#home" onClick={(e) => onNavClick(e, 'home')} className="text-2xl font-bold text-white tracking-wider mb-4 inline-block">
                Velo<span className="text-amber-500">Bikers</span>
            </a>
            <div className="flex justify-center space-x-6 my-4">
                 <a href="mailto:contact@velobikers.com" aria-label="Email us at contact@velobikers.com" className="hover:text-amber-500 transition-colors transform hover:scale-110"><HiOutlineMail className="w-7 h-7" /></a>
                 <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Instagram page" className="hover:text-amber-500 transition-colors transform hover:scale-110"><FaInstagram className="w-7 h-7" /></a>
                 <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook page" className="hover:text-amber-500 transition-colors transform hover:scale-110"><FaFacebookF className="w-7 h-7" /></a>
            </div>
            <p className="mt-4">&copy; {new Date().getFullYear()} VeloBikers Community. All Rights Reserved.</p>
            <p className="text-sm mt-1">Ride with Passion, Live with Freedom.</p>
        </div>
    </footer>
);

export default Footer;
