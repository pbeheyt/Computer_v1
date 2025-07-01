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
 * Custom implementation of floor function.
 * @param {number} number The number to floor.
 * @returns {number} The largest integer less than or equal to the number.
 */
export function customFloor(number) {
    // parseInt truncates towards zero (e.g., -3.7 -> -3)
    const truncated = parseInt(number);
    // If the number is negative and had a fractional part, subtract 1 to get the floor.
    if (number < 0 && number !== truncated) {
        return truncated - 1;
    }
    return truncated;
}

/**
 * Custom implementation of round function using customFloor.
 * @param {number} number The number to round.
 * @returns {number} The number rounded to the nearest integer.
 */
export function customRound(number) {
    // Standard rounding algorithm: floor(x + 0.5)
    return customFloor(number + 0.5);
}

/**
 * Calculates the Greatest Common Divisor (GCD) of two integers using the Euclidean algorithm.
 * @param {number} a - The first integer.
 * @param {number} b - The second integer.
 * @returns {number} The GCD of a and b.
 */
export function gcd(a, b) {
    a = customAbs(customRound(a));
    b = customAbs(customRound(b));
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
}

/**
 * Converts a decimal number to its irreducible fraction using a simple GCD-based method.
 * This approach is intuitive and easy to explain. It works best for terminating decimals.
 * @param {number} decimal The number to convert.
 * @param {number} [tolerance=1.0E-9] - The precision tolerance for floating point comparisons.
 * @returns {string} The number as a simplified fraction or as an integer string.
 */
export function toFraction(decimal, tolerance = 1.0E-9) {
    // Handle integers immediately
    if (customAbs(decimal - customRound(decimal)) < tolerance) {
        return customRound(decimal).toString();
    }
    if (customAbs(decimal) < tolerance) {
        return "0";
    }

    const sign = decimal < 0 ? "-" : "";
    const x = customAbs(decimal);

    // Start with a denominator of 1 and scale up until the numerator is an integer.
    let denominator = 1;
    let numerator = x;
    
    // Limit iterations to prevent issues with non-terminating decimals.
    let maxIterations = 10; 
    while (customAbs(numerator - customRound(numerator)) > tolerance && maxIterations > 0) {
        numerator *= 10;
        denominator *= 10;
        maxIterations--;
    }
    
    numerator = customRound(numerator);

    // Simplify the fraction by dividing by the greatest common divisor.
    const commonDivisor = gcd(numerator, denominator);
    const simplifiedNumerator = numerator / commonDivisor;
    const simplifiedDenominator = denominator / commonDivisor;

    if (simplifiedDenominator === 1) {
        return `${sign}${simplifiedNumerator}`;
    }

    return `${sign}${simplifiedNumerator}/${simplifiedDenominator}`;
}
