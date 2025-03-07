import { useState } from 'react';
import { calculateProduction } from '../utils/calculations';

export default function FactoryForm() {
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
    <div>
      <h2>Protein Factory Optimization</h2>
      {['A', 'B', 'C', 'D', 'E'].map((machine, index) => (
        <div key={machine}>
          <label>Machine {machine}:</label>
          <input
            type="number"
            value={inputs[index]}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleCalculate}>Calculate</button>
      {results && (
        <div className={results.valid ? 'valid' : 'invalid'}>
          {results.valid ? '✅ Valid!' : '❌ Invalid!'}
          <p>Protein: {results.protein}g</p>
          <p>Electricity: {results.electricity}kW</p>
        </div>
      )}
    </div>
  );
}
