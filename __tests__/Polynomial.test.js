import { Polynomial } from '../Polynomial.js';

describe('Polynomial Class', () => {
    let consoleLogSpy;
    let originalConsoleLog;

    // Before each test, override console.log with a mock function
    beforeEach(() => {
        originalConsoleLog = console.log;
        consoleLogSpy = [];
        console.log = (...args) => {
            consoleLogSpy.push(args);
        };
    });

    // After each test, restore the original console.log
    afterEach(() => {
        console.log = originalConsoleLog;
    });

    describe('toString method', () => {
        it('should correctly format a polynomial string', () => {
            const poly = new Polynomial({ 0: 4, 1: -5, 2: 1 });
            expect(poly.toString()).toBe("4 * X^0 - 5 * X^1 + 1 * X^2 = 0");
        });
        it('should handle a single term', () => {
            const poly = new Polynomial({ 2: -5 });
            expect(poly.toString()).toBe("- 5 * X^2 = 0");
        });
        it('should return "0 = 0" for an empty polynomial', () => {
            const poly = new Polynomial({});
            expect(poly.toString()).toBe("0 = 0");
        });
    });

    describe('solve method', () => {
        it('should handle Degree > 2', () => {
            const poly = new Polynomial({ 3: 1 });
            poly.solve();
            expect(consoleLogSpy.some(call => call[0] === "The polynomial degree is strictly greater than 2, I can't solve.")).toBe(true);
        });

        describe('Degree 2', () => {
            it('solves for a positive discriminant', () => {
                const poly = new Polynomial({ 0: -6, 1: 1, 2: 1 }); // x^2 + x - 6 = 0 -> (x+3)(x-2)=0 -> x=2, x=-3
                poly.solve();
                expect(consoleLogSpy[0][0]).toBe("Discriminant is strictly positive, the two solutions are:");
                expect(consoleLogSpy[1][0]).toBeCloseTo(2);
                expect(consoleLogSpy[2][0]).toBeCloseTo(-3);
            });

            it('solves for a zero discriminant', () => {
                const poly = new Polynomial({ 0: 1, 1: -2, 2: 1 }); // x^2 - 2x + 1 = 0 -> (x-1)^2=0 -> x=1
                poly.solve();
                expect(consoleLogSpy[0][0]).toBe("Discriminant is zero, the solution is:");
                expect(consoleLogSpy[1][0]).toBeCloseTo(1);
            });

            it('solves for a negative discriminant', () => {
                const poly = new Polynomial({ 0: 1, 1: 2, 2: 5 }); // 5x^2 + 2x + 1 = 0
                poly.solve();
                expect(consoleLogSpy[0][0]).toBe("Discriminant is strictly negative, the two complex solutions are:");
                expect(consoleLogSpy[1][0]).toBe("-0.2 + i * 0.4");
                expect(consoleLogSpy[2][0]).toBe("-0.2 - i * 0.4");
            });
        });

        describe('Degree 1', () => {
            it('solves a linear equation', () => {
                const poly = new Polynomial({ 0: 1, 1: 4 }); // 4x + 1 = 0 -> x = -0.25
                poly.solve();
                expect(consoleLogSpy[0][0]).toBe("The solution is:");
                expect(consoleLogSpy[1][0]).toBeCloseTo(-0.25);
            });
        });

        describe('Degree 0', () => {
            it('identifies no solution', () => {
                const poly = new Polynomial({ 0: 5 }); // 5 = 0
                poly.solve();
                expect(consoleLogSpy.some(call => call[0] === "No solution.")).toBe(true);
            });

            it('identifies infinite solutions', () => {
                const poly = new Polynomial({}); // 0 = 0
                poly.solve();
                expect(consoleLogSpy.some(call => call[0] === "Any real number is a solution.")).toBe(true);
            });
        });
    });
});
