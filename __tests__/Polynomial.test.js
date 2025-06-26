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
            poly.solve({}, true); // Test verbose mode
            expect(consoleLogSpy[0]).toContain("greater than 2");
        });

        describe('Degree 2', () => {
            it('solves with positive discriminant and fractional results: 4*X^2 + 3*X - 1 = 0', () => {
                const poly = new Polynomial({ 0: -1, 1: 3, 2: 4 });
                poly.solve({}, true); // Test verbose mode
                expect(consoleLogSpy).toContain("\u001b[33mEquation is of degree 2. Coefficients: a=4, b=3, c=-1\u001b[0m");
                expect(consoleLogSpy).toContain("Δ = (3)² - 4 * (4) * (-1) = 25");
                expect(consoleLogSpy).toContain("Discriminant is strictly positive. Using formula: x = (-b ± √Δ) / (2a)");
                expect(consoleLogSpy).toContain("\u001b[36m1/4\u001b[0m");
                expect(consoleLogSpy).toContain("\u001b[36m-1\u001b[0m");
            });

            it('solves with zero discriminant and fractional result: 4*X^2 - 4*X + 1 = 0', () => {
                const poly = new Polynomial({ 0: 1, 1: -4, 2: 4 });
                poly.solve({}, true); // Test verbose mode
                expect(consoleLogSpy).toContain("Discriminant is zero. Using formula: x = -b / (2a)");
                expect(consoleLogSpy).toContain("\u001b[36m1/2\u001b[0m");
            });

            it('solves with negative discriminant and complex fractional results: 8*X^2 + 4*X + 1 = 0', () => {
                const poly = new Polynomial({ 0: 1, 1: 4, 2: 8 });
                poly.solve({}, true); // Test verbose mode
                expect(consoleLogSpy).toContain("x = (-b ± i√(-Δ)) / (2a)");
                expect(consoleLogSpy).toContain("\u001b[36m-1/4 + i * 1/4\u001b[0m");
                expect(consoleLogSpy).toContain("\u001b[36m-1/4 - i * 1/4\u001b[0m");
            });
        });

        describe('Degree 1', () => {
            it('solves a linear equation with fractional result: 5*X + 2 = 0', () => {
                const poly = new Polynomial({ 0: 2, 1: 5 });
                poly.solve({}, true); // Test verbose mode
                expect(consoleLogSpy).toContain("\u001b[33mEquation is of degree 1. Solving for x: ax + b = 0  =>  x = -b / a\u001b[0m");
                expect(consoleLogSpy).toContain("\u001b[36m-2/5\u001b[0m");
            });
        });
    });
});
