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
