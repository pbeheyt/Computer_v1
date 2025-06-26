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
