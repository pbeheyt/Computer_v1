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

    describe('solve method (bonus output)', () => {
        it('handles Degree > 2', () => {
            const poly = new Polynomial({ 3: 1 });
            poly.solve();
            expect(consoleLogSpy[0]).toContain("greater than 2");
        });

        describe('Degree 2', () => {
            it('solves with positive discriminant and fractional results: 4*X^2 + 3*X - 1 = 0', () => {
                const poly = new Polynomial({ 0: -1, 1: 3, 2: 4 });
                poly.solve();
                expect(consoleLogSpy).toContain("Equation is of degree 2. Coefficients: a=4, b=3, c=-1");
                expect(consoleLogSpy).toContain("Discriminant Δ = b² - 4ac = (3)² - 4 * (4) * (-1) = 25");
                expect(consoleLogSpy).toContain("Discriminant is strictly positive, the two solutions are:");
                expect(consoleLogSpy).toContain("1/4"); // Solution is 0.25
                expect(consoleLogSpy).toContain("-1");
            });

            it('solves with zero discriminant and fractional result: 4*X^2 - 4*X + 1 = 0', () => {
                const poly = new Polynomial({ 0: 1, 1: -4, 2: 4 });
                poly.solve();
                expect(consoleLogSpy).toContain("Discriminant is zero, the solution is:");
                expect(consoleLogSpy).toContain("1/2"); // Solution is 0.5
            });

            it('solves with negative discriminant and complex fractional results: 8*X^2 + 4*X + 1 = 0', () => {
                const poly = new Polynomial({ 0: 1, 1: 4, 2: 8 });
                poly.solve();
                expect(consoleLogSpy).toContain("Discriminant is strictly negative, the two complex solutions are:");
                // Real part: -4 / 16 = -0.25 = -1/4
                // Imag part: sqrt(16) / 16 = 4/16 = 0.25 = 1/4
                expect(consoleLogSpy).toContain("-1/4 + i * 1/4");
                expect(consoleLogSpy).toContain("-1/4 - i * 1/4");
            });
        });

        describe('Degree 1', () => {
            it('solves a linear equation with fractional result: 5*X + 2 = 0', () => {
                const poly = new Polynomial({ 0: 2, 1: 5 });
                poly.solve();
                expect(consoleLogSpy).toContain("Equation is of degree 1. The solution to 5x + 2 = 0 is:");
                expect(consoleLogSpy).toContain("-2/5"); // Solution is -0.4
            });
        });
    });
});
