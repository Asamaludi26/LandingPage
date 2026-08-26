import React, { useState, useRef, useEffect } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export const AnimatedCounter: React.FC<{ target: number; duration?: number; suffix?: string, text: string }> = ({ target, duration = 2000, suffix, text }) => {
    const [count, setCount] = useState(0);
    const [ref, entry] = useIntersectionObserver({ threshold: 0.2 });
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!entry?.isIntersecting || hasAnimated.current) {
            return;
        }

        hasAnimated.current = true;
        let animationFrameId: number;
        let startTime: number | null = null;

        const animate = (timestamp: number) => {
            if (startTime === null) {
                startTime = timestamp;
            }
            const elapsedTime = timestamp - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easedProgress = easeOutCubic(progress);
            const currentCount = Math.floor(easedProgress * target);

            setCount(currentCount);

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [entry, target, duration]);

    return (
      <div ref={ref} className="text-center">
          <p className="text-4xl md:text-5xl font-bold text-amber-500">{count.toLocaleString()}{suffix}</p>
          <p className="text-gray-400 mt-2">{text}</p>
      </div>
    );
};

export default AnimatedCounter;
