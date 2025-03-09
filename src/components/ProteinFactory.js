import { useState } from 'react';
import { calculateProduction } from '../utils/calculations';
import '../styles/ProteinFactory.css';

export default function ProteinFactory() {
  const [inputs, setInputs] = useState(['', '', '', '', '']);
  const [results, setResults] = useState(null);

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleCalculate = () => {
    const results = calculateProduction(inputs);
    setResults(results);
  };

  return (
    <div className="factory-container">
      <h2>Protein Factory Optimization</h2>
      <div className="factory-form">
        {['A', 'B', 'C', 'D', 'E'].map((machine, index) => (
          <div key={machine} className="machine-input">
            <label htmlFor={`machine-${machine}`}>Machine {machine}:</label>
            <input
              id={`machine-${machine}`}
              type="number"
              min="0"
              value={inputs[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
              placeholder="Enter runs..."
            />
          </div>
        ))}
        <button onClick={handleCalculate} className="calculate-btn">
          Calculate Production
        </button>
      </div>

      {results && (
        <div className={`results ${results.valid ? 'valid' : 'invalid'}`}>
          <h3>Production Results</h3>
          <div className="result-item">
            <span>Status:</span>
            <span className={`status ${results.valid ? 'valid' : 'invalid'}`}>
              {results.valid ? '✅ Valid Configuration' : '❌ Exceeds Power Limit'}
            </span>
          </div>
          <div className="result-item">
            <span>Protein Output:</span>
            <span>{results.protein}g</span>
          </div>
          <div className="result-item">
            <span>Power Usage:</span>
            <span>{results.electricity}kW / 50kW</span>
          </div>
        </div>
      )}
    </div>
  );
} 