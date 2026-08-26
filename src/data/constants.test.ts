import { describe, it, expect } from 'vitest';
import { GALLERY_IMAGES, TOUR_EVENTS, MEMBER_PROFILES, NAV_LINKS } from '@/data/constants';

describe('Static Data', () => {
    it('should have gallery images with required fields', () => {
        expect(GALLERY_IMAGES.length).toBeGreaterThan(0);
        GALLERY_IMAGES.forEach(img => {
            expect(img).toHaveProperty('id');
            expect(img).toHaveProperty('src');
            expect(img).toHaveProperty('alt');
            expect(img).toHaveProperty('caption');
            expect(img).toHaveProperty('location');
            expect(img).toHaveProperty('date');
        });
    });

    it('should have tour events with required fields', () => {
        expect(TOUR_EVENTS.length).toBeGreaterThan(0);
        TOUR_EVENTS.forEach(event => {
            expect(event).toHaveProperty('id');
            expect(event).toHaveProperty('title');
            expect(event).toHaveProperty('date');
            expect(event).toHaveProperty('status');
            expect(event).toHaveProperty('details');
        });
    });

    it('should have member profiles with required fields', () => {
        expect(MEMBER_PROFILES.length).toBeGreaterThan(0);
        MEMBER_PROFILES.forEach(member => {
            expect(member).toHaveProperty('id');
            expect(member).toHaveProperty('name');
            expect(member).toHaveProperty('role');
        });
    });

    it('should have navigation links', () => {
        expect(NAV_LINKS.length).toBeGreaterThan(0);
        NAV_LINKS.forEach(link => {
            expect(link).toHaveProperty('name');
            expect(link).toHaveProperty('id');
            expect(link).toHaveProperty('icon');
        });
    });

    it('should have unique gallery image IDs', () => {
        const ids = GALLERY_IMAGES.map(img => img.id);
        expect(new Set(ids).size).toBe(ids.length);
    });

    it('should have unique tour event IDs', () => {
        const ids = TOUR_EVENTS.map(e => e.id);
        expect(new Set(ids).size).toBe(ids.length);
    });

    it('should have unique member profile IDs', () => {
        const ids = MEMBER_PROFILES.map(m => m.id);
        expect(new Set(ids).size).toBe(ids.length);
    });
});
