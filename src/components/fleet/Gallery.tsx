import React, { useState, useMemo } from 'react';
import type { GalleryImage } from '@/types';
import { GALLERY_IMAGES } from '@/data/constants';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { GalleryItem } from '@/components/fleet/GalleryItem';

export const Gallery: React.FC<{ onImageSelect: (image: GalleryImage, element: HTMLElement) => void }> = ({ onImageSelect }) => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [displayedImages, setDisplayedImages] = useState<Array<GalleryImage & { leaving?: boolean }>>(GALLERY_IMAGES);

    const locations = useMemo(() =>
        ['All', ...Array.from(new Set(GALLERY_IMAGES.map(img => img.location)))]
    , []);

    const handleFilterChange = (newFilter: string) => {
        if (newFilter === activeFilter) return;

        setActiveFilter(newFilter);

        const newFilteredImages = newFilter === 'All'
            ? GALLERY_IMAGES
            : GALLERY_IMAGES.filter(img => img.location === newFilter);

        setDisplayedImages(currentImages => {
            return currentImages.map(img => {
                if (!newFilteredImages.find(filteredImg => filteredImg.id === img.id)) {
                    return { ...img, leaving: true };
                }
                return img;
            }).filter(img => img); // Ensure we don't have undefined items
        });

        setTimeout(() => {
            setDisplayedImages(newFilteredImages.map(img => ({...img, leaving: false})));
        }, 400); // Must match .gallery-item-animate-out duration
    };

    return (
        <AnimatedSection id="gallery" className="py-20 sm:py-24 bg-gray-800 text-white">
            <div className="container mx-auto px-4 sm:px-6 text-center">
                <div>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 reveal">Our Journeys</h3>
                    <p className="text-gray-400 mb-10 sm:mb-12 max-w-2xl mx-auto reveal" style={{ transitionDelay: '150ms' }}>A glimpse into the memories we've created on the road.</p>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-10 sm:mb-12 reveal" style={{ transitionDelay: '300ms' }}>
                    {locations.map(location => (
                        <button
                            key={location}
                            onClick={() => handleFilterChange(location)}
                            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${activeFilter === location ? 'bg-amber-500 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}
                        >
                            {location}
                        </button>
                    ))}
                </div>

                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                >
                    {displayedImages.map((image, index) => (
                        <GalleryItem key={image.id} image={image} index={index} onImageSelect={onImageSelect} />
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

export default Gallery;
