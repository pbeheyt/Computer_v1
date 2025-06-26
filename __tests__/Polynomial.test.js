import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { Polynomial } from '../Polynomial.js';

describe('Polynomial Class (with Bonus Features)', () => {
    let consoleLogSpy;

    beforeEach(() => {
        consoleLogSpy = [];
        jest.spyOn(console, 'log').mockImplementation((...args) => {
            consoleLogSpy.push(args.join(' '));
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('toString method (bonus formatting)', () => {
        it('should correctly format a standard polynomial string', () => {
            const poly = new Polynomial({ 0: 4, 1: -5, 2: 1 });
            expect(poly.toString()).toBe("4 - 5 * X + X^2 = 0");
        });
        it('should handle a single term', () => {
            const poly = new Polynomial({ 2: -5 });
            expect(poly.toString()).toBe("-5 * X^2 = 0");
        });
        it('should omit 1 for coefficients of X', () => {
            const poly = new Polynomial({ 1: 1, 2: -1 });
            expect(poly.toString()).toBe("X - X^2 = 0");
        });
        it('should return "0 = 0" for an empty polynomial', () => {
            const poly = new Polynomial({});
            expect(poly.toString()).toBe("0 = 0");
        });
    });

    describe('solve method (verbose output)', () => {
        it('handles Degree > 2', () => {
            const poly = new Polynomial({ 3: 1 });
            poly.solve({ red: '', reset: '' }, false); // Test non-verbose
            expect(consoleLogSpy[0]).toContain("The polynomial degree is strictly greater than 2, I can't solve.");
        });

        describe('Degree 2', () => {
            it('solves with positive discriminant and fractional results: 4*X^2 + 3*X - 1 = 0', () => {
                const poly = new Polynomial({ 0: -1, 1: 3, 2: 4 });
                poly.solve({ cyan: '\u001b[36m', reset: '\u001b[0m' }, true); // Test verbose mode
                expect(consoleLogSpy).toContain("  Equation Type: Quadratic (degree 2)");
                expect(consoleLogSpy).toContain("  Coefficients: a = 4, b = 3, c = -1");
                expect(consoleLogSpy).toContain("  Calculation: Δ = (3)² - 4 * (4) * (-1)");
                expect(consoleLogSpy).toContain("  Result: Δ = 25");
                expect(consoleLogSpy).toContain("  Discriminant is positive. Using the quadratic formula:");
                // Use toMatch to handle potential floating point vs fraction output in tests
                expect(consoleLogSpy.some(line => line.includes("1/4") || line.includes("0.25"))).toBe(true);
                expect(consoleLogSpy.some(line => line.includes("-1"))).toBe(true);
            });

            it('solves with zero discriminant and fractional result: 4*X^2 - 4*X + 1 = 0', () => {
                const poly = new Polynomial({ 0: 1, 1: -4, 2: 4 });
                poly.solve({ cyan: '\u001b[36m', reset: '\u001b[0m' }, true); // Test verbose mode
                expect(consoleLogSpy).toContain("  Discriminant is zero. Using formula: x = -b / (2a)");
                expect(consoleLogSpy.some(line => line.includes("1/2") || line.includes("0.5"))).toBe(true);
            });

            it('solves with negative discriminant and complex fractional results: 8*X^2 + 4*X + 1 = 0', () => {
                const poly = new Polynomial({ 0: 1, 1: 4, 2: 8 });
                poly.solve({ cyan: '\u001b[36m', reset: '\u001b[0m' }, true); // Test verbose mode
                expect(consoleLogSpy).toContain("  Formula: x = (-b ± i√(-Δ)) / (2a)");
                expect(consoleLogSpy).toContain("    \u001b[36m-1/4 + i * 1/4\u001b[0m");
                expect(consoleLogSpy).toContain("    \u001b[36m-1/4 - i * 1/4\u001b[0m");
            });
        });

        describe('Degree 1', () => {
            it('solves a linear equation with fractional result: 5*X + 2 = 0', () => {
                const poly = new Polynomial({ 0: 2, 1: 5 });
                poly.solve({ cyan: '\u001b[36m', reset: '\u001b[0m' }, true); // Test verbose mode
                expect(consoleLogSpy).toContain("  Equation Type: Linear (degree 1)");
                expect(consoleLogSpy).toContain("  Solving for x: 5x + 2 = 0");
                expect(consoleLogSpy.some(line => line.includes("-2/5") || line.includes("-0.4"))).toBe(true);
            });
        });
    });
});
