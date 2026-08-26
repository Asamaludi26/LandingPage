import React, { useRef } from 'react';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { AnimatedCounter } from '@/components/hero/AnimatedCounter';
import { HiOutlineShieldCheck, HiOutlineGlobeAlt, HiOutlineUsers } from 'react-icons/hi';

export const About: React.FC<{ onOpenModal: (element: HTMLElement) => void }> = ({ onOpenModal }) => {
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <AnimatedSection id="about" className="py-20 sm:py-24 bg-gray-900 text-white" hasAurora>
        <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto relative z-10">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 reveal">
                    Lebih dari Sekadar Klub, Ini adalah <span className="text-amber-500">Persaudaraan</span>
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed reveal" style={{ transitionDelay: '150ms' }}>
                    VeloBikers bukan hanya komunitas; ini adalah persaudaraan yang ditempa di atas aspal. Kami adalah sekelompok pengendara penuh semangat yang memiliki kecintaan mendalam untuk touring dan menjelajahi cakrawala baru.
                </p>
                <p className="text-gray-400 leading-relaxed reveal" style={{ transitionDelay: '300ms' }}>
                   Dari jalur pegunungan yang indah hingga jalan pesisir yang tenang, setiap perjalanan adalah kenangan baru. Filosofi kami sederhana: Berkendara dengan hormat, saling mendukung, dan merangkul kebebasan jalanan terbuka.
                </p>
                <div className="mt-8 reveal" style={{ transitionDelay: '450ms' }}>
                    <button
                        ref={triggerRef}
                        onClick={() => triggerRef.current && onOpenModal(triggerRef.current)}
                        className="bg-transparent border-2 border-amber-500 hover:bg-amber-500 text-amber-500 hover:text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
                    >
                        Baca Kisah Kami
                    </button>
                </div>
            </div>
            
            <div className="my-12 sm:my-16 max-w-5xl mx-auto reveal" style={{ transitionDelay: '450ms' }}>
                <div className="aspect-video rounded-lg shadow-2xl shadow-black/30 overflow-hidden">
                    <video 
                        src="https://videos.pexels.com/video-files/853874/853874-hd_1280_720_25fps.mp4" 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        className="w-full h-full object-cover"
                        aria-label="VeloBikers Community on a scenic road"
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12 text-center">
                <div className="reveal" style={{ transitionDelay: '600ms' }}>
                    <div className="flex justify-center mb-4">
                        <div className="bg-gray-800 p-4 rounded-full">
                            <HiOutlineShieldCheck className="w-10 h-10 text-amber-500" />
                        </div>
                    </div>
                    <h4 className="text-xl font-bold mb-2">Keselamatan & Rasa Hormat</h4>
                    <p className="text-gray-400">Kami memprioritaskan keselamatan setiap pengendara. Perjalanan kami dibangun di atas rasa saling menghormati satu sama lain, jalan, dan masyarakat yang kami kunjungi.</p>
                </div>
                <div className="reveal" style={{ transitionDelay: '750ms' }}>
                    <div className="flex justify-center mb-4">
                         <div className="bg-gray-800 p-4 rounded-full">
                            <HiOutlineGlobeAlt className="w-10 h-10 text-amber-500" />
                        </div>
                    </div>
                    <h4 className="text-xl font-bold mb-2">Petualangan & Penemuan</h4>
                    <p className="text-gray-400">Gairah kami adalah menemukan yang belum ditemukan. Kami mencari jalan baru, pemandangan yang menakjubkan, dan pengalaman tak terlupakan di atas dua roda.</p>
                </div>
                 <div className="reveal" style={{ transitionDelay: '900ms' }}>
                     <div className="flex justify-center mb-4">
                         <div className="bg-gray-800 p-4 rounded-full">
                            <HiOutlineUsers className="w-10 h-10 text-amber-500" />
                        </div>
                    </div>
                    <h4 className="text-xl font-bold mb-2">Persaudaraan & Dukungan</h4>
                    <p className="text-gray-400">Tidak ada pengendara yang tertinggal. Kami adalah keluarga yang mendukung, membimbing, dan berbagi semangat berkendara, menciptakan ikatan seumur hidup.</p>
                </div>
            </div>

            <div className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
                <AnimatedCounter target={85} suffix="+" text="Anggota Aktif" />
                <AnimatedCounter target={87750} suffix="km" text="Kilometer Ditempuh" />
                <AnimatedCounter target={50} text="Acara Diadakan" />
            </div>
        </div>
    </AnimatedSection>
  );
};

export default About;
