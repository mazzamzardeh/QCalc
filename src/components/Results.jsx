import React from 'react';
import '../components/Results.css';

const Results = ({ results, unit }) => {
  const areaUnit = unit === 'ft' ? 'ft²' : 'm²';
  const lengthUnit = unit === 'ft' ? 'ft' : 'm';

  return (
    <div className="results-container">
      <h2>📊 Your Room Material Estimates ({unit === 'ft' ? 'Feet' : 'Metric'})</h2>
      <ul className="results-list">
        <li><strong>Paint Area:</strong> {results.paintArea ? results.paintArea.toFixed(2) : '0.00'} {areaUnit}</li>
        <li><strong>Tile Area:</strong> {results.tileArea ? results.tileArea.toFixed(2) : '0.00'} {areaUnit}</li>
        <li><strong>Plaster Area:</strong> {results.plasterArea ? results.plasterArea.toFixed(2) : '0.00'} {areaUnit}</li>
        <li>📏 <strong>Baseboard Length:</strong> {results.baseboardLength ? results.baseboardLength.toFixed(2) : '0.00'} {lengthUnit}</li>
      </ul>
      <p className="footer-note">✨ Happy planning & decorating! 🧰</p>
    </div>
  );
};

export default Results;
