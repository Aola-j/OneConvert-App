import { useState } from "react";

function UnitSelector({ selectedUnit, onChange, unitType }) {
  const unitOptions = {
    length: ["Meters", "Kilometers", "Miles", "Feet", "Centimeters", "Inches"],
    weight: ["Grams", "Kilograms", "Pounds", "Ounces"],
    temperature: ["Celsius", "Fahrenheit", "Kelvin"],
  };

  const units = unitOptions[unitType] || [];

  return (
    <div className="relative w-60 md:w-58">
      <select
        value={selectedUnit}
        onChange={(e) => onChange(e.target.value)}
        className="gradient-dropdown p-3 w-full rounded border text-left font-medium hover:shadow-md transition"
      >
        {units.map((unit) => (
          <option key={unit} value={unit}>
            {unit}
          </option>
        ))}
      </select>
    </div>
  );
}

export default UnitSelector;
