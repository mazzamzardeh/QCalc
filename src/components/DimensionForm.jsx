import React, { useState, useEffect } from "react";
import "../components/DimensionForm.css";

const DimensionForm = ({ onCalculate, resetTrigger, onResetHandled }) => {
  const initialState = {
    length: "",
    width: "",
    height: "",
    doorWidth: "",
    doorHeight: "",
    windowWidth: "",
    windowHeight: "",
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (resetTrigger) {
      setFormData(initialState);
      onResetHandled();
    }
  }, [resetTrigger, onResetHandled]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [
        key,
        parseFloat(value) || 0,
      ])
    );
    onCalculate(parsedData);
  };

  return (
    <form onSubmit={handleSubmit} className="dimension-form">
      <h2>📐 Room Dimensions</h2>
      <p className="form-subtext">Door 🚪 and window 🪟 fields are optional</p>

      <div className="form-grid">
        {[
          "length",
          "width",
          "height",
          "doorWidth",
          "doorHeight",
          "windowWidth",
          "windowHeight",
        ].map((field) => (
          <div key={field} className="form-group">
            <label>{getLabel(field)}</label>
            <input
              type="number"
              name={field}
              step="any"
              min="0"
              value={formData[field]}
              onChange={handleChange}
              required={["length", "width", "height"].includes(field)}
            />
          </div>
        ))}
      </div>

      <button type="submit" className="submit-button">
        {" "}
        Calculate Materials
      </button>
    </form>
  );
};

const getLabel = (field) => {
  const labels = {
    length: "📏 Length (m):",
    width: "📏 Width (m):",
    height: "📏 Height (m):",
    doorWidth: "🚪 Door Width (m):",
    doorHeight: "🚪 Door Height (m):",
    windowWidth: "🪟 Window Width (m):",
    windowHeight: "🪟 Window Height (m):",
  };
  return labels[field];
};

export default DimensionForm;
