import React, { useRef, useEffect } from 'react';
import type { TourEvent } from '@/types';
import { HiOutlineX, HiOutlineLocationMarker, HiOutlineChartBar, HiOutlineCog, HiOutlineCalendar } from 'react-icons/hi';
import { FaWhatsapp, FaTwitter, FaLink } from 'react-icons/fa';

export const EventModal: React.FC<{ event: TourEvent; onClose: () => void; onJoinClick: () => void; }> = ({ event, onClose, onJoinClick }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'Tab' && modalRef.current) {
                const focusable = modalRef.current.querySelectorAll<HTMLElement>('button, iframe, a');
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

    const createCalendarLink = (service: 'google' | 'ics') => {
        const title = encodeURIComponent(event.title);
        const description = encodeURIComponent(event.description);
        const location = encodeURIComponent(event.details.meetingPoint);
        const [day, monthStr, year] = event.date.split(' ');
        const monthMap: {[key: string]: string} = { 'JAN': '01', 'FEB': '02', 'MAR': '03', 'APR': '04', 'MAY': '05', 'JUN': '06', 'JUL': '07', 'AUG': '08', 'SEP': '09', 'OCT': '10', 'NOV': '11', 'DEC': '12' };
        const month = monthMap[monthStr];
        const startTime = `${year}${month}${day}T080000`;
        const endTime = `${year}${month}${day}T160000`;
        if (service === 'google') {
            return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${description}&location=${location}`;
        }
        return '#'; // Placeholder for ICS generation
    };

    const shareLink = (service: 'twitter' | 'whatsapp' | 'copy') => {
        const url = window.location.href.split('#')[0] + '#events';
        const text = `Check out this motorcycle event: ${event.title} on ${event.date}! Join me?`;
        if (service === 'twitter') return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        if (service === 'whatsapp') return `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`;
        if (service === 'copy') {
            navigator.clipboard.writeText(`${text} ${url}`).then(() => alert('Link copied to clipboard!'));
            return '#';
        }
        return '#';
    };

    const isRegistrationOpen = event.status === 'Registration Open' || event.status === 'Limited Slots';

    return (
        <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4 transition-opacity duration-300 animate-modal-fade-in" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="event-title">
            <div ref={modalRef} className="relative bg-gray-800 text-white rounded-lg shadow-xl max-w-4xl w-full max-h-[95vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="relative h-64 sm:h-80 w-full">
                    <img src={event.imageSrc.replace('/400/300', '/1200/400')} alt={event.title} className="absolute inset-0 w-full h-full object-cover rounded-t-lg" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-gray-800/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                        <h3 id="event-title" className="text-3xl sm:text-4xl font-bold text-white shadow-black [text-shadow:1px_1px_4px_var(--tw-shadow-color)]">{event.title}</h3>
                        <p className="text-gray-200 mt-1 font-semibold">{event.date}</p>
                    </div>
                    <button onClick={onClose} aria-label="Close event details" className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors z-10"><HiOutlineX className="w-7 h-7" /></button>
                </div>

                <div className="p-6 sm:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                        <div className="md:col-span-3">
                            <p className="text-gray-300 leading-relaxed mb-8">{event.description}</p>
                            <h4 className="font-bold text-lg mb-4 text-amber-500">Route Overview</h4>
                            <iframe title="Event Route" src={event.details.mapUrl} width="100%" height="250" style={{ border: 0 }} allowFullScreen loading="lazy" className="rounded-md"></iframe>
                        </div>
                        <div className="md:col-span-2">
                             <div className="space-y-4 text-gray-300 bg-gray-900/50 p-4 rounded-lg">
                                <div className="flex items-center">
                                    <HiOutlineLocationMarker className="w-6 h-6 mr-3 text-amber-500 flex-shrink-0"/>
                                    <div><strong className="block text-gray-200">Meeting Point</strong>{event.details.meetingPoint}</div>
                                </div>
                                <div className="flex items-center">
                                    <HiOutlineChartBar className="w-6 h-6 mr-3 text-amber-500 flex-shrink-0"/>
                                    <div><strong className="block text-gray-200">Difficulty</strong><span className={`px-2 py-0.5 text-xs font-bold rounded-full ${event.details.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-300' : event.details.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-red-500/20 text-red-300'}`}>{event.details.difficulty}</span></div>
                                </div>
                                 <div className="flex items-start">
                                    <HiOutlineCog className="w-6 h-6 mr-3 text-amber-500 flex-shrink-0 mt-1"/>
                                    <div><strong className="block text-gray-200">Required Gear</strong>{event.details.requiredGear.join(', ')}</div>
                                </div>
                             </div>

                             <h4 className="font-bold text-lg mt-8 mb-3 text-amber-500">Schedule</h4>
                             <ul className="list-disc list-inside space-y-1 text-gray-300">
                                {event.details.schedule.map(item => <li key={item}>{item}</li>)}
                             </ul>
                        </div>
                    </div>

                     <div className="mt-8 border-t border-gray-700 pt-6 flex flex-wrap items-center justify-between gap-4">
                         <div className="flex items-center gap-4">
                            <a href={createCalendarLink('google')} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-3 rounded-full transition-colors">
                                <HiOutlineCalendar className="w-5 h-5 mr-2" /> Add to Calendar
                            </a>
                             <div className="flex items-center gap-2">
                                <a href={shareLink('whatsapp')} data-action="share/whatsapp/share" target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp" className="text-gray-400 hover:text-white"><FaWhatsapp className="w-6 h-6"/></a>
                                <a href={shareLink('twitter')} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter" className="text-gray-400 hover:text-white"><FaTwitter className="w-6 h-6"/></a>
                                <button onClick={() => shareLink('copy')} aria-label="Copy event link" className="text-gray-400 hover:text-white"><FaLink className="w-6 h-6"/></button>
                            </div>
                         </div>
                         {isRegistrationOpen && (
                             <button onClick={onJoinClick} className="bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-500/30 w-full sm:w-auto">
                                Register for this Ride
                            </button>
                         )}
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes modal-fade-in { from { opacity: 0; } to { opacity: 1; } }
                .animate-modal-fade-in { animation: modal-fade-in 0.3s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default EventModal;
