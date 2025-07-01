import { customSqrt, gcd, toFraction, customFloor, customRound } from '../math.js';

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

describe('customFloor', () => {
    it('should floor positive numbers correctly', () => {
        expect(customFloor(3.14)).toBe(3);
        expect(customFloor(3.99)).toBe(3);
    });
    it('should floor negative numbers correctly', () => {
        expect(customFloor(-3.14)).toBe(-4);
        expect(customFloor(-3.99)).toBe(-4);
    });
    it('should handle integers and zero correctly', () => {
        expect(customFloor(5)).toBe(5);
        expect(customFloor(-5)).toBe(-5);
        expect(customFloor(0)).toBe(0);
    });
});

describe('customRound', () => {
    it('should round positive numbers correctly', () => {
        expect(customRound(3.14)).toBe(3);
        expect(customRound(3.75)).toBe(4);
        expect(customRound(3.5)).toBe(4);
    });
    it('should round negative numbers correctly', () => {
        expect(customRound(-3.14)).toBe(-3);
        expect(customRound(-3.75)).toBe(-4);
        expect(customRound(-3.5)).toBe(-3);
    });
    it('should handle integers and zero correctly', () => {
        expect(customRound(5)).toBe(5);
        expect(customRound(-5)).toBe(-5);
        expect(customRound(0)).toBe(0);
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

describe('toFraction (Simple GCD Method)', () => {
    it('should convert terminating decimals to irreducible fractions', () => {
        expect(toFraction(-0.25)).toBe("-1/4");
        expect(toFraction(0.5)).toBe("1/2");
        expect(toFraction(0.75)).toBe("3/4");
        expect(toFraction(1.5)).toBe("3/2");
        expect(toFraction(0.125)).toBe("1/8");
    });

    it('should handle integers correctly', () => {
        expect(toFraction(5)).toBe("5");
        expect(toFraction(-10)).toBe("-10");
        expect(toFraction(0)).toBe("0");
    });

    it('should handle numbers that become integers after simplification', () => {
        expect(toFraction(2.0000000001)).toBe("2");
    });
});
