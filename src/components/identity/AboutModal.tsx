import React, { useRef, useEffect } from 'react';
import { HiOutlineX } from 'react-icons/hi';

export const AboutModal: React.FC<{ onClose: () => void; onJoinClick: () => void; }> = ({ onClose, onJoinClick }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'Tab' && modalRef.current) {
                const focusable = modalRef.current.querySelectorAll<HTMLElement>('button');
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
        <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4 transition-opacity duration-300" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="about-modal-title">
            <div ref={modalRef} className="relative bg-gray-800 text-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 opacity-0 animate-fade-scale-in" onClick={e => e.stopPropagation()}>
                <div className="p-6 sm:p-8">
                    <div className="flex justify-between items-start">
                        <h3 id="about-modal-title" className="text-2xl sm:text-3xl font-bold text-amber-500">Kisah Kami: VeloBikers</h3>
                        <button onClick={onClose} aria-label="Tutup detail" className="text-gray-400 hover:text-white transition-colors"><HiOutlineX className="w-7 h-7" /></button>
                    </div>
                    <div className="mt-6 space-y-6 text-gray-300 text-left">
                        <div>
                            <h4 className="font-bold text-lg mb-2 text-white">Sejarah Kami</h4>
                            <p>VeloBikers lahir dari percikan ide sederhana di antara beberapa sahabat: menciptakan sebuah keluarga bagi para pengendara yang tidak hanya berbagi kecintaan pada sepeda motor, tetapi juga rasa hormat pada jalan dan satu sama lain. Dimulai dari perjalanan akhir pekan kecil, kami telah tumbuh menjadi komunitas yang erat, menjelajahi ribuan kilometer dan menciptakan kenangan tak terhitung di seluruh nusantara.</p>
                        </div>
                        <div className="border-t border-gray-700 pt-6">
                            <h4 className="font-bold text-lg mb-2 text-white">Visi Kami</h4>
                            <p>Menjadi komunitas sepeda motor touring terdepan di Indonesia, yang dikenal karena persaudaraan yang erat, petualangan yang tak terlupakan, dan komitmen yang tak tergoyahkan terhadap keselamatan berkendara.</p>
                        </div>
                         <div className="border-t border-gray-700 pt-6">
                            <h4 className="font-bold text-lg mb-2 text-white">Misi Kami</h4>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Menciptakan lingkungan yang ramah, inklusif, dan mendukung bagi semua pengendara, tanpa memandang jenis sepeda motor atau tingkat pengalaman.</li>
                                <li>Menyelenggarakan tur dan acara yang terorganisir dengan baik yang tidak hanya menjelajahi keindahan Indonesia tetapi juga memberikan dampak positif bagi komunitas lokal.</li>
                                <li>Mempromosikan dan menanamkan praktik berkendara yang aman dan bertanggung jawab sebagai inti dari setiap kegiatan kami.</li>
                                <li>Membangun ikatan persahabatan yang kuat dan langgeng antar anggota melalui kegiatan di dalam dan di luar jalan raya.</li>
                            </ul>
                        </div>
                        <div className="text-center pt-6">
                           <button onClick={onJoinClick} className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-5 rounded-full transition-all duration-300 text-sm">Tertarik Bergabung?</button>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
              @keyframes fade-scale-in {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
              }
              .animate-fade-scale-in {
                animation: fade-scale-in 0.3s ease-out forwards;
              }
            `}</style>
        </div>
    );
};

export default AboutModal;
