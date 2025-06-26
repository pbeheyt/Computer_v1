import { useState } from 'react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import './App.css';

function App() {
  const [equation, setEquation] = useState('5 * X^0 + 4 * X^1 - 9.3 * X^2 = 1 * X^0');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('http://localhost:3001/api/solve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ equation }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'An unknown error occurred.');
      }
      
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formatReducedForm = (form) => {
    return form.replace(/\*/g, '\\cdot');
  };

  return (
    <div className="App">
      <h1>ComputorV1 Polynomial Solver</h1>
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={equation}
          onChange={(e) => setEquation(e.target.value)}
          className="equation-input"
          placeholder="Enter equation, e.g., 5 * X^2 = 5"
          disabled={isLoading}
        />
        <button type="submit" className="solve-button" disabled={isLoading}>
          {isLoading ? 'Solving...' : 'Solve'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {result && (
        <div className="result-container">
          <div className="result-item">
            <h3>Reduced Form</h3>
            <BlockMath math={formatReducedForm(result.reducedForm)} />
          </div>

          <div className="result-item">
            <h3>Polynomial Degree</h3>
            <p>{result.degree}</p>
          </div>

          <div className="result-item">
            <h3>Solution Steps & Explanation</h3>
            <ul className="explanation-list">
              {result.explanation.map((step, index) => (
                <li key={index}><InlineMath math={formatReducedForm(step)} /></li>
              ))}
            </ul>
          </div>
          
          <div className="result-item">
            <h3>Final Solution(s)</h3>
            {result.solutions && result.solutions.length > 0 ? (
              result.solutions.map((sol, index) => (
                <BlockMath key={index} math={String(sol)} />
              ))
            ) : (
              <p>This equation has no specific numerical solutions.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
