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
     * Solves the polynomial equation based on its degree.
     * @param {object} [colorConfig={}] - An object containing ANSI color codes.
     * @param {boolean} [isVerbose=false] - A flag to enable detailed, colorful output.
     */
    solve(colorConfig = {}, isVerbose = false) {
        const getCoeff = (p) => this.coefficients[p] || 0;

        if (this.degree > 2) {
            const message = "The polynomial degree is strictly greater than 2, I can't solve.";
            console.log(isVerbose ? `${colorConfig.red}${message}${colorConfig.reset}` : message);
            return;
        }

        if (isVerbose) {
            this.solveVerbose(colorConfig);
        } else {
            this.solveRegular();
        }
    }

    /**
     * Solves with detailed, colorful output.
     * @param {object} colorConfig - The ANSI color codes.
     */
    solveVerbose(colorConfig) {
        const { red = '', yellow = '', cyan = '', reset = '' } = colorConfig;
        const getCoeff = (p) => this.coefficients[p] || 0;

        if (this.degree === 2) {
            const a = getCoeff(2), b = getCoeff(1), c = getCoeff(0);
            console.log(`${yellow}Equation is of degree 2. Coefficients: a=${a}, b=${b}, c=${c}${reset}`);
            const discriminant = b * b - 4 * a * c;
            console.log(`Using formula: Δ = b² - 4ac`);
            console.log(`Δ = (${b})² - 4 * (${a}) * (${c}) = ${discriminant}`);

            if (customAbs(discriminant) < 1e-9) {
                 console.log("Discriminant is zero. Using formula: x = -b / (2a)");
                 console.log(`${cyan}${toFraction(-b / (2 * a))}${reset}`);
            } else if (discriminant > 0) {
                console.log("Discriminant is strictly positive. Using formula: x = (-b ± √Δ) / (2a)");
                const sqrtD = customSqrt(discriminant);
                if (isPerfectSquare(discriminant)) {
                    console.log(`${cyan}${toFraction((-b + sqrtD) / (2 * a))}${reset}`);
                    console.log(`${cyan}${toFraction((-b - sqrtD) / (2 * a))}${reset}`);
                } else {
                    const x1 = (-b + sqrtD) / (2 * a);
                    const x2 = (-b - sqrtD) / (2 * a);
                    console.log(`${cyan}${x1}${reset}`);
                    console.log(`${cyan}${x2}${reset}`);
                }
            } else {
                console.log("Discriminant is strictly negative. Using formulas for complex roots:");
                console.log("x = (-b ± i√(-Δ)) / (2a)");
                const realPart = -b / (2 * a);
                const imagPart = customSqrt(-discriminant) / (2 * a);
                const realFraction = toFraction(realPart);
                const imagFraction = toFraction(imagPart);
                
                console.log(`${cyan}${realFraction} + i * ${imagFraction}${reset}`);
                console.log(`${cyan}${realFraction} - i * ${imagFraction}${reset}`);
            }
        } else if (this.degree === 1) {
            const a = getCoeff(1), b = getCoeff(0);
            console.log(`${yellow}Equation is of degree 1. Solving for x: ax + b = 0  =>  x = -b / a${reset}`);
            console.log(`${cyan}${toFraction(-b / a)}${reset}`);
        } else if (this.degree === 0) {
            if (getCoeff(0) === 0) {
                console.log(`${cyan}Any real number is a solution.${reset}`);
            } else {
                console.log(`${red}No solution.${reset}`);
            }
        }
    }

    /**
     * Solves with simple, uncolored output matching the project subject.
     */
    solveRegular() {
        const getCoeff = (p) => this.coefficients[p] || 0;

        if (this.degree === 2) {
            const a = getCoeff(2), b = getCoeff(1), c = getCoeff(0);
            const discriminant = b * b - 4 * a * c;

            if (customAbs(discriminant) < 1e-9) {
                 console.log("Discriminant is zero, the solution is:");
                 console.log(-b / (2 * a));
            } else if (discriminant > 0) {
                console.log("Discriminant is strictly positive, the two solutions are:");
                const sqrtD = customSqrt(discriminant);
                console.log((-b + sqrtD) / (2 * a));
                console.log((-b - sqrtD) / (2 * a));
            } else {
                console.log("Discriminant is strictly negative, the two complex solutions are:");
                const realPart = -b / (2 * a);
                const imagPart = customSqrt(-discriminant) / (2 * a);
                // The subject shows the imaginary part as a single term (e.g., 2i/5).
                // We will replicate this style.
                const realFrac = toFraction(realPart);
                const imagFrac = toFraction(imagPart);
                console.log(`${realFrac} + ${imagFrac} * i`);
                console.log(`${realFrac} - ${imagFrac} * i`);
            }
        } else if (this.degree === 1) {
            const a = getCoeff(1), b = getCoeff(0);
            console.log("The solution is:");
            console.log(-b / a);
        } else if (this.degree === 0) {
            if (getCoeff(0) === 0) {
                console.log("Any real number is a solution.");
            } else {
                console.log("No solution.");
            }
        }
    }
}
