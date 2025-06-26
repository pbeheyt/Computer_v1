import { parseEquation } from '../parser.js';

describe('parseEquation', () => {
    it('should parse a simple degree 2 equation', () => {
        const poly = parseEquation("5 * X^0 + 4 * X^1 - 9.3 * X^2 = 1 * X^0");
        expect(poly.degree).toBe(2);
        expect(poly.coefficients[0]).toBeCloseTo(4);
        expect(poly.coefficients[1]).toBeCloseTo(4);
        expect(poly.coefficients[2]).toBeCloseTo(-9.3);
    });

    it('should parse a degree 1 equation', () => {
        const poly = parseEquation("5 * X^0 + 4 * X^1 = 4 * X^0");
        expect(poly.degree).toBe(1);
        expect(poly.coefficients[0]).toBeCloseTo(1);
        expect(poly.coefficients[1]).toBeCloseTo(4);
    });

    it('should handle terms on the RHS correctly', () => {
        const poly = parseEquation("1 * X^2 = 8 * X^0");
        expect(poly.degree).toBe(2);
        expect(poly.coefficients[2]).toBeCloseTo(1);
        expect(poly.coefficients[0]).toBeCloseTo(-8);
    });

    it('should create an empty polynomial for cancelling terms', () => {
        const poly = parseEquation("10 * X^1 = 10 * X^1");
        expect(poly.degree).toBe(0);
        expect(poly.coefficients).toEqual({});
    });

    it('should throw an error for invalid equation format', () => {
        expect(() => parseEquation("5 * X^0 + 4 * X^1")).toThrow();
    });
});
