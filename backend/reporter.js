/**
 * Takes a solution result object and prints it to the console
 * in the format required by the project subject.
 * @param {object} result The solution object from Polynomial.solve()
 */
export function printCliReport(result) {
    console.log(`Reduced form: ${result.reducedForm}`);
    console.log(`Polynomial degree: ${result.degree}`);

    if (result.degree > 2) {
        console.log(result.explanation[0]);
        return;
    }

    if (result.discriminant !== null) {
        if (result.discriminant > 0) {
            console.log("Discriminant is strictly positive, the two solutions are:");
            console.log(result.solutions[0]);
            console.log(result.solutions[1]);
        } else if (result.discriminant === 0) {
            console.log("Discriminant is zero, the solution is:");
            console.log(result.solutions[0]);
        } else {
            console.log("Discriminant is strictly negative, the two complex solutions are:");
            console.log(result.solutions[0]);
            console.log(result.solutions[1]);
        }
    } else { // Degree 0 or 1
        if (result.degree === 1) {
            console.log("The solution is:");
            console.log(result.solutions[0]);
        } else if (result.degree === 0) {
            if (result.solutionType === 'Infinite Solutions') {
                console.log("Any real number is a solution.");
            } else {
                console.log("No solution.");
            }
        }
    }
}
