import { parseEquation } from './parser.js';
import { colors } from './colors.js';

/**
 * Main entry point for the ComputorV1 program.
 */
function main() {
    try {
        // Find and extract the verbose flag
        let args = process.argv.slice(2);
        const verboseFlagIndex = args.findIndex(arg => arg === '-v' || arg === '--verbose');
        const isVerbose = verboseFlagIndex !== -1;
        
        if (isVerbose) {
            args.splice(verboseFlagIndex, 1); // Remove the flag from args
        }

        if (args.length !== 1) {
            const usage = 'Usage: node computor.js [--verbose | -v] "<equation>"';
            const example = 'Example: node computor.js -v "5*X^2 - 3*X = 10"';
            console.error(`${colors.red}${usage}${colors.reset}`);
            console.error(`${colors.yellow}${example}${colors.reset}`);
            return;
        }
        const equationString = args[0];

        const polynomial = parseEquation(equationString);

        // Conditional logging based on verbosity
        if (isVerbose) {
            console.log(`${colors.green}Reduced form:${colors.reset} ${polynomial.toString()}`);
            console.log(`${colors.yellow}Polynomial degree:${colors.reset} ${polynomial.degree}`);
        } else {
            console.log(`Reduced form: ${polynomial.toString()}`);
            console.log(`Polynomial degree: ${polynomial.degree}`);
        }
        
        polynomial.solve(colors, isVerbose);

    } catch (error) {
        console.error(`${colors.red}An error occurred: ${error.message}${colors.reset}`);
    }
}

main();
