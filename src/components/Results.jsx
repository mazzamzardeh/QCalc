import React from 'react';
import '../components/Results.css';

const Results = ({ results }) => (
  <div className="results-container">
    <h2>📊 Your Room Material Estimates</h2>
    <ul className="results-list">
      <li> <strong>Paint Area:</strong> {results.paintArea.toFixed(2)} m²</li>
      <li> <strong>Tile Area:</strong> {results.tileArea.toFixed(2)} m²</li>
      <li><strong>Plaster Area:</strong> {results.plasterArea.toFixed(2)} m²</li>
      <li>📏 <strong>Baseboard Length:</strong> {results.baseboardLength.toFixed(2)} m</li>
    </ul>
    <p className="footer-note">✨ Happy planning & decorating! 🧰</p>
  </div>
);

export default Results;
