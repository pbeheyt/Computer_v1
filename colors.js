/**
 * A simple utility for adding ANSI color codes to console output.
 * Using these codes allows for colored text in most modern terminal environments.
 */
export const colors = {
    reset: "\x1b[0m", // Resets the text color to default
    red: "\x1b[31m",   // For errors and important warnings
    green: "\x1b[32m", // For success messages and the reduced form
    yellow: "\x1b[33m",// For informational messages like the degree
    cyan: "\x1b[36m",  // For the final solutions
};
