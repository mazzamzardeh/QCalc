import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import RoomTypeSelector from './components/RoomTypeSelector';
import DimensionForm from './components/DimensionForm';
import Results from './components/Results';
import './App.css';

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [roomType, setRoomType] = useState('');
  const [dimensions, setDimensions] = useState({});
  const [results, setResults] = useState({});
  const [quote, setQuote] = useState('');
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    fetch('https://api.quotable.io/random')
      .then((res) => res.json())
      .then((data) => {
        setQuote(data.content);
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
    const { length, width, height, doorWidth = 0, doorHeight = 0, windowWidth = 0, windowHeight = 0 } = dims;

    const wallArea = 2 * (length + width) * height;
    const floorArea = length * width;
    const doorArea = doorWidth * doorHeight;
    const windowArea = windowWidth * windowHeight;

    const paintArea = Math.max(wallArea - doorArea - windowArea, 0);
    const tileArea = roomType === 'bathroom' ? wallArea + floorArea : floorArea;
    const plasterArea = wallArea;
    const baseboardLength = 2 * (length + width);

    setResults({ paintArea, tileArea, plasterArea, baseboardLength });
  };

  return (
    <div className="app-container">
      {showWelcome ? (
        <div className="welcome-screen" onClick={handleStart}>
          <div className="welcome-content">
            <h1>🏠 Room Calculator</h1>
            <p>Click anywhere to start calculating! 🧮</p>

            {/* Display a loading spinner or fallback quote */}
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
            
            {/* Show the selected room type */}
            {roomType && (
              <div className="room-selection">
                <h3>You selected: {roomType === 'bathroom' ? '🚿 Bathroom' : '🛏️ Regular Room'}</h3>
              </div>
            )}
            
            {/* Show the DimensionForm and Results */}
            {roomType && <DimensionForm onCalculate={handleCalculate} />}
            {results.paintArea && <Results results={results} />}
          </main>
        </>
      )}
    </div>
  );
};

export default App;
