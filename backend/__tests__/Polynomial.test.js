import { Polynomial } from '../Polynomial.js';

describe('Polynomial Class', () => {

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

    describe('solve method returns correct data object', () => {
        it('should handle Degree > 2', () => {
            const poly = new Polynomial({ 3: 1 });
            const result = poly.solve();
            expect(result.solutionType).toBe('Error');
            expect(result.explanation[0]).toContain("strictly greater than 2");
        });

        describe('Degree 2', () => {
            it('solves for a positive discriminant', () => {
                const poly = new Polynomial({ 0: -6, 1: 1, 2: 1 }); // x^2 + x - 6 = 0 -> (x+3)(x-2)=0 -> x=2, x=-3
                const result = poly.solve();
                expect(result.solutionType).toBe('Positive Discriminant');
                expect(result.discriminant).toBe(25);
                expect(result.solutions.length).toBe(2);
                expect(result.solutions).toContain(2);
                expect(result.solutions).toContain(-3);
            });

            it('solves for a zero discriminant', () => {
                const poly = new Polynomial({ 0: 1, 1: -2, 2: 1 }); // x^2 - 2x + 1 = 0 -> (x-1)^2=0 -> x=1
                const result = poly.solve();
                expect(result.solutionType).toBe('Zero Discriminant');
                expect(result.discriminant).toBe(0);
                expect(result.solutions[0]).toBeCloseTo(1);
            });

            it('solves for a negative discriminant', () => {
                const poly = new Polynomial({ 0: 1, 1: 2, 2: 5 }); // 5x^2 + 2x + 1 = 0
                const result = poly.solve();
                expect(result.solutionType).toBe('Negative Discriminant');
                expect(result.discriminant).toBe(-16);
                expect(result.solutions[0]).toMatch(/-0.200000 \+ i \* 0.400000/);
                expect(result.solutions[1]).toMatch(/-0.200000 - i \* 0.400000/);
            });
        });

        describe('Degree 1', () => {
            it('solves a linear equation', () => {
                const poly = new Polynomial({ 0: 1, 1: 4 }); // 4x + 1 = 0 -> x = -0.25
                const result = poly.solve();
                expect(result.solutionType).toBe('Linear Equation');
                expect(result.solutions[0]).toBeCloseTo(-0.25);
            });
        });

        describe('Degree 0', () => {
            it('identifies no solution', () => {
                const poly = new Polynomial({ 0: 5 }); // 5 = 0
                const result = poly.solve();
                expect(result.solutionType).toBe('No Solution');
            });

            it('identifies infinite solutions', () => {
                const poly = new Polynomial({}); // 0 = 0
                const result = poly.solve();
                expect(result.solutionType).toBe('Infinite Solutions');
            });
        });
    });
});
