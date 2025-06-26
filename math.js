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
