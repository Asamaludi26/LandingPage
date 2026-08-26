import React, { useState, useMemo } from 'react';
import type { TourEvent } from '@/types';
import { TOUR_EVENTS } from '@/data/constants';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { CountdownTimer } from '@/components/agenda/CountdownTimer';
import { HiOutlineCalendar, HiOutlineClock, HiOutlineFilter, HiOutlineArrowRight, HiOutlineLocationMarker, HiOutlineShieldCheck, HiOutlineSparkles } from 'react-icons/hi';

export const Events: React.FC<{
    onEventSelect: (event: TourEvent, element: HTMLElement) => void;
    highlightedEventId: number | null;
    onContactClick: () => void;
}> = ({ onEventSelect, highlightedEventId: _highlightedEventId, onContactClick }) => {
    const [view, setView] = useState<'upcoming' | 'past'>('upcoming');
    const [selectedYear, setSelectedYear] = useState<string>('all');

    // Helper to parse date string like "14 NOV 2026"
    const parseEventDate = (dateStr: string) => {
        const parts = dateStr.trim().split(' ');
        if (parts.length === 3) {
            return { day: parts[0], month: parts[1], year: parts[2] };
        }
        return { day: '', month: '', year: '' };
    };

    const { upcomingEvents, pastEvents, featuredEvent } = useMemo(() => {
        const now = new Date();
        const allEvents = [...TOUR_EVENTS].sort((a, b) => +new Date(a.date) - +new Date(b.date));
        
        const upcoming = allEvents.filter(event => new Date(event.date) >= now);
        const past = allEvents.filter(event => new Date(event.date) < now).reverse(); // Show most recent past events first
        
        const featured = upcoming[0] || null;

        return { upcomingEvents: upcoming, pastEvents: past, featuredEvent: featured };
    }, []);

    // Current active dataset
    const activeTabEvents = view === 'upcoming' ? upcomingEvents : pastEvents;

    // Available years for current tab
    const availableYears = useMemo(() => {
        const yearsSet = new Set<string>();
        activeTabEvents.forEach(e => {
            const { year } = parseEventDate(e.date);
            if (year) yearsSet.add(year);
        });
        return Array.from(yearsSet).sort((a, b) => view === 'upcoming' ? a.localeCompare(b) : b.localeCompare(a));
    }, [activeTabEvents, view]);

    // Derive effective selected year — reset to 'all' if current selection is unavailable
    const effectiveSelectedYear = useMemo(() => {
        if (selectedYear === 'all' || availableYears.includes(selectedYear)) {
            return selectedYear;
        }
        return 'all';
    }, [selectedYear, availableYears]);

    // Filter events by selected year
    const filteredEvents = useMemo(() => {
        if (effectiveSelectedYear === 'all') {
            return activeTabEvents;
        }
        return activeTabEvents.filter(event => {
            const { year } = parseEventDate(event.date);
            return year === effectiveSelectedYear;
        });
    }, [activeTabEvents, effectiveSelectedYear]);

    // Event count for specific year
    const getYearCount = (yr: string) => {
        if (yr === 'all') return activeTabEvents.length;
        return activeTabEvents.filter(e => parseEventDate(e.date).year === yr).length;
    };
    
    const getDifficultyChip = (difficulty: TourEvent['details']['difficulty']) => {
        switch (difficulty) {
            case 'Beginner': 
                return 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300';
            case 'Intermediate': 
                return 'bg-amber-500/15 border-amber-500/40 text-amber-300';
            case 'Advanced': 
                return 'bg-rose-500/15 border-rose-500/40 text-rose-300';
            default: 
                return 'bg-gray-500/15 border-gray-500/40 text-gray-300';
        }
    };

    const getStatusBadge = (status: TourEvent['status']) => {
        switch (status) {
            case 'Registration Open':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-950">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        Registration Open
                    </span>
                );
            case 'Limited Slots':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-950">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        Limited Slots
                    </span>
                );
            case 'Completed':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-700/60 text-slate-300 border border-slate-600/60">
                        <HiOutlineShieldCheck className="w-3.5 h-3.5 text-slate-300" />
                        Completed
                    </span>
                );
            default:
                return null;
        }
    };
    
    return (
        <AnimatedSection id="events" className="py-20 sm:py-24 bg-gray-900 text-white relative">
            <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
                {/* Header Title Section */}
                <div className="text-center max-w-2xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3 reveal">
                        <HiOutlineCalendar className="w-4 h-4" />
                        Ride Schedule & History
                    </div>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 reveal">Club Agenda</h3>
                    <p className="text-gray-400 mb-10 sm:mb-12 leading-relaxed reveal" style={{ transitionDelay: '150ms' }}>
                        The road is calling. Join us for our next scheduled touring adventure or explore our verified archives across the years.
                    </p>
                </div>

                {/* Featured Event Hero Banner (Shown in Upcoming view when All or the matching year is selected) */}
                {view === 'upcoming' && featuredEvent && (effectiveSelectedYear === 'all' || parseEventDate(featuredEvent.date).year === effectiveSelectedYear) && (
                    <div className="mb-14 sm:mb-16 max-w-5xl mx-auto reveal" style={{ transitionDelay: '250ms' }}>
                        <div className="relative bg-gradient-to-b from-gray-800 to-gray-850 rounded-3xl shadow-2xl overflow-hidden border border-amber-500/30 group hover:border-amber-500/60 transition-all duration-500">
                            <img 
                                src={featuredEvent.imageSrc} 
                                alt={featuredEvent.title} 
                                className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-35 group-hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/85 to-transparent"></div>
                            
                            <div className="relative p-6 sm:p-10 lg:p-12 text-center text-white flex flex-col items-center">
                                <div className="flex flex-wrap items-center justify-center gap-2.5 mb-4">
                                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-amber-500/20 border border-amber-500/50 text-amber-300 text-xs font-bold uppercase tracking-widest rounded-full shadow-lg shadow-amber-500/10">
                                        <HiOutlineSparkles className="w-3.5 h-3.5 text-amber-400" />
                                        Featured Upcoming Ride
                                    </span>
                                    <span className={`inline-flex items-center px-2.5 py-1 text-xs font-bold border rounded-full ${getDifficultyChip(featuredEvent.details.difficulty)}`}>
                                        {featuredEvent.details.difficulty}
                                    </span>
                                </div>

                                <h4 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-3 tracking-tight">{featuredEvent.title}</h4>
                                <p className="text-gray-300 max-w-2xl mx-auto mb-6 text-sm sm:text-base leading-relaxed">{featuredEvent.description}</p>
                                
                                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300 bg-gray-950/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 mb-8">
                                    <HiOutlineLocationMarker className="w-4 h-4 text-amber-400" />
                                    <span>{featuredEvent.details.meetingPoint}</span>
                                    <span className="text-gray-600">•</span>
                                    <HiOutlineCalendar className="w-4 h-4 text-amber-400" />
                                    <span>{featuredEvent.date}</span>
                                </div>

                                <div className="mb-8 w-full max-w-md">
                                    <CountdownTimer targetDate={`${featuredEvent.date}`} />
                                </div>

                                <button 
                                    onClick={(e) => onEventSelect(featuredEvent, e.currentTarget)} 
                                    className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-3.5 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl shadow-amber-500/30 text-sm sm:text-base flex items-center gap-2"
                                >
                                    <span>View Full Tour Details</span>
                                    <HiOutlineArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Navigation Controls: Tabs & Year Filter Bar */}
                <div className="max-w-4xl mx-auto mb-10 sm:mb-12 space-y-5 reveal" style={{ transitionDelay: '350ms' }}>
                    {/* Primary Tab Switcher (Upcoming / Past Rides) */}
                    <div className="w-full max-w-md mx-auto">
                        <div className="flex p-1.5 bg-gray-800/90 backdrop-blur-md border border-gray-700/80 rounded-full shadow-xl shadow-black/40">
                            <button 
                                onClick={() => {
                                    setView('upcoming');
                                    setSelectedYear('all');
                                }} 
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 ${
                                    view === 'upcoming' 
                                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25 scale-[1.02]' 
                                        : 'text-gray-400 hover:text-white hover:bg-gray-700/40'
                                }`}
                            >
                                <HiOutlineCalendar className="w-4 h-4 flex-shrink-0" />
                                <span>Upcoming Rides</span>
                                <span className={`px-2 py-0.5 text-xs rounded-full font-mono font-bold ${
                                    view === 'upcoming' ? 'bg-black/30 text-amber-100' : 'bg-gray-700/80 text-gray-400'
                                }`}>
                                    {upcomingEvents.length}
                                </span>
                            </button>
                            <button 
                                onClick={() => {
                                    setView('past');
                                    setSelectedYear('all');
                                }} 
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 ${
                                    view === 'past' 
                                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25 scale-[1.02]' 
                                        : 'text-gray-400 hover:text-white hover:bg-gray-700/40'
                                }`}
                            >
                                <HiOutlineClock className="w-4 h-4 flex-shrink-0" />
                                <span>Past Adventures</span>
                                <span className={`px-2 py-0.5 text-xs rounded-full font-mono font-bold ${
                                    view === 'past' ? 'bg-black/30 text-amber-100' : 'bg-gray-700/80 text-gray-400'
                                }`}>
                                    {pastEvents.length}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Year Filter Controls */}
                    {availableYears.length > 0 && (
                        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 mr-1.5 uppercase tracking-wider">
                                <HiOutlineFilter className="w-3.5 h-3.5 text-amber-400" />
                                <span>Filter Tahun:</span>
                            </div>

                            {/* "All" button */}
                            <button
                                onClick={() => setSelectedYear('all')}
                                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                                    effectiveSelectedYear === 'all'
                                        ? 'bg-amber-500 text-gray-950 font-bold shadow-md shadow-amber-500/20'
                                        : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700 border border-gray-700/60'
                                }`}
                            >
                                <span>Semua Tahun</span>
                                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                                    effectiveSelectedYear === 'all' ? 'bg-black/20 text-gray-900 font-extrabold' : 'bg-gray-700 text-gray-400'
                                }`}>
                                    {getYearCount('all')}
                                </span>
                            </button>

                            {/* Year-specific pill buttons */}
                            {availableYears.map(year => {
                                const count = getYearCount(year);
                                const isSelected = effectiveSelectedYear === year;
                                return (
                                    <button
                                        key={year}
                                        onClick={() => setSelectedYear(year)}
                                        className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                                            isSelected
                                                ? 'bg-amber-500 text-gray-950 font-bold shadow-md shadow-amber-500/20'
                                                : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700 border border-gray-700/60'
                                        }`}
                                    >
                                        <span>{year}</span>
                                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                                            isSelected ? 'bg-black/20 text-gray-900 font-extrabold' : 'bg-gray-700 text-gray-400'
                                        }`}>
                                            {count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Professional Event Cards Grid */}
                {filteredEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
                        {filteredEvents.map((event, index) => {
                            const dateInfo = parseEventDate(event.date);
                            const isFeatured = view === 'upcoming' && event.id === featuredEvent?.id;

                            return (
                                <div 
                                    key={event.id} 
                                    className={`relative bg-gray-800/90 rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col group hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-amber-500/10 ${
                                        isFeatured 
                                            ? 'border-amber-500/50 shadow-lg shadow-amber-500/5' 
                                            : 'border-gray-700/70 hover:border-amber-500/40'
                                    } reveal`}
                                    style={{ transitionDelay: `${index * 100}ms`}}
                                >
                                    {/* Image Header with Date badge & Status */}
                                    <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-950">
                                        <img 
                                            src={event.imageSrc} 
                                            alt={event.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-90"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>

                                        {/* Floating Date Badge on Image */}
                                        <div className="absolute top-3.5 left-3.5 flex flex-col items-center justify-center bg-gray-950/85 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-xl shadow-lg text-center min-w-[56px]">
                                            <span className="text-xl sm:text-2xl font-black text-amber-400 leading-none">
                                                {dateInfo.day}
                                            </span>
                                            <span className="text-[10px] font-bold text-gray-300 tracking-wider uppercase mt-0.5">
                                                {dateInfo.month} {dateInfo.year}
                                            </span>
                                        </div>

                                        {/* Status & Difficulty Badges on Top Right */}
                                        <div className="absolute top-3.5 right-3.5 flex flex-col items-end gap-1.5">
                                            {getStatusBadge(event.status)}
                                            <span className={`px-2.5 py-0.5 text-[10px] font-bold border rounded-full backdrop-blur-md ${getDifficultyChip(event.details.difficulty)}`}>
                                                {event.details.difficulty}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                                        <div>
                                            <h4 className="text-xl sm:text-2xl font-bold text-white mb-2.5 group-hover:text-amber-400 transition-colors line-clamp-1">
                                                {event.title}
                                            </h4>
                                            <p className="text-gray-300/90 text-sm leading-relaxed mb-5 line-clamp-2">
                                                {event.description}
                                            </p>

                                            {/* Key Meta Information */}
                                            <div className="space-y-2 mb-6">
                                                <div className="flex items-center gap-2.5 text-xs text-gray-300 bg-gray-900/60 border border-gray-700/50 px-3 py-2 rounded-xl">
                                                    <HiOutlineLocationMarker className="w-4 h-4 text-amber-400 flex-shrink-0" />
                                                    <span className="truncate">{event.details.meetingPoint}</span>
                                                </div>

                                                {event.details.schedule && event.details.schedule.length > 0 && (
                                                    <div className="flex items-center gap-2.5 text-xs text-gray-400 px-3 py-1">
                                                        <HiOutlineClock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                                                        <span className="truncate text-gray-400">
                                                            {event.details.schedule[0]}
                                                            {event.details.schedule.length > 1 ? ` (+${event.details.schedule.length - 1} stops)` : ''}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Card Footer Action Bar */}
                                        <div className="border-t border-gray-700/60 pt-4 flex items-center justify-between gap-3">
                                            <button 
                                                onClick={(e) => onEventSelect(event, e.currentTarget)} 
                                                className="flex-1 bg-amber-500/10 hover:bg-amber-500 border border-amber-500/30 hover:border-amber-500 text-amber-300 hover:text-gray-950 font-bold py-2.5 px-4 rounded-xl transition-all duration-200 text-xs sm:text-sm flex items-center justify-center gap-2 group/btn"
                                            >
                                                <span>{view === 'upcoming' ? 'Lihat Detail Acara' : 'Lihat Recap Perjalanan'}</span>
                                                <HiOutlineArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="max-w-xl mx-auto text-center py-12 px-6 bg-gray-800/60 rounded-2xl relative overflow-hidden reveal border border-gray-700/80 shadow-xl">
                        <HiOutlineCalendar className="absolute -top-4 -left-4 text-gray-700/20 text-9xl transform -rotate-12 pointer-events-none" />
                        <h4 className="text-xl sm:text-2xl font-bold text-white mb-2 relative z-10">
                            {effectiveSelectedYear !== 'all' 
                                ? `Tidak Ada Agenda di Tahun ${effectiveSelectedYear}`
                                : view === 'upcoming' ? 'Belum Ada Jadwal Touring Baru' : 'Belum Ada Arsip Perjalanan'}
                        </h4>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto mb-6 relative z-10">
                            {effectiveSelectedYear !== 'all'
                                ? `Belum ada agenda touring yang tercatat untuk tahun ${effectiveSelectedYear}. Silakan pilih filter tahun lain atau lihat semua tahun.`
                                : view === 'upcoming'
                                    ? "Road Captain kami sedang menyusun rute petualangan berikutnya. Cek kembali nanti atau hubungi kami!"
                                    : "Arsip perjalanan masa lalu akan terus kami perbarui di sini."
                            }
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3 relative z-10">
                            {effectiveSelectedYear !== 'all' && (
                                <button
                                    onClick={() => setSelectedYear('all')}
                                    className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-5 rounded-full transition-colors text-xs"
                                >
                                    Reset Filter Tahun
                                </button>
                            )}
                            <button 
                                onClick={onContactClick}
                                className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold py-2 px-6 rounded-full transition-all duration-300 text-xs transform hover:scale-105 shadow-lg shadow-amber-500/20"
                            >
                                Hubungi Pengurus Club
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AnimatedSection>
    );
};

export default Events;
