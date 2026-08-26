import React, { useState, useRef } from 'react';
import type { GalleryImage } from '@/types';
import { HiOutlineZoomIn } from 'react-icons/hi';

export const GalleryItem: React.FC<{ image: GalleryImage & { leaving?: boolean }; index: number; onImageSelect: (image: GalleryImage, element: HTMLElement) => void }> = ({ image, index, onImageSelect }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const triggerRef = useRef<HTMLDivElement>(null);

    const itemClasses = `group relative overflow-hidden rounded-lg shadow-lg cursor-pointer aspect-[4/3] bg-gray-700 ${
        image.leaving ? 'gallery-item-animate-out' : 'gallery-item-animate-in'
    }`;

    return (
        <div
            ref={triggerRef}
            onClick={() => triggerRef.current && onImageSelect(image, triggerRef.current)}
            className={itemClasses}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && triggerRef.current && onImageSelect(image, triggerRef.current)}
            style={{ animationDelay: image.leaving ? '0ms' : `${(index % 9) * 80}ms` }}
        >
            <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                onLoad={() => setIsLoaded(true)}
                className={`w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <HiOutlineZoomIn className="w-12 h-12 text-white transition-transform duration-300 transform scale-75 group-hover:scale-100"/>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white pointer-events-none">
                <h4 className="font-bold text-base truncate transition-transform duration-300 group-hover:-translate-y-2">{image.caption}</h4>
                <p className="text-sm text-gray-300 truncate transition-transform duration-300 group-hover:-translate-y-2">{image.location}</p>
            </div>
        </div>
    );
};

export default GalleryItem;
