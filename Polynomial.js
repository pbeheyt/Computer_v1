import { customSqrt, customAbs, customMax, isPerfectSquare, toFraction } from './math.js';

/**
 * Represents a polynomial equation and provides methods to solve and display it.
 */
export class Polynomial {
    /**
     * @param {Object.<number, number>} coefficients - A map where keys are powers and values are coefficients.
     */
    constructor(coefficients) {
        this.coefficients = {};
        // Clean up any zero coefficients and handle floating point inaccuracies
        for (const pow in coefficients) {
            if (customAbs(coefficients[pow]) > 1e-9) {
                this.coefficients[pow] = coefficients[pow];
            }
        }

        const powers = Object.keys(this.coefficients).map(Number);
        this.degree = powers.length > 0 ? customMax(powers) : 0;
    }

    /**
     * Generates a natural string representation of the reduced form of the polynomial.
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
            const absCoeff = customAbs(coeff);

            const sign = coeff < 0 ? "-" : "+";

            if (i > 0) {
                result += ` ${sign} `;
            } else if (sign === "-") {
                result += `-`;
            }
            
            const isCoeffOne = customAbs(absCoeff - 1) < 1e-9;

            if (!isCoeffOne || pow === 0) {
                result += `${absCoeff}`;
            }
            
            if (pow > 0) {
                if (!isCoeffOne && absCoeff !== 0) {
                     result += ` * `;
                }
                result += `X`;
                if (pow > 1) {
                    result += `^${pow}`;
                }
            }
        }
        return result.trim() + " = 0";
    }

    /**
     * Solves the polynomial equation based on its degree, showing intermediate steps and fractional results.
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

            console.log(`Equation is of degree 2. Coefficients: a=${a}, b=${b}, c=${c}`);
            const discriminant = b * b - 4 * a * c;
            console.log(`Discriminant Δ = b² - 4ac = (${b})² - 4 * (${a}) * (${c}) = ${discriminant}`);

            if (customAbs(discriminant) < 1e-9) { // Discriminant is zero
                 console.log("Discriminant is zero, the solution is:");
                 console.log(toFraction(-b / (2 * a)));
            } else if (discriminant > 0) {
                console.log("Discriminant is strictly positive, the two solutions are:");
                const sqrtD = customSqrt(discriminant);
                if (isPerfectSquare(discriminant)) {
                    console.log(toFraction((-b + sqrtD) / (2 * a)));
                    console.log(toFraction((-b - sqrtD) / (2 * a)));
                } else {
                    const x1 = (-b + sqrtD) / (2 * a);
                    const x2 = (-b - sqrtD) / (2 * a);
                    console.log(x1);
                    console.log(x2);
                }
            } else { // discriminant < 0
                console.log("Discriminant is strictly negative, the two complex solutions are:");
                const realPart = -b / (2 * a);
                const imagPart = customSqrt(-discriminant) / (2 * a);
                const realFraction = toFraction(realPart);
                const imagFraction = toFraction(imagPart);
                
                console.log(`${realFraction} + i * ${imagFraction}`);
                console.log(`${realFraction} - i * ${imagFraction}`);
            }
        } else if (this.degree === 1) {
            const a = getCoeff(1);
            const b = getCoeff(0);
            console.log(`Equation is of degree 1. The solution to ${a}x + ${b} = 0 is:`);
            console.log(toFraction(-b / a));
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
