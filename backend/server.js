import express from 'express';
import cors from 'cors';
import { parseEquation } from './parser.js';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/solve', (req, res) => {
    try {
        const { equation } = req.body;
        if (!equation || typeof equation !== 'string') {
            return res.status(400).json({ error: "Invalid input: 'equation' must be a non-empty string." });
        }

        const polynomial = parseEquation(equation);
        const result = polynomial.solve();
        
        res.json(result);

    } catch (error) {
        // This catches errors from the parser, e.g., invalid equation format.
        res.status(400).json({ error: `An error occurred: ${error.message}` });
    }
});

app.listen(port, () => {
    console.log(`ComputorV1 API server listening at http://localhost:${port}`);
});
