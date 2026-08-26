import React, { useRef, useEffect } from 'react';

export const Hero: React.FC<{ onJoinClick: () => void }> = ({ onJoinClick }) => {
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (textRef.current) {
                const scrollY = window.scrollY;
                // Apply parallax effect only within the hero section's visibility
                if (scrollY < window.innerHeight) {
                    textRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    return (
        <section id="home" className="relative h-screen bg-gray-900 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-black/70 z-10"></div>
            <div className="absolute inset-0 ken-burns-bg" style={{backgroundImage: "url('https://picsum.photos/seed/herobike/1920/1080')"}}></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
            <div ref={textRef} className="relative text-center text-white px-4 z-20 will-change-transform">
                <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase">Ride the Horizon</h2>
                <p className="text-lg sm:text-xl md:text-2xl mt-4 max-w-3xl mx-auto font-light text-gray-200">
                    Brotherhood, Adventure, and the Open Road. This is VeloBikers.
                </p>
                <button onClick={onJoinClick} className="mt-8 inline-block bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-3 px-6 sm:px-8 text-base sm:text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-500/30">
                    Join Our Next Ride
                </button>
            </div>
        </section>
    );
};

export default Hero;
