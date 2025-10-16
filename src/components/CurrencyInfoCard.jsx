import React from "react";

function CurrencyInfoCard({ fromCurrency, toCurrency, exchangeRate, lastUpdated }) {
  return (
    <div className="bg-white/70 backdrop-blur-md mt-6 p-6 rounded-lg shadow-md text-center">
      <h3 className="text-xl font-semibold mb-3">Currency Information</h3>

      <p className="text-gray-800 font-medium">
        <span className="text-blue-600">{fromCurrency}</span> →{" "}
        <span className="text-green-600">{toCurrency}</span>
      </p>

      <p className="text-lg mt-2">
        <strong>Exchange Rate:</strong> {exchangeRate || "N/A"}
      </p>

      <p className="text-sm text-gray-600 mt-2">
        Last Updated: {lastUpdated || "Not available"}
      </p>

      <div className="mt-4 text-gray-700 italic">
        Historical trend data coming soon 📊
      </div>
    </div>
  );
}

export default CurrencyInfoCard;
