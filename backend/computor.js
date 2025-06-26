import { parseEquation } from './parser.js';
import { printCliReport } from './reporter.js';

/**
 * Main entry point for the ComputorV1 program (CLI).
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
        const result = polynomial.solve();
        
        printCliReport(result);

    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
    }
}

main();
