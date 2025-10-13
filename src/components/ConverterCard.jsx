import { useState, useEffect } from "react";
import AmountInput from "./AmountInput";
import ConvertButton from "./ConvertButton";
import CurrencySelector from "./CurrencySelector";

function ConverterCard() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  {/* Handling conversion*/}
  const handleConvert = async () => {
  if (!fromAmount || isNaN(fromAmount)) {
    setError("Please enter a valid amount");
    return;
  }

  setLoading(true);
  setError("");
  
  try {
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/f82a68a26438ec9c57bc940d/latest/${fromCurrency}`
    );
    const data = await res.json();

    if (data.result === "error") {
      setError("Failed to fetch exchange rates");
      return;
    }

    const rate = data.conversion_rates[toCurrency];
    const convertedValue = (parseFloat(fromAmount) * rate).toFixed(2);
    setToAmount(convertedValue);
  } catch (err) {
    console.error(err);
    setError("Something went wrong!");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
    if (fromAmount && !isNaN(fromAmount)) {
      handleConvert()
    }
  }, [fromCurrency, toCurrency, fromAmount]);

  // Load saved amount on startup
useEffect(() => {
  const savedAmount = localStorage.getItem("fromAmount")
  if (savedAmount) setFromAmount(savedAmount);
}, []);

// Save user input whenever it changes
useEffect(() => {
  if (fromAmount) {
    localStorage.setItem("fromAmount", fromAmount)
  }
}, [fromAmount]);



  return (
    <div className="gradient-card mt-10 mx-auto max-w-5xl p-10 rounded-lg shadow-lg">
      <div className="lg:p-10">
      <div className="flex justify-between mb-6">
        <h3 className="font-semibold text-xl md:text-2xl">From:</h3>
        <h3 className="font-semibold text-xl md:text-2xl mr-49">To:</h3> 
      </div>


      <div className="flex justify-between mb-6">
        <CurrencySelector selectedCurrency={fromCurrency}
        onChange={setFromCurrency}
        />
      <CurrencySelector selectedCurrency={toCurrency}
      onChange={setToCurrency}
      />
      </div>
      

      {/* Swap Arrow icon */}
      <div className="flex justify-center my-4 text-3xl font-bold">⇄</div>

      <AmountInput  fromAmount={fromAmount}
        toAmount={toAmount}
        setFromAmount={setFromAmount}
        disabled />
      <ConvertButton  onClick={handleConvert} loading={loading}/>

        {error && (
        <p className="text-red-600 text-center font-medium mt-4">{error}</p>
      )}
    </div>
    </div>
  );
}

export default ConverterCard;
