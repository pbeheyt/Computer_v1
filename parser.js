import { Polynomial } from './Polynomial.js';

/**
 * Parses one side of the equation.
 * @param {string} sideString - The string for one side of the equation.
 * @param {number} signMultiplier - 1 for LHS, -1 for RHS.
 * @param {Object.<number, number>} coefficients - The object to populate.
 */
function processSide(sideString, signMultiplier, coefficients) {
    // Clean up and prepare the string for parsing.
    let side = sideString.replace(/\s/g, '').toUpperCase();
    if (!side) return;

    // Add a leading '+' to simplify term splitting.
    if (side[0] !== '+' && side[0] !== '-') {
        side = '+' + side;
    }

    // Split the side into terms, e.g., "+5*X^2-3*X" -> ["+5*X^2", "-3*X"]
    const terms = side.match(/[+-][^+-]+/g);
    if (!terms) {
        throw new Error(`Could not parse side: ${sideString}`);
    }

    for (const term of terms) {
        const sign = term[0] === '-' ? -1 : 1;
        const t = term.substring(1); // The term without its sign, e.g., "5*X^2"

        let coeff = 1;
        let power = 0;

        if (t.includes('X')) {
            // Term has a variable
            power = t.includes('^') ? parseInt(t.split('^')[1]) : 1;
            const coeffPart = t.split('X')[0];
            
            if (coeffPart === '' || coeffPart === '*') {
                coeff = 1;
            } else if (coeffPart.includes('*')) {
                coeff = parseFloat(coeffPart.split('*')[0]);
            } else {
                coeff = parseFloat(coeffPart);
            }
        } else {
            // Term is a constant
            power = 0;
            coeff = parseFloat(t);
        }
        
        if (isNaN(coeff) || isNaN(power)) {
             throw new Error(`Invalid term found: ${term}`);
        }

        // Add the parsed coefficient to the map, considering the side (LHS/RHS)
        coefficients[power] = (coefficients[power] || 0) + (sign * coeff * signMultiplier);
    }
}

/**
 * Parses a string representation of a polynomial equation, including free-form entries.
 * @param {string} equationString The full equation string, e.g., "5 + 4*X + X^2 = 0".
 * @returns {Polynomial} An instance of the Polynomial class.
 */
export function parseEquation(equationString) {
    if (!equationString.includes('=')) {
        throw new Error("Invalid equation format: must contain exactly one '='.");
    }

    const sides = equationString.split('=');
    if (sides.length !== 2) {
        throw new Error("Invalid equation format: must contain exactly one '='.");
    }

    const coefficients = {};
    
    // Process Left-Hand Side (sign multiplier = 1)
    processSide(sides[0], 1, coefficients);
    
    // Process Right-Hand Side (sign multiplier = -1, to move terms to the left)
    processSide(sides[1], -1, coefficients);

    return new Polynomial(coefficients);
}
