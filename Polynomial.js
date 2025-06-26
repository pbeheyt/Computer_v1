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
     * Solves with a detailed, structured, and colorful report.
     * @param {object} colorConfig - The ANSI color codes.
     */
    solveVerbose(colorConfig) {
        const { red = '', yellow = '', cyan = '', reset = '' } = colorConfig;
        const getCoeff = (p) => this.coefficients[p] || 0;
        const divider = `${yellow}----------------------------------------${reset}`;

        console.log(divider);
        console.log(`${yellow}--- 1. Analysis${reset}`);
        console.log(divider);

        if (this.degree === 2) {
            const a = getCoeff(2), b = getCoeff(1), c = getCoeff(0);
            console.log(`  Equation Type: Quadratic (degree 2)`);
            console.log(`  Coefficients: a = ${a}, b = ${b}, c = ${c}`);
            
            console.log(divider);
            console.log(`${yellow}--- 2. Discriminant Calculation (Δ)${reset}`);
            console.log(divider);
            const discriminant = b * b - 4 * a * c;
            console.log(`  Formula: Δ = b² - 4ac`);
            console.log(`  Calculation: Δ = (${b})² - 4 * (${a}) * (${c})`);
            console.log(`  Result: Δ = ${discriminant}`);

            console.log(divider);
            console.log(`${yellow}--- 3. Solution${reset}`);
            console.log(divider);

            if (customAbs(discriminant) < 1e-9) {
                 console.log(`  Discriminant is zero. Using formula: x = -b / (2a)`);
                 console.log(`  Plugging in values: x = -(${b}) / (2 * ${a})`);
                 console.log(`  The solution is:`);
                 console.log(`    ${cyan}${toFraction(-b / (2 * a))}${reset}`);
            } else if (discriminant > 0) {
                console.log(`  Discriminant is positive. Using the quadratic formula:`);
                console.log(`  Formula: x = (-b ± √Δ) / (2a)`);
                const sqrtD = customSqrt(discriminant);
                console.log(`  Plugging in values: x = (-(${b}) ± √${discriminant}) / (2 * ${a})`);
                console.log(`  The two real solutions are:`);
                if (isPerfectSquare(discriminant)) {
                    console.log(`    ${cyan}${toFraction((-b + sqrtD) / (2 * a))}${reset}`);
                    console.log(`    ${cyan}${toFraction((-b - sqrtD) / (2 * a))}${reset}`);
                } else {
                    console.log(`    ${cyan}${(-b + sqrtD) / (2 * a)}${reset}`);
                    console.log(`    ${cyan}${(-b - sqrtD) / (2 * a)}${reset}`);
                }
            } else { // discriminant < 0
                console.log(`  Discriminant is negative. Using the formula for complex roots:`);
                console.log(`  Formula: x = (-b ± i√(-Δ)) / (2a)`);
                const sqrtD = customSqrt(-discriminant);
                console.log(`\n  Plugging in values:`);
                console.log(`    x = (-(${b}) ± i√(-(${discriminant}))) / (2 * ${a})`);
                console.log(`    x = (-${b} ± i√${-discriminant}) / ${2 * a}`);
                console.log(`    x = -${b}/${2*a} ± i * ${sqrtD}/${2*a}`);
                console.log(`\n  The two complex solutions are:`);
                const realPart = -b / (2 * a);
                const imagPart = sqrtD / (2 * a);
                console.log(`    ${cyan}${toFraction(realPart)} + i * ${toFraction(imagPart)}${reset}`);
                console.log(`    ${cyan}${toFraction(realPart)} - i * ${toFraction(imagPart)}${reset}`);
            }
        } else if (this.degree === 1) {
            const a = getCoeff(1), b = getCoeff(0);
            console.log(`  Equation Type: Linear (degree 1)`);
            console.log(`  Solving for x: ${a}x + ${b} = 0`);
            
            console.log(divider);
            console.log(`${yellow}--- 2. Solution${reset}`);
            console.log(divider);
            console.log(`  Formula: x = -b / a`);
            console.log(`  Plugging in values: x = -(${b}) / ${a}`);
            console.log(`  The solution is:`);
            console.log(`    ${cyan}${toFraction(-b / a)}${reset}`);

        } else if (this.degree === 0) {
            console.log(`  Equation Type: Constant (degree 0)`);
            console.log(divider);
            console.log(`${yellow}--- 2. Solution${reset}`);
            console.log(divider);
            if (getCoeff(0) === 0) {
                console.log(`  The equation is 0 = 0, which is always true.`);
                console.log(`    ${cyan}Any real number is a solution.${reset}`);
            } else {
                console.log(`  The equation ${getCoeff(0)} = 0 is a contradiction.`);
                console.log(`    ${red}No solution.${reset}`);
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
