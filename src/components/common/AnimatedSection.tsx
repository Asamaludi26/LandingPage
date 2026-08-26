import React from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export const AnimatedSection: React.FC<{ children: React.ReactNode, className?: string, id?: string, hasAurora?: boolean }> = ({ children, className, id, hasAurora }) => {
    const [ref, entry] = useIntersectionObserver({ threshold: 0.1 });
    const auroraClass = hasAurora ? 'relative overflow-hidden before:content-[""] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-[800px] before:h-[800px] before:bg-[radial-gradient(circle,rgba(245,158,11,0.1)_0%,transparent_70%)] before:blur-3xl before:pointer-events-none' : '';

    return (
        <section ref={ref} id={id} className={`w-full max-w-full overflow-hidden isolate relative ${className || ''} ${auroraClass} section-fade-in ${entry?.isIntersecting ? 'visible' : ''}`}>
            {children}
        </section>
    );
};

export default AnimatedSection;
