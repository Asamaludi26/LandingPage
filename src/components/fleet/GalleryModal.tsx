import React, { useRef, useState, useEffect } from 'react';
import type { GalleryImage } from '@/types';
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineX, HiOutlineInformationCircle } from 'react-icons/hi';

export const GalleryModal: React.FC<{
    images: GalleryImage[];
    currentIndex: number;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
    onSelectIndex: (index: number) => void;
}> = ({ images, currentIndex, onClose, onNext, onPrev, onSelectIndex }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const activeThumbnailRef = useRef<HTMLButtonElement>(null);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);
    const image = images[currentIndex];

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
            if (e.key === 'Tab' && modalRef.current) {
                const focusable = modalRef.current.querySelectorAll<HTMLElement>('button');
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
                if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        setTimeout(() => {
            const closeButton = modalRef.current?.querySelector('button[aria-label="Close gallery"]');
            if (closeButton instanceof HTMLElement) closeButton.focus();
        }, 100);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, onNext, onPrev]);

    useEffect(() => {
        activeThumbnailRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }, [currentIndex]);

    return (
        <div ref={modalRef} className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4 transition-opacity duration-300 animate-modal-fade-in" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="gallery-caption">
            <button onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Previous image" className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black/80 transition-colors z-10 hidden sm:block"><HiOutlineChevronLeft className="w-8 h-8"/></button>
            <div className="relative max-w-5xl max-h-[95vh] w-full text-white flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <div key={image.id} className="relative w-full h-auto max-h-[65vh] flex items-center justify-center mb-4 animate-gallery-fade-in">
                    {!isImageLoaded && <div className="absolute inset-0 bg-gray-700 rounded-lg animate-pulse"></div>}
                    <img 
                        src={image.src} 
                        alt={image.alt}
                        onLoad={() => setIsImageLoaded(true)}
                        className={`transition-opacity duration-300 w-full h-auto max-h-[65vh] object-contain rounded-lg ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    />
                </div>

                <div className="text-center w-full max-w-3xl px-4" key={`details-${currentIndex}`}>
                    <div className="flex justify-center items-center gap-3">
                        <div>
                            <h3 id="gallery-caption" className="text-xl font-bold">{image.caption}</h3>
                            <p className="text-gray-400 text-sm">{image.location} - {image.date}</p>
                        </div>
                        <button
                            onClick={() => setIsDetailsVisible(v => !v)}
                            aria-label="Toggle image details"
                            aria-expanded={isDetailsVisible}
                            className={`text-gray-400 hover:text-white transition-colors p-1 rounded-full ${isDetailsVisible ? 'text-amber-500 bg-amber-900/50' : ''}`}
                        >
                           <HiOutlineInformationCircle className="w-6 h-6" />
                        </button>
                    </div>
                     <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isDetailsVisible ? 'max-h-48 mt-4' : 'max-h-0'}`}>
                        <p className="text-gray-300 text-sm text-left bg-black/20 p-4 rounded-lg leading-relaxed">{image.details}</p>
                    </div>
                </div>
                
                <div className="mt-4 w-full max-w-3xl">
                    <div className="thumbnail-scroll flex items-center space-x-2 p-2 overflow-x-auto">
                        {images.map((thumb, index) => (
                            <button
                                key={thumb.id}
                                ref={index === currentIndex ? activeThumbnailRef : null}
                                onClick={() => onSelectIndex(index)}
                                aria-label={`View image ${index + 1}: ${thumb.caption}`}
                                className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-amber-500 ${currentIndex === index ? 'ring-2 ring-amber-500 scale-105' : 'opacity-60 hover:opacity-100'}`}
                            >
                                <img src={thumb.src} alt={thumb.alt} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                     <p className="text-xs text-gray-500 mt-2 text-center hidden sm:block">Gunakan tombol ← dan → untuk navigasi</p>
                </div>
            </div>
            <button onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next image" className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black/80 transition-colors z-10 hidden sm:block"><HiOutlineChevronRight className="w-8 h-8"/></button>
            <button onClick={onClose} aria-label="Close gallery" className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/80 transition-colors z-10"><HiOutlineX className="w-8 h-8" /></button>
            <style>{`
                @keyframes gallery-fade-in {
                    from { opacity: 0; transform: scale(0.98); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-gallery-fade-in { animation: gallery-fade-in 0.3s ease-out forwards; }
                @keyframes modal-fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-modal-fade-in { animation: modal-fade-in 0.3s ease-out forwards; }
                .thumbnail-scroll::-webkit-scrollbar { height: 8px; }
                .thumbnail-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.1); border-radius: 4px; }
                .thumbnail-scroll::-webkit-scrollbar-thumb { background: #f59e0b; border-radius: 4px; }
                .thumbnail-scroll::-webkit-scrollbar-thumb:hover { background: #d97706; }
            `}</style>
        </div>
    );
};

export default GalleryModal;
