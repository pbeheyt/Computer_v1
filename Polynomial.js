import { customSqrt } from './math.js';

/**
 * Represents a polynomial equation and provides methods to solve and display it.
 */
export class Polynomial {
    /**
     * @param {Object.<number, number>} coefficients - A map where keys are powers and values are coefficients.
     */
    constructor(coefficients) {
        this.coefficients = {};
        // Clean up any zero coefficients
        for (const pow in coefficients) {
            if (coefficients[pow] !== 0) {
                this.coefficients[pow] = coefficients[pow];
            }
        }

        const powers = Object.keys(this.coefficients).map(Number);
        this.degree = powers.length > 0 ? Math.max(...powers) : 0;
    }

    /**
     * Generates a string representation of the reduced form of the polynomial.
     * @returns {string} The reduced form equation string.
     */
    toString() {
        if (Object.keys(this.coefficients).length === 0) {
            return "0 = 0";
        }

        let result = "";
        const sortedPowers = Object.keys(this.coefficients).map(Number).sort((a, b) => a - b);

        for (let i = 0; i < sortedPowers.length; i++) {
            const pow = sortedPowers[i];
            const coeff = this.coefficients[pow];

            if (i > 0) {
                result += coeff > 0 ? " + " : " - ";
            } else {
                if (coeff < 0) {
                    result += "- ";
                }
            }

            result += `${Math.abs(coeff)} * X^${pow}`;
        }
        return result + " = 0";
    }

    /**
     * Solves the polynomial equation based on its degree.
     */
    solve() {
        const getCoeff = (p) => this.coefficients[p] || 0;

        if (this.degree > 2) {
            console.log(`The polynomial degree is strictly greater than 2, I can't solve.`);
            return;
        }

        if (this.degree === 2) {
            const a = getCoeff(2);
            const b = getCoeff(1);
            const c = getCoeff(0);

            const discriminant = b * b - 4 * a * c;

            if (discriminant > 0) {
                console.log("Discriminant is strictly positive, the two solutions are:");
                const sqrtD = customSqrt(discriminant);
                const x1 = (-b + sqrtD) / (2 * a);
                const x2 = (-b - sqrtD) / (2 * a);
                console.log(x1);
                console.log(x2);
            } else if (discriminant === 0) {
                console.log("Discriminant is zero, the solution is:");
                const x = -b / (2 * a);
                console.log(x);
            } else { // discriminant < 0
                console.log("Discriminant is strictly negative, the two complex solutions are:");
                const realPart = -b / (2 * a);
                const imaginaryPart = customSqrt(-discriminant) / (2 * a);
                console.log(`${realPart} + i * ${imaginaryPart}`);
                console.log(`${realPart} - i * ${imaginaryPart}`);
            }
        } else if (this.degree === 1) {
            const a = getCoeff(1);
            const b = getCoeff(0);
            const solution = -b / a;
            console.log("The solution is:");
            console.log(solution);
        } else if (this.degree === 0) {
            const c = getCoeff(0);
            if (c === 0) {
                console.log("Any real number is a solution.");
            } else {
                console.log("No solution.");
            }
        }
    }
}
