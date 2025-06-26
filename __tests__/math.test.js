import { customSqrt, gcd, isPerfectSquare, toFraction } from '../math.js';

describe('customSqrt', () => {
    it('should return the correct square root for perfect squares', () => {
        expect(customSqrt(4)).toBeCloseTo(2);
        expect(customSqrt(9)).toBeCloseTo(3);
        expect(customSqrt(144)).toBeCloseTo(12);
    });
    it('should return NaN for negative numbers', () => {
        expect(customSqrt(-1)).toBeNaN();
    });
});

describe('gcd', () => {
    it('should return the correct greatest common divisor', () => {
        expect(gcd(48, 18)).toBe(6);
        expect(gcd(101, 103)).toBe(1); // Prime numbers
        expect(gcd(10, 5)).toBe(5);
        expect(gcd(0, 5)).toBe(5);
    });
});

describe('isPerfectSquare', () => {
    it('should return true for perfect squares', () => {
        expect(isPerfectSquare(25)).toBe(true);
        expect(isPerfectSquare(0)).toBe(true);
    });
    it('should return false for non-perfect squares', () => {
        expect(isPerfectSquare(26)).toBe(false);
        expect(isPerfectSquare(-25)).toBe(false);
    });
});

describe('toFraction', () => {
    it('should convert decimals to irreducible fractions', () => {
        expect(toFraction(-0.25)).toBe("-1/4");
        expect(toFraction(0.5)).toBe("1/2");
        expect(toFraction(0.75)).toBe("3/4");
    });
    it('should handle integers correctly', () => {
        expect(toFraction(5)).toBe("5");
        expect(toFraction(-10)).toBe("-10");
    });
    it('should handle repeating decimals up to a tolerance', () => {
        expect(toFraction(0.333333333)).toBe("1/3");
    });
});
