import { useState, useEffect } from "react";
import AmountInput from "./AmountInput";
import ConvertButton from "./ConvertButton";
import UnitSelector from "./UnitSelector";

function UnitConverterCard() {
  const [unitType, setUnitType] = useState("length");
  const [fromUnit, setFromUnit] = useState("Meters");
  const [toUnit, setToUnit] = useState("Kilometers");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [error, setError] = useState("");

  //Conversion logic for length, weight, temperature
  const convertUnits = () => {
    if (!fromAmount || isNaN(fromAmount)) {
      setError("Please enter a valid number");
      return;
    }

    setError("");

    let value = parseFloat(fromAmount);
    let result = value;

    // Handle conversions by category
    switch (unitType) {
      case "length":
        result = convertLength(value, fromUnit, toUnit);
        break;
      case "weight":
        result = convertWeight(value, fromUnit, toUnit);
        break;
      case "temperature":
        result = convertTemperature(value, fromUnit, toUnit);
        break;
      default:
        result = value;
    }

    setToAmount(result.toFixed(4));
  };

  // Conversion helper functions
  const convertLength = (value, from, to) => {
    const toMeters = {
      Meters: 1,
      Kilometers: 1000,
      Miles: 1609.34,
      Feet: 0.3048,
      Centimeters: 0.01,
      Inches: 0.0254,
    };
    return (value * toMeters[from]) / toMeters[to];
  };

  const convertWeight = (value, from, to) => {
    const toGrams = {
      Grams: 1,
      Kilograms: 1000,
      Pounds: 453.592,
      Ounces: 28.3495,
    };
    return (value * toGrams[from]) / toGrams[to];
  };

  const convertTemperature = (value, from, to) => {
    let celsius;

    // Convert to Celsius first
    if (from === "Fahrenheit") celsius = (value - 32) * (5 / 9);
    else if (from === "Kelvin") celsius = value - 273.15;
    else celsius = value;

    // Then from Celsius to target
    if (to === "Fahrenheit") return celsius * (9 / 5) + 32;
    if (to === "Kelvin") return celsius + 273.15;
    return celsius;
  };
  //Automatically convert as user types
  useEffect(() => {
    if (!fromAmount) {
      setToAmount("")
      return;
    }

    if (isNaN(fromAmount)) return;

    let value = parseFloat(fromAmount);
    let result = value;

    switch (unitType) {
      case "length":
        result = convertLength(value, fromUnit, toUnit);
        break;
      case "weight":
        result = convertWeight(value, fromUnit, toUnit);
        break;
      case "temperature":
        result = convertTemperature(value, fromUnit, toUnit);
        break;
      default:
        result = value;
    }

     setToAmount(result.toFixed(4)); //update output instantly
  }, [fromAmount, fromUnit, toUnit, unitType]); // dependencies


  return (
    <div className="gradient-card mt-10 mx-auto max-w-5xl p-2 rounded-lg shadow-lg">
      <div className="lg:p-10">
        {/* 🧭 Unit Type Selector */}
        <div className="flex justify-center mb-8">
          <select
            value={unitType}
            onChange={(e) => {
              setUnitType(e.target.value);
              // reset units when switching type
              setFromAmount("");
              setToAmount("");
              setFromUnit("Meters");
              setToUnit("Kilometers");
            }}
            className="gradient-dropdown p-3 rounded font-semibold"
          >
            <option value="length">Length</option>
            <option value="weight">Weight</option>
            <option value="temperature">Temperature</option>
          </select>
        </div>

        {/* Labels */}
        {/* Unit selectors */}
        <div className="flex md:justify-between justify-center flex-wrap mb-6">
          <div>
            <h3 className="font-semibold text-xl md:text-1xl">From:</h3>
            <UnitSelector
            selectedUnit={fromUnit}
            onChange={setFromUnit}
            unitType={unitType}
          />
          </div>
      
        <div>
           <h3 className="font-semibold text-xl md:text-1xl mr-49">To:</h3>
            <UnitSelector
            selectedUnit={toUnit}
            onChange={setToUnit}
            unitType={unitType}
          />
        </div>

        </div>

       {/* Swap Arrow icon */}
      <div className="flex justify-center my-4 text-3xl font-bold">
        <button onClick={() => {
          const prevFrom = fromUnit
          setFromUnit(toUnit)
          setToUnit(prevFrom);

          if (fromAmount && toAmount) {
            const prevAmount = fromAmount
            setFromAmount(toAmount)
            setToAmount(prevAmount)

          }
        }}
        className="text-2xl text-blue-700 w-10 h-10 bg-blue-200/50 font-bold rounded-full transform transition-transform duration-200 hover:scale-125"
          title="Swap units">
         ⇄ 
        </button>
        </div>

        {/* Amount inputs */}
        <AmountInput
          fromAmount={fromAmount}
          toAmount={toAmount}
          setFromAmount={setFromAmount}
          setToAmount={setToAmount}
          showSymbols={false}
          disabled
        />

        {/* Convert button */}
        <ConvertButton onClick={convertUnits} />

        {/* Error display */}
        {error && (
          <p className="text-red-500 text-center font-medium text-xs mt-4">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default UnitConverterCard;
