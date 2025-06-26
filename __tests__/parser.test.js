import { parseEquation } from '../parser.js';

describe('parseEquation (Free Form)', () => {
    it('should parse with implicit coefficients and powers: "5 + 4*X + X^2 = 0"', () => {
        const poly = parseEquation("5 + 4*X + X^2 = 0");
        expect(poly.degree).toBe(2);
        expect(poly.coefficients[0]).toBeCloseTo(5);
        expect(poly.coefficients[1]).toBeCloseTo(4);
        expect(poly.coefficients[2]).toBeCloseTo(1);
    });

    it('should handle negative terms and different spacing: "5 * X^2 - 3*X = 10"', () => {
        const poly = parseEquation("5 * X^2 - 3*X = 10");
        expect(poly.degree).toBe(2);
        expect(poly.coefficients[2]).toBeCloseTo(5);
        expect(poly.coefficients[1]).toBeCloseTo(-3);
        expect(poly.coefficients[0]).toBeCloseTo(-10);
    });

    it('should parse an equation starting with X: "X^2 + 2*X - 3 = 0"', () => {
        const poly = parseEquation("X^2 + 2*X - 3 = 0");
        expect(poly.degree).toBe(2);
        expect(poly.coefficients[2]).toBeCloseTo(1);
        expect(poly.coefficients[1]).toBeCloseTo(2);
        expect(poly.coefficients[0]).toBeCloseTo(-3);
    });
    
    it('should parse an equation starting with -X: "-X^2 + 2*X - 3 = 0"', () => {
        const poly = parseEquation("-X^2 + 2*X - 3 = 0");
        expect(poly.degree).toBe(2);
        expect(poly.coefficients[2]).toBeCloseTo(-1);
        expect(poly.coefficients[1]).toBeCloseTo(2);
        expect(poly.coefficients[0]).toBeCloseTo(-3);
    });

    it('should handle terms cancelling out: "5 + 4*X + X^2 = X^2"', () => {
        const poly = parseEquation("5 + 4*X + X^2 = X^2");
        expect(poly.degree).toBe(1);
        expect(poly.coefficients[0]).toBeCloseTo(5);
        expect(poly.coefficients[1]).toBeCloseTo(4);
        expect(poly.coefficients[2]).toBeUndefined();
    });

    it('should throw an error for invalid equation format without =', () => {
        expect(() => parseEquation("5 * X^0 + 4 * X^1")).toThrow("Invalid equation format: must contain exactly one '='.");
    });
});
