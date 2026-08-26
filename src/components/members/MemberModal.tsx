import React, { useRef, useEffect } from 'react';
import type { MemberProfile } from '@/types';
import { HiOutlineX } from 'react-icons/hi';
import { FaInstagram, FaFacebookF, FaMotorcycle } from 'react-icons/fa';

export const MemberModal: React.FC<{
    member: MemberProfile;
    onClose: () => void;
}> = ({ member, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'Tab' && modalRef.current) {
                const focusable = modalRef.current.querySelectorAll<HTMLElement>('button, a');
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
                if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        setTimeout(() => modalRef.current?.querySelector('button')?.focus(), 100);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4 transition-opacity duration-300 animate-modal-fade-in" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="member-modal-name">
            <div ref={modalRef} className="relative bg-gray-800 border border-amber-500/30 text-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 animate-fade-scale-in" onClick={e => e.stopPropagation()}>
                <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-t-2xl">
                    <img src={member.avatarSrc} alt={member.name} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-gray-800/40 to-transparent"></div>
                    <button onClick={onClose} aria-label="Tutup detail member" className="absolute top-4 right-4 text-white bg-black/60 backdrop-blur-md rounded-full p-2.5 hover:bg-black/90 hover:text-amber-500 transition-colors z-10">
                        <HiOutlineX className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-4 left-6 right-6">
                        <span className="inline-block bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                            {member.role}
                        </span>
                        <h3 id="member-modal-name" className="text-2xl sm:text-3xl font-bold text-white">{member.name}</h3>
                    </div>
                </div>
                <div className="p-6 sm:p-8 space-y-6 text-gray-300">
                    <div className="flex items-center space-x-3 bg-gray-900/60 border border-gray-700/50 p-4 rounded-xl">
                        <div className="bg-amber-500/10 p-3 rounded-lg text-amber-500">
                            <FaMotorcycle className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="text-xs text-gray-400 uppercase font-semibold">Motor Andalan</span>
                            <p className="text-white font-medium text-lg">{member.bike}</p>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Filosofi Berkendara</h4>
                        <blockquote className="border-l-4 border-amber-500 pl-4 py-2 text-gray-200 italic text-base leading-relaxed bg-amber-500/5 rounded-r-lg">
                            "{member.quote}"
                        </blockquote>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Biografi & Pengalaman</h4>
                        <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{member.bio}</p>
                    </div>

                    {member.socials && (
                        <div className="border-t border-gray-700 pt-4 flex items-center justify-between">
                            <span className="text-sm text-gray-400">Media Sosial:</span>
                            <div className="flex space-x-3">
                                {member.socials.instagram && (
                                    <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="bg-gray-700 hover:bg-amber-500 text-white p-2.5 rounded-full transition-colors">
                                        <FaInstagram className="w-5 h-5" />
                                    </a>
                                )}
                                {member.socials?.facebook && (
                                    <a href={member.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="bg-gray-700 hover:bg-amber-500 text-white p-2.5 rounded-full transition-colors">
                                        <FaFacebookF className="w-5 h-5" />
                                    </a>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MemberModal;
