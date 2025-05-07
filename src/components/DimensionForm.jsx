import React, { useState } from "react";
import "../components/DimensionForm.css";

const DimensionForm = ({ onCalculate, unit, onToggleUnit }) => {
  const [formData, setFormData] = useState({
    length: "",
    width: "",
    height: "",
    doors: [{ width: "", height: "" }],
    windows: [{ width: "", height: "" }],
  });

  const handleChange = (e, section, index) => {
    const { name, value } = e.target;

    if (section === "main") {
      setFormData({ ...formData, [name]: value });
    } else {
      const updated = [...formData[section]];
      updated[index][name] = value;
      setFormData({ ...formData, [section]: updated });
    }
  };

  const addSection = (type) => {
    const updated = [...formData[type], { width: "", height: "" }];
    setFormData({ ...formData, [type]: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsed = {
      length: parseFloat(formData.length) || 0,
      width: parseFloat(formData.width) || 0,
      height: parseFloat(formData.height) || 0,
      doors: formData.doors.map(d => ({
        width: parseFloat(d.width) || 0,
        height: parseFloat(d.height) || 0
      })),
      windows: formData.windows.map(w => ({
        width: parseFloat(w.width) || 0,
        height: parseFloat(w.height) || 0
      })),
    };
    onCalculate(parsed);
  };

  return (
    <form onSubmit={handleSubmit} className="dimension-form">
      <h2>📐 Room Dimensions</h2>
      <p className="form-subtext">
        Door 🚪 and window 🪟 fields are optional
      </p>
      <button
        type="button"
        className="unit-toggle-button"
        onClick={onToggleUnit}
      >
        Switch to {unit === "m" ? "feet (ft)" : "meters (m)"}
      </button>

      <div className="form-grid">
        {["length", "width", "height"].map((field) => (
          <div key={field} className="form-group">
            <label>
              {getLabel(field, unit)} <span className="required">*</span>
            </label>
            <input
              type="number"
              name={field}
              step="any"
              min="0"
              value={formData[field]}
              onChange={(e) => handleChange(e, "main")}
              required
            />
          </div>
        ))}
      </div>

      <div className="extra-sections">
        <h3>🚪 Doors</h3>
        {formData.doors.map((door, i) => (
          <div className="form-grid small-grid" key={`door-${i}`}>
            <div className="form-group">
              <label>Width ({unit})</label>
              <input
                type="number"
                name="width"
                value={door.width}
                onChange={(e) => handleChange(e, "doors", i)}
              />
            </div>
            <div className="form-group">
              <label>Height ({unit})</label>
              <input
                type="number"
                name="height"
                value={door.height}
                onChange={(e) => handleChange(e, "doors", i)}
              />
            </div>
          </div>
        ))}
        <button type="button" className="add-button" onClick={() => addSection("doors")}>
          ➕ Add Door
        </button>

        <h3>🪟 Windows</h3>
        {formData.windows.map((window, i) => (
          <div className="form-grid small-grid" key={`window-${i}`}>
            <div className="form-group">
              <label>Width ({unit})</label>
              <input
                type="number"
                name="width"
                value={window.width}
                onChange={(e) => handleChange(e, "windows", i)}
              />
            </div>
            <div className="form-group">
              <label>Height ({unit})</label>
              <input
                type="number"
                name="height"
                value={window.height}
                onChange={(e) => handleChange(e, "windows", i)}
              />
            </div>
          </div>
        ))}
        <button type="button" className="add-button" onClick={() => addSection("windows")}>
          ➕ Add Window
        </button>
      </div>

      <button type="submit" className="submit-button">Calculate Materials</button>
    </form>
  );
};

const getLabel = (field, unit) => {
  const labels = {
    length: "📏 Length",
    width: "📏 Width",
    height: "📏 Height",
  };
  return `${labels[field]} (${unit})`;
};

export default DimensionForm;
