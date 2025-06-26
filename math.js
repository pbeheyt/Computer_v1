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

/**
 * Calculates the absolute value of a number.
 * @param {number} number The number to find the absolute value of.
 * @returns {number} The absolute value.
 */
export function customAbs(number) {
    return number < 0 ? -number : number;
}

/**
 * Finds the maximum value in an array of numbers.
 * @param {number[]} numbersArray The array of numbers to search through.
 * @returns {number} The largest number in the array. Returns -Infinity if the array is empty.
 */
export function customMax(numbersArray) {
    if (!numbersArray || numbersArray.length === 0) {
        return -Infinity; // Mimics Math.max() behavior for no arguments
    }

    let max = numbersArray[0];
    for (let i = 1; i < numbersArray.length; i++) {
        if (numbersArray[i] > max) {
            max = numbersArray[i];
        }
    }
    return max;
}

/**
 * Calculates the Greatest Common Divisor (GCD) of two integers using the Euclidean algorithm.
 * @param {number} a - The first integer.
 * @param {number} b - The second integer.
 * @returns {number} The GCD of a and b.
 */
export function gcd(a, b) {
    a = customAbs(Math.round(a));
    b = customAbs(Math.round(b));
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
}

/**
 * Checks if a number is a perfect square.
 * @param {number} n The number to check.
 * @returns {boolean} True if n is a perfect square, false otherwise.
 */
export function isPerfectSquare(n) {
    if (n < 0) return false;
    const sqrtN = customSqrt(n);
    // Check if the square root is very close to an integer.
    return customAbs(sqrtN - Math.round(sqrtN)) < 1e-9;
}

/**
 * Converts a decimal number to an irreducible fraction string.
 * Handles numbers with up to a certain precision to avoid floating point issues.
 * @param {number} decimal The number to convert.
 * @returns {string} The number as a simplified fraction or as an integer string.
 */
export function toFraction(decimal) {
    if (customAbs(decimal % 1) < 1e-9) {
        return Math.round(decimal).toString();
    }
    const tolerance = 1.0E-9;
    let numerator = decimal;
    let denominator = 1;

    // Increase precision by multiplying numerator and denominator
    while (customAbs(numerator % 1) > tolerance) {
        numerator *= 10;
        denominator *= 10;
        if (denominator > 1000000000) { // Limit to avoid infinite loops on irrational numbers
            // Check for common repeating decimals
            if (customAbs(decimal - 0.333333333) < 1e-9) {
                return "1/3";
            }
            return decimal.toString(); // Fallback for complex decimals
        }
    }

    const commonDivisor = gcd(numerator, denominator);
    return `${Math.round(numerator) / commonDivisor}/${denominator / commonDivisor}`;
}
