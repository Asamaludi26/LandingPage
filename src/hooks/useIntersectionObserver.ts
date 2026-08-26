import { useState, useRef, useCallback, useMemo } from 'react';

export const useIntersectionObserver = (options: IntersectionObserverInit) => {
    const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
    const observer = useRef<IntersectionObserver | null>(null);

    const { threshold, root, rootMargin } = options;
    const stableOptions = useMemo(() => ({ threshold, root, rootMargin }), [threshold, root, rootMargin]);

    const ref = useCallback((node: HTMLElement | null) => {
        if (observer.current) {
            observer.current.disconnect();
        }
        
        observer.current = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setEntry(entry);
                if (entry.target && observer.current) {
                    observer.current.unobserve(entry.target);
                }
            }
        }, stableOptions);

        if (node) {
            observer.current.observe(node);
        }
    }, [stableOptions]);

    return [ref, entry] as const;
};

export default useIntersectionObserver;
