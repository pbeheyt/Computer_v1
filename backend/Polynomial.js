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
     * Solves the polynomial equation based on its degree and returns a result object.
     * @returns {object} A structured object containing the solution details.
     */
    solve() {
        const getCoeff = (p) => this.coefficients[p] || 0;
        const a = getCoeff(2);
        const b = getCoeff(1);
        const c = getCoeff(0);

        const baseResult = {
            reducedForm: this.toString(),
            degree: this.degree,
            coefficients: { a, b, c },
            discriminant: null,
            solutionType: '',
            solutions: [],
            explanation: []
        };

        if (this.degree > 2) {
            return {
                ...baseResult,
                solutionType: 'Error',
                explanation: [`The polynomial degree is strictly greater than 2, I can't solve.`]
            };
        }

        if (this.degree === 2) {
            const discriminant = b * b - 4 * a * c;
            baseResult.discriminant = discriminant;
            baseResult.explanation.push(`This is a quadratic equation (degree 2). We use the discriminant Δ = b² - 4ac.`);
            baseResult.explanation.push(`Δ = (${b})² - 4 * (${a}) * (${c}) = ${discriminant}`);

            if (discriminant > 0) {
                const sqrtD = customSqrt(discriminant);
                const x1 = (-b + sqrtD) / (2 * a);
                const x2 = (-b - sqrtD) / (2 * a);
                return {
                    ...baseResult,
                    solutionType: 'Positive Discriminant',
                    solutions: [x1, x2],
                    explanation: [
                        ...baseResult.explanation,
                        `Discriminant is strictly positive, the two solutions are:`,
                        `x₁ = (-b + √Δ) / 2a = ${x1.toFixed(6)}`,
                        `x₂ = (-b - √Δ) / 2a = ${x2.toFixed(6)}`
                    ]
                };
            } else if (discriminant === 0) {
                const x = -b / (2 * a);
                return {
                    ...baseResult,
                    solutionType: 'Zero Discriminant',
                    solutions: [x],
                    explanation: [
                        ...baseResult.explanation,
                        `Discriminant is zero, the single solution is:`,
                        `x = -b / 2a = ${x.toFixed(6)}`
                    ]
                };
            } else { // discriminant < 0
                const realPart = -b / (2 * a);
                const imaginaryPart = customSqrt(-discriminant) / (2 * a);
                const x1 = `${realPart.toFixed(6)} + i * ${imaginaryPart.toFixed(6)}`;
                const x2 = `${realPart.toFixed(6)} - i * ${imaginaryPart.toFixed(6)}`;
                return {
                    ...baseResult,
                    solutionType: 'Negative Discriminant',
                    solutions: [x1, x2],
                    explanation: [
                        ...baseResult.explanation,
                        `Discriminant is strictly negative, the two complex solutions are:`,
                        `x₁ = (-b + i√-Δ) / 2a = ${x1}`,
                        `x₂ = (-b - i√-Δ) / 2a = ${x2}`
                    ]
                };
            }
        } else if (this.degree === 1) {
            const solution = -c / b;
            return {
                ...baseResult,
                solutionType: 'Linear Equation',
                solutions: [solution],
                explanation: [
                    `This is a linear equation (degree 1).`,
                    `The solution is calculated as -c / b = ${solution.toFixed(6)}`
                ]
            };
        } else if (this.degree === 0) {
            if (c === 0) {
                return {
                    ...baseResult,
                    solutionType: 'Infinite Solutions',
                    explanation: [`The equation simplifies to 0 = 0. Any real number is a solution.`]
                };
            } else {
                return {
                    ...baseResult,
                    solutionType: 'No Solution',
                    explanation: [`The equation simplifies to ${c} = 0, which is impossible. No solution.`]
                };
            }
        }
        // Should not be reached, but as a fallback
        return baseResult;
    }
}
