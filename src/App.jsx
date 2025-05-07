import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import RoomTypeSelector from './components/RoomTypeSelector';
import DimensionForm from './components/DimensionForm';
import Results from './components/Results';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [roomType, setRoomType] = useState('');
  const [dimensions, setDimensions] = useState({});
  const [results, setResults] = useState(null);
  const [quote, setQuote] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [unit, setUnit] = useState('m'); 

  useEffect(() => {
    fetch('https://api.quotable.io/random')
      .then((res) => res.json())
      .then((data) => {
        setQuote(data.content || '“Measure twice, cut once.”');
        setIsLoading(false);
      })
      .catch(() => {
        setQuote('“Measure twice, cut once.”');
        setIsLoading(false);
      });
  }, []);

  const handleStart = () => {
    setShowWelcome(false);
  };

  const handleRoomTypeSelect = (type) => {
    setRoomType(type);
  };

  const handleCalculate = (dims) => {
    setDimensions(dims);

    let {
      length, width, height,
      doors = [], windows = []
    } = dims;

    if (unit === 'ft') {
      const ftToM = (val) => val * 0.3048;
      length = ftToM(length);
      width = ftToM(width);
      height = ftToM(height);
      doors = doors.map(d => ({ width: ftToM(d.width), height: ftToM(d.height) }));
      windows = windows.map(w => ({ width: ftToM(w.width), height: ftToM(w.height) }));
    }

    const wallArea = 2 * (length + width) * height;
    const floorArea = length * width;

    const doorArea = doors.reduce((acc, d) => acc + (d.width * d.height), 0);
    const windowArea = windows.reduce((acc, w) => acc + (w.width * w.height), 0);

    const paintArea = Math.max(wallArea - doorArea - windowArea, 0);
    const tileArea = roomType === 'bathroom' ? wallArea + floorArea : floorArea;
    const plasterArea = wallArea;
    const baseboardLength = 2 * (length + width);

    // Set the calculated results
    setResults({ paintArea, tileArea, plasterArea, baseboardLength });
  };

  // Toggle unit between meters and feet
  const toggleUnit = () => {
    setUnit((prev) => (prev === 'm' ? 'ft' : 'm'));
    setResults(null); // Reset results when unit is toggled
  };

  return (
    <div className="app-container">
      {showWelcome ? (
        <div className="welcome-screen" onClick={handleStart}>
          <div className="welcome-content">
            <h1>🏠 Room Calculator</h1>
            <p>Click anywhere to start calculating! 🧮</p>
            {isLoading ? (
              <div className="loading-spinner">🔄</div>
            ) : (
              <blockquote>💡 {quote}</blockquote>
            )}
          </div>
        </div>
      ) : (
        <>
          <Header />
          <main className="main-content">
            <RoomTypeSelector onSelect={handleRoomTypeSelect} selectedRoom={roomType} />
            {roomType && (
              <div className="room-selection">
                <h3>You selected: {roomType === 'bathroom' ? '🚿 Bathroom' : '🛏️ Regular Room'}</h3>
              </div>
            )}
            {roomType && (
              <DimensionForm
                onCalculate={handleCalculate}
                unit={unit}
                onToggleUnit={toggleUnit}
              />
            )}
            {results && <Results results={results} unit={unit} />}
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
