import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import type { MemberProfile } from '@/types';
import { MEMBER_PROFILES } from '@/data/constants';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { MemberModal } from '@/components/members/MemberModal';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import { FaInstagram, FaFacebookF, FaMotorcycle } from 'react-icons/fa';

export const Members: React.FC = () => {
    const totalMembers = MEMBER_PROFILES.length;
    // Start at totalMembers (middle set of a triple-buffered list)
    const [currentIndex, setCurrentIndex] = useState(totalMembers);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [selectedMember, setSelectedMember] = useState<MemberProfile | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState<number>(1100);

    // Update container width dynamically on resize
    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.clientWidth);
            } else {
                const w = window.innerWidth;
                setContainerWidth(Math.min(w - 32, 1200));
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        
        let observer: ResizeObserver | null = null;
        if (containerRef.current && typeof ResizeObserver !== 'undefined') {
            observer = new ResizeObserver(entries => {
                for (const entry of entries) {
                    if (entry.contentRect.width > 0) {
                        setContainerWidth(entry.contentRect.width);
                    }
                }
            });
            observer.observe(containerRef.current);
        }

        return () => {
            window.removeEventListener('resize', updateDimensions);
            observer?.disconnect();
        };
    }, []);

    // Calculate card width and center offset based on container width
    const { cardWidth, centerOffset } = useMemo(() => {
        let width = containerWidth / 3; // Desktop default: 3 cards visible
        if (containerWidth < 640) {
            width = containerWidth * 0.84; // Mobile: 84% width with side peeks
        } else if (containerWidth < 1024) {
            width = containerWidth * 0.52; // Tablet: 52% width
        }
        const offset = (containerWidth - width) / 2;
        return { cardWidth: width, centerOffset: offset };
    }, [containerWidth]);

    // Triple list for infinite continuous circular scrolling
    const extendedMembers = useMemo(() => [
        ...MEMBER_PROFILES,
        ...MEMBER_PROFILES,
        ...MEMBER_PROFILES
    ], []);

    // Re-enable transition smoothly after an instant wrap reset
    useEffect(() => {
        if (!isTransitioning) {
            const raf = requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setIsTransitioning(true);
                });
            });
            return () => cancelAnimationFrame(raf);
        }
    }, [isTransitioning]);

    // Touch & Drag Support
    const dragStartX = useRef<number | null>(null);
    const dragDeltaX = useRef<number>(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);

    const AUTO_INTERVAL = 3500; // 3.5s per slide

    const handleNext = useCallback(() => {
        setIsTransitioning(true);
        setCurrentIndex(prev => prev + 1);
    }, []);

    const handlePrev = useCallback(() => {
        setIsTransitioning(true);
        setCurrentIndex(prev => prev - 1);
    }, []);

    // Seamless infinite wrap handler on the main track ONLY
    const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
        // Prevent bubbled transition events from children
        if (e.target !== e.currentTarget) return;
        if (e.propertyName !== 'transform') return;

        if (currentIndex >= totalMembers * 2) {
            setIsTransitioning(false);
            setCurrentIndex(prev => prev - totalMembers);
        } else if (currentIndex < totalMembers) {
            setIsTransitioning(false);
            setCurrentIndex(prev => prev + totalMembers);
        }
    };

    // Auto-play interval timer
    useEffect(() => {
        if (isHovered || isDragging) return;

        const timer = setInterval(() => {
            handleNext();
        }, AUTO_INTERVAL);

        return () => clearInterval(timer);
    }, [isHovered, isDragging, handleNext]);

    // Touch & Drag Handlers
    const onTouchStart = (e: React.TouchEvent) => {
        dragStartX.current = e.touches[0].clientX;
        dragDeltaX.current = 0;
        setIsDragging(true);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (dragStartX.current === null) return;
        const currentX = e.touches[0].clientX;
        dragDeltaX.current = currentX - dragStartX.current;
        setDragOffset(dragDeltaX.current);
    };

    const onTouchEnd = () => {
        if (Math.abs(dragDeltaX.current) > 40) {
            if (dragDeltaX.current < 0) {
                handleNext();
            } else {
                handlePrev();
            }
        }
        dragStartX.current = null;
        dragDeltaX.current = 0;
        setDragOffset(0);
        setIsDragging(false);
    };

    const onMouseDown = (e: React.MouseEvent) => {
        dragStartX.current = e.clientX;
        dragDeltaX.current = 0;
        setIsDragging(true);
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || dragStartX.current === null) return;
        dragDeltaX.current = e.clientX - dragStartX.current;
        setDragOffset(dragDeltaX.current);
    };

    const onMouseUp = () => {
        if (isDragging) {
            if (Math.abs(dragDeltaX.current) > 40) {
                if (dragDeltaX.current < 0) {
                    handleNext();
                } else {
                    handlePrev();
                }
            }
            dragStartX.current = null;
            dragDeltaX.current = 0;
            setDragOffset(0);
            setIsDragging(false);
        }
    };

    const onMouseLeave = () => {
        if (isDragging) {
            onMouseUp();
        }
        setIsHovered(false);
    };

    // Calculate current active member index for dots
    const activeDotIndex = ((currentIndex % totalMembers) + totalMembers) % totalMembers;

    // Exact pixel-based translate to position the active card precisely at the center
    const currentTranslateX = -(currentIndex * cardWidth) + centerOffset + dragOffset;

    return (
        <AnimatedSection id="members" className="py-16 sm:py-24 bg-gray-900 text-white overflow-hidden relative isolate w-full max-w-full" hasAurora>
            <div className="container mx-auto px-4 sm:px-6">
                {/* Header & Controls */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-10 gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight reveal">The Core Crew</h3>
                        <p className="text-gray-400 mt-2 max-w-xl text-sm sm:text-base reveal" style={{ transitionDelay: '150ms' }}>
                            The passionate individuals steering the VeloBikers community.
                        </p>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="flex items-center justify-center md:justify-end space-x-2 reveal" style={{ transitionDelay: '300ms' }}>
                        <button 
                            onClick={handlePrev}
                            aria-label="Previous member"
                            className="w-10 h-10 rounded-full bg-gray-800 hover:bg-amber-500 text-gray-300 hover:text-white border border-gray-700 hover:border-amber-500 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-md shadow-black/40"
                        >
                            <HiOutlineChevronLeft className="w-5 h-5" />
                        </button>
                        <button 
                            onClick={handleNext}
                            aria-label="Next member"
                            className="w-10 h-10 rounded-full bg-gray-800 hover:bg-amber-500 text-gray-300 hover:text-white border border-gray-700 hover:border-amber-500 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-md shadow-black/40"
                        >
                            <HiOutlineChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Carousel Viewport with Strict Fixed Height to prevent any layout shift */}
                <div 
                    ref={containerRef}
                    className="relative overflow-hidden w-full max-w-full isolate h-[520px] sm:h-[560px] flex items-center cursor-grab active:cursor-grabbing select-none"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={onMouseLeave}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                >
                    {/* Sliding Track - Pixel-perfect transform */}
                    <div 
                        className="carousel-track flex items-center h-full"
                        onTransitionEnd={handleTransitionEnd}
                        style={{
                            transform: `translate3d(${currentTranslateX}px, 0, 0)`,
                            transition: isTransitioning && !isDragging ? 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
                        }}
                    >
                        {extendedMembers.map((member, index) => {
                            const isCenterActive = index === currentIndex;

                            return (
                                <div 
                                    key={`${member.id}-${index}`}
                                    className="flex-shrink-0 px-2.5 sm:px-3.5 h-full flex items-center justify-center"
                                    style={{ width: `${cardWidth}px` }}
                                >
                                    {/* Card container with constant layout height & purely transform-based zoom */}
                                    <div 
                                        onClick={() => {
                                            if (isCenterActive) {
                                                setSelectedMember(member);
                                            } else {
                                                setIsTransitioning(true);
                                                setCurrentIndex(index);
                                            }
                                        }}
                                        className={`group relative rounded-2xl overflow-hidden flex flex-col justify-end shadow-2xl cursor-pointer w-full h-[460px] sm:h-[500px] bg-gray-800 transition-all duration-500 ease-out ${
                                            isCenterActive 
                                                ? 'scale-100 sm:scale-105 z-20 border-2 border-amber-500 shadow-amber-500/25 opacity-100 filter-none ring-1 ring-amber-500/40' 
                                                : 'scale-[0.92] sm:scale-95 z-10 border border-gray-700/60 opacity-40 blur-[1.5px] sm:blur-[2px] hover:opacity-70 hover:blur-none'
                                        }`}
                                    >
                                        {/* Background Image */}
                                        <img 
                                            src={member.avatarSrc} 
                                            alt={member.name} 
                                            loading="lazy" 
                                            decoding="async" 
                                            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out pointer-events-none ${
                                                isCenterActive ? 'group-hover:scale-105' : ''
                                            }`}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/75 to-transparent pointer-events-none"></div>

                                        {/* Top Role Badge */}
                                        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10">
                                            <span className={`text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 rounded-full shadow-sm backdrop-blur-md border ${
                                                isCenterActive
                                                    ? 'bg-amber-500 text-gray-950 font-bold border-amber-400'
                                                    : 'bg-black/60 text-amber-400 border-amber-500/30'
                                            }`}>
                                                {member.role}
                                            </span>
                                        </div>

                                        {/* Card Body Content */}
                                        <div className="relative p-4 sm:p-6 z-10 flex flex-col justify-end">
                                            <h4 className={`font-bold text-white transition-colors duration-300 ${
                                                isCenterActive ? 'text-xl sm:text-2xl text-amber-400' : 'text-lg sm:text-xl'
                                            }`}>
                                                {member.name}
                                            </h4>

                                            {/* Bike Tag */}
                                            <div className="inline-flex items-center text-xs sm:text-sm text-gray-300 mt-2 bg-gray-900/80 backdrop-blur-sm border border-gray-700/70 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg w-fit max-w-full">
                                                <FaMotorcycle className="w-3.5 h-3.5 mr-2 text-amber-500 flex-shrink-0" />
                                                <span className="font-medium truncate">{member.bike}</span>
                                            </div>

                                            {/* Quote */}
                                            <p className="text-gray-300 italic text-xs sm:text-sm mt-2.5 sm:mt-3 border-l-2 border-amber-500 pl-3 line-clamp-2 leading-relaxed">
                                                "{member.quote}"
                                            </p>

                                            {/* Action Buttons Footer */}
                                            <div className="flex items-center justify-between mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-gray-700/60">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedMember(member);
                                                    }}
                                                    className="text-xs sm:text-sm text-amber-400 hover:text-amber-300 font-semibold flex items-center transition-transform duration-300 group-hover:translate-x-1"
                                                >
                                                    Lihat Profil
                                                    <HiOutlineChevronRight className="w-4 h-4 ml-1" />
                                                </button>

                                                <div className="flex items-center space-x-2 sm:space-x-3">
                                                    {member.socials?.instagram && (
                                                        <a 
                                                            href={member.socials.instagram} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer" 
                                                            aria-label={`${member.name}'s Instagram`} 
                                                            className="text-gray-400 hover:text-amber-500 p-1.5 rounded-full hover:bg-gray-800/80 transition-colors"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5" />
                                                        </a>
                                                    )}
                                                    {member.socials?.facebook && (
                                                        <a 
                                                            href={member.socials.facebook} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer" 
                                                            aria-label={`${member.name}'s Facebook`} 
                                                            className="text-gray-400 hover:text-amber-500 p-1.5 rounded-full hover:bg-gray-800/80 transition-colors"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <FaFacebookF className="w-4 h-4 sm:w-5 sm:h-5" />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Pagination Dots */}
                <div className="flex items-center justify-center space-x-2 mt-4">
                    {MEMBER_PROFILES.map((m, idx) => {
                        const isActive = idx === activeDotIndex;
                        return (
                            <button
                                key={m.id}
                                onClick={() => {
                                    setIsTransitioning(true);
                                    setCurrentIndex(totalMembers + idx);
                                }}
                                aria-label={`View ${m.name}`}
                                className={`transition-all duration-300 rounded-full h-2.5 ${
                                    isActive 
                                        ? 'w-8 bg-amber-500 shadow-md shadow-amber-500/50' 
                                        : 'w-2.5 bg-gray-700 hover:bg-gray-500'
                                }`}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Member Modal */}
            {selectedMember && (
                <MemberModal 
                    member={selectedMember} 
                    onClose={() => setSelectedMember(null)} 
                />
            )}
        </AnimatedSection>
    );
};

export default Members;
