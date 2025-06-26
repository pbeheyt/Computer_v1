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
