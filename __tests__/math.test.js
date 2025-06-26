import { customSqrt } from '../math.js';

describe('customSqrt', () => {
    it('should return the correct square root for perfect squares', () => {
        expect(customSqrt(4)).toBeCloseTo(2);
        expect(customSqrt(9)).toBeCloseTo(3);
        expect(customSqrt(144)).toBeCloseTo(12);
    });

    it('should return the correct square root for non-perfect squares', () => {
        expect(customSqrt(2)).toBeCloseTo(1.41421356);
        expect(customSqrt(99)).toBeCloseTo(9.94987437);
    });

    it('should return 0 for an input of 0', () => {
        expect(customSqrt(0)).toBe(0);
    });

    it('should return NaN for negative numbers', () => {
        expect(customSqrt(-1)).toBeNaN();
    });
});
