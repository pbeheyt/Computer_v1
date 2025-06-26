# __tests__/math.test.js

```js
import { customSqrt } from '../math.js';

describe('customSqrt', () => {
    it('should return the correct square root for perfect squares', () => {
        expect(customSqrt(4)).toBeCloseTo(2);
        expect(customSqrt(9)).toBeCloseTo(3);
        expect(customSqrt(144)).toBeCloseTo(12);
    });

    it('should return the correct square root for non-perfect squares', () => {
        expect(customSqrt(2)).toBeCloseTo(1.41421356);
        expect(customSqrt(99)).toBeCloseTo(9.94987437);
    });

    it('should return 0 for an input of 0', () => {
        expect(customSqrt(0)).toBe(0);
    });

    it('should return NaN for negative numbers', () => {
        expect(customSqrt(-1)).toBeNaN();
    });
});

```

# __tests__/parser.test.js

```js
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

```

# __tests__/Polynomial.test.js

```js
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

```

# computor.js

```js
import { parseEquation } from './parser.js';

/**
 * Main entry point for the ComputorV1 program.
 */
function main() {
    try {
        const args = process.argv.slice(2);
        if (args.length !== 1) {
            console.error("Usage: node computor.js \"<equation>\"");
            console.error("Example: node computor.js \"5 * X^0 + 4 * X^1 = 3 * X^0\"");
            return;
        }
        const equationString = args[0];

        const polynomial = parseEquation(equationString);

        console.log(`Reduced form: ${polynomial.toString()}`);
        console.log(`Polynomial degree: ${polynomial.degree}`);
        polynomial.solve();

    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
    }
}

main();

```

# math.js

```js
/**
 * Calculates the square root of a number using the Babylonian method.
 * This method is an iterative algorithm that provides a highly accurate approximation.
 * @param {number} number The non-negative number to find the square root of.
 * @returns {number} The approximate square root.
 */
export function customSqrt(number) {
    if (number < 0) {
        return NaN;
    }
    if (number === 0) {
        return 0;
    }

    let guess = number / 2.0;

    for (let i = 0; i < 20; i++) {
        guess = (guess + number / guess) / 2.0;
    }

    return guess;
}

```

# package.json

```json
{
  "name": "computorv1",
  "version": "1.0.0",
  "description": "A polynomial equation solver with Jest tests.",
  "main": "computor.js",
  "type": "module",
  "scripts": {
    "start": "node computor.js",
    "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "jest": "^29.7.0"
  },
  "dependencies": {
    "ai-digest": "^1.2.2"
  }
}

```

# parser.js

```js
import { Polynomial } from './Polynomial.js';

/**
 * Parses a string representation of a polynomial equation.
 * @param {string} equationString The full equation string, e.g., "5 * X^0 = 1 * X^0".
 * @returns {Polynomial} An instance of the Polynomial class.
 */
export function parseEquation(equationString) {
    const sides = equationString.split('=');
    if (sides.length !== 2) {
        throw new Error("Invalid equation format: must contain exactly one '='.");
    }

    const coefficients = {};
    const termRegex = /([+-]?\s*\d*\.?\d+)\s*\*\s*X\^(\d+)/g;

    const processSide = (sideString, isRHS) => {
        const normalizedString = sideString.trim().startsWith('-') ? sideString : `+${sideString}`;
        
        for (const match of normalizedString.matchAll(termRegex)) {
            const coeff = parseFloat(match[1].replace(/\s/g, ''));
            const power = parseInt(match[2], 10);
            const finalCoeff = isRHS ? -coeff : coeff;
            coefficients[power] = (coefficients[power] || 0) + finalCoeff;
        }
    };

    processSide(sides[0], false);
    processSide(sides[1], true);

    return new Polynomial(coefficients);
}

```

# Polynomial.js

```js
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
        } else {
             console.log("Any real number is a solution.");
        }
    }
}

```

