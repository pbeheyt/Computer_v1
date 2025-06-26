import { parseEquation } from './parser.js';
import { colors } from './colors.js';

/**
 * Main entry point for the ComputorV1 program.
 */
function main() {
    try {
        const args = process.argv.slice(2);
        if (args.length !== 1) {
            console.error(`${colors.red}Usage: node computor.js "<equation>"${colors.reset}`);
            console.error(`${colors.yellow}Example: node computor.js "5 * X^0 + 4 * X^1 = 3 * X^0"${colors.reset}`);
            return;
        }
        const equationString = args[0];

        const polynomial = parseEquation(equationString);

        console.log(`${colors.green}Reduced form:${colors.reset} ${polynomial.toString()}`);
        console.log(`${colors.yellow}Polynomial degree:${colors.reset} ${polynomial.degree}`);
        polynomial.solve(colors); // Pass the colors object to the solver

    } catch (error) {
        console.error(`${colors.red}An error occurred: ${error.message}${colors.reset}`);
    }
}

main();
