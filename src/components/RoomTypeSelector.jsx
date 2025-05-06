import React from 'react';
import '../components/RoomTypeSelector.css';

const RoomTypeSelector = ({ onSelect, selectedRoom }) => (
  <div className="room-type-container">
    <h2>🏠 Choose Your Room Type</h2>
    <p className="subtext">This will help us determine the right materials! 🧱</p>
    <div className="room-buttons">
      <button
        className={`room-btn regular ${selectedRoom === 'regular' ? 'selected' : ''}`}
        onClick={() => onSelect('regular')}
      >
        🛏️ Regular Room
      </button>
      <button
        className={`room-btn bathroom ${selectedRoom === 'bathroom' ? 'selected' : ''}`}
        onClick={() => onSelect('bathroom')}
      >
        🚿 Bathroom
      </button>
    </div>

    {/* Display selected room type */}
    {selectedRoom && (
      <div className="selected-room">
        <h3>You selected: {selectedRoom === 'bathroom' ? '🚿 Bathroom' : '🛏️ Regular Room'}</h3>
      </div>
    )}
  </div>
);

export default RoomTypeSelector;
