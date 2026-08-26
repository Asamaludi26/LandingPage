// ============================================================
// APP ROOT
// Root component. Manage global state & modal logic.
// ============================================================

import { useState, useEffect, useRef, useCallback } from 'react';
import type { GalleryImage, TourEvent } from '@/types';
import { GALLERY_IMAGES, TOUR_EVENTS } from '@/data/constants';

// Layout
import { Header } from '@/components/layout/Header';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { Footer } from '@/components/layout/Footer';

// Sections
import { Hero } from '@/components/hero/Hero';
import { About } from '@/components/identity/About';
import { Gallery } from '@/components/fleet/Gallery';
import { Members } from '@/components/members/Members';
import { Events } from '@/components/agenda/Events';
import { Contact } from '@/components/contact/Contact';

// Modals
import { AboutModal } from '@/components/identity/AboutModal';
import { GalleryModal } from '@/components/fleet/GalleryModal';
import { EventModal } from '@/components/agenda/EventModal';

// Common
import { BackToTopButton } from '@/components/common/BackToTopButton';

function App() {
    // ============================================================
    // 🔹 GLOBAL STATE
    // ============================================================
    const [isScrolled, setIsScrolled] = useState(false);          // Header blur/shadow
    const [showBackToTop, setShowBackToTop] = useState(false);     // Back to top button
    const [isMenuOpen, setIsMenuOpen] = useState(false);           // Mobile menu drawer
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null); // Gallery modal
    const [selectedEvent, setSelectedEvent] = useState<TourEvent | null>(null);        // Event modal
    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);                  // About modal
    const [highlightedEventId, setHighlightedEventId] = useState<number | null>(null); // Event highlight
    const modalTriggerRef = useRef<HTMLElement | null>(null);       // Element yang membuka modal (untuk focus restore)
    const [activeSection, setActiveSection] = useState('home');     // Section aktif di navbar

    // Apakah ada modal yang terbuka?
    const isModalOpen = selectedImageIndex !== null || selectedEvent !== null || isAboutModalOpen;

    // ============================================================
    // 🔹 NAVIGATION — Smooth scroll ke section
    // ============================================================
    const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        if (isMenuOpen) setIsMenuOpen(false);

        if (targetId === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const headerElement = document.querySelector('header');
            const headerOffset = headerElement ? headerElement.offsetHeight : 70;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    }, [isMenuOpen]);

    // ============================================================
    // 🔹 CURSOR SPOTLIGHT — Efek cahaya mengikuti mouse
    // ============================================================
    useEffect(() => {
        const spotlight = document.getElementById('cursor-spotlight');
        if (!spotlight) return;
        const handleMouseMove = (e: MouseEvent) => {
            requestAnimationFrame(() => {
                spotlight.style.left = `${e.clientX}px`;
                spotlight.style.top = `${e.clientY}px`;
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // ============================================================
    // 🔹 SCROLL EFFECTS — Header blur & back-to-top button
    // ============================================================
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
            setShowBackToTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // ============================================================
    // 🔹 BODY OVERFLOW — Lock scroll saat modal/menu terbuka
    // ============================================================
    useEffect(() => {
        document.body.style.overflow = isMenuOpen || isModalOpen ? 'hidden' : 'auto';
    }, [isMenuOpen, isModalOpen]);

    // ============================================================
    // 🔹 ACTIVE SECTION — Highlight menu aktif berdasarkan scroll
    // ============================================================
    useEffect(() => {
        const sections = ['home', 'about', 'gallery', 'members', 'events', 'contact'];
        const sectionElements = sections.map(id => document.getElementById(id)).filter(Boolean);

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, { rootMargin: '0px 0px -75% 0px', threshold: 0 });

        sectionElements.forEach(section => { if (section) observer.observe(section); });
        return () => { sectionElements.forEach(section => { if (section) observer.unobserve(section); }); };
    }, []);

    // ============================================================
    // 🔹 MODAL HANDLERS — Buka/tutup modal
    // ============================================================
    const handleMenuToggle = useCallback(() => setIsMenuOpen(prev => !prev), []);

    const handleImageSelect = (selectedImage: GalleryImage, element: HTMLElement) => {
        const imageIndex = GALLERY_IMAGES.findIndex(img => img.id === selectedImage.id);
        if (imageIndex > -1) {
            modalTriggerRef.current = element;
            setSelectedImageIndex(imageIndex);
        }
    };

    const handleEventSelect = (event: TourEvent, element: HTMLElement) => {
        modalTriggerRef.current = element;
        setSelectedEvent(event);
    };

    const handleAboutModalOpen = (element: HTMLElement) => {
        modalTriggerRef.current = element;
        setIsAboutModalOpen(true);
    };

    const handleCloseModals = () => {
        setSelectedImageIndex(null);
        setSelectedEvent(null);
        setIsAboutModalOpen(false);
        modalTriggerRef.current?.focus(); // Kembalikan fokus ke element pembuka
    };

    // ============================================================
    // 🔹 JOIN BUTTON — Scroll ke form contact & focus input
    // ============================================================
    const handleJoinClick = () => {
        setIsMenuOpen(false);
        handleCloseModals();
        setTimeout(() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                const nameInput = contactSection.querySelector<HTMLInputElement>('input[name="name"]');
                if (nameInput) nameInput.focus();
            }
        }, 300);
    };

    // ============================================================
    // 🔹 HERO CTA BUTTON — Scroll ke events & highlight pertama
    // ============================================================
    const handleHeroButtonClick = () => {
        const eventsSection = document.getElementById('events');
        if (eventsSection) {
            eventsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            const firstAvailableEvent = TOUR_EVENTS.find(event => event.status !== 'Completed');
            if (firstAvailableEvent) {
                setTimeout(() => {
                    setHighlightedEventId(firstAvailableEvent.id);
                    setTimeout(() => setHighlightedEventId(null), 2500);
                }, 500);
            }
        }
    };

    // ============================================================
    // 🔹 GALLERY NAVIGATION — Next/Prev gambar di modal
    // ============================================================
    const handleNextImage = () => {
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((prev) => (prev! + 1) % GALLERY_IMAGES.length);
        }
    };
    const handlePrevImage = () => {
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((prev) => (prev! - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
        }
    };

    // ============================================================
    // 🔹 RENDER — Susunan section utama website
    // Urutan di sini = urutan di halaman
    // ============================================================
    return (
        <div className="bg-gray-900">
            {/* Main content — blur + scale saat mobile menu buka */}
            <div className={`transition-all duration-500 ease-in-out ${isMenuOpen ? 'transform scale-[0.95] blur-sm rounded-2xl overflow-hidden' : ''}`}>
                {/* Sticky header */}
                <Header
                    isScrolled={isScrolled}
                    onMenuToggle={handleMenuToggle}
                    activeSection={activeSection}
                    onNavClick={handleNavClick}
                />

                {/* === SECTION ORDER === */}
                <main>
                    <Hero onJoinClick={handleHeroButtonClick} />        {/* 1. Hero — full viewport, CTA */}
                    <About onOpenModal={handleAboutModalOpen} />       {/* 2. About — visi, misi, timeline */}
                    <Gallery onImageSelect={handleImageSelect} />      {/* 3. Gallery — foto perjalanan */}
                    <Members />                                         {/* 4. Core Crew — carousel anggota */}
                    {/* 5. Agenda — jadwal touring */}
                    <Events
                        onEventSelect={handleEventSelect}
                        highlightedEventId={highlightedEventId}
                        onContactClick={handleJoinClick}
                    />
                    <Contact />                                         {/* 6. Contact — form & info */}
                </main>

                {/* Footer — social links, copyright */}
                <Footer onNavClick={handleNavClick} />
            </div>

            {/* Mobile menu drawer — always rendered, toggled by opacity/transform */}
            <MobileMenu
                isOpen={isMenuOpen}
                onMenuToggle={handleMenuToggle}
                onJoinClick={handleJoinClick}
                activeSection={activeSection}
                onNavClick={handleNavClick}
            />

            {/* === MODALS === */}
            {selectedImageIndex !== null && (
                <GalleryModal
                    images={GALLERY_IMAGES}
                    currentIndex={selectedImageIndex}
                    onClose={handleCloseModals}
                    onNext={handleNextImage}
                    onPrev={handlePrevImage}
                    onSelectIndex={(index) => setSelectedImageIndex(index)}
                />
            )}
            {selectedEvent !== null && (
                <EventModal
                    event={selectedEvent}
                    onClose={handleCloseModals}
                    onJoinClick={handleJoinClick}
                />
            )}
            {isAboutModalOpen && (
                <AboutModal onClose={handleCloseModals} onJoinClick={handleJoinClick} />
            )}

            {/* Floating back-to-top button */}
            <BackToTopButton isVisible={showBackToTop} isMenuOpen={isMenuOpen} />
        </div>
    );
}

export default App;
