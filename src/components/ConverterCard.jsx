import { useState, useEffect } from "react";
import AmountInput from "./AmountInput";
import ConvertButton from "./ConvertButton";
import CurrencySelector from "./CurrencySelector";
import CurrencyInfoCard from "./CurrencyInfoCard";

function ConverterCard() {
  const [fromCurrency, setFromCurrency] = useState(() => localStorage.getItem("fromCurrency") || "USD")
  const [toCurrency, setToCurrency] = useState(() => localStorage.getItem("toCurrency") || "EUR")
  const [fromAmount, setFromAmount] = useState(() => localStorage.getItem("fromAmount") || "")
  const [toAmount, setToAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [exchangeRate, setExchangeRate] = useState(null);

  {/* Handling conversion*/}
  const handleConvert = async () => {
  if (!fromAmount || isNaN(fromAmount)) {
    setError("Please enter a valid amount");
    return;
  }

  setLoading(true);
  setError("");
  
  try {
    const API_KEY = import.meta.env.VITE_EXCHANGE_API_KEY;
const res = await fetch(
  `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`
);

    const data = await res.json();

    if (data.result === "error") {
      setError("Failed to fetch exchange rates");
      return;
    }

    const rate = data.conversion_rates[toCurrency];
    setExchangeRate(rate);
    const convertedValue = (parseFloat(fromAmount) * rate).toFixed(2);
    setToAmount(convertedValue);
  } catch (err) {
    console.error(err);
    setError("Something went wrong!");
  } finally {
    setLoading(false);
  }
};

// Call on startup
/*useEffect(() => {
    if (fromAmount && !isNaN(fromAmount)) {
      handleConvert()
    }
  }, [fromCurrency, toCurrency, fromAmount]);*/

  // Load saved amount on startup
useEffect(() => {
  const savedAmount = localStorage.getItem("fromAmount")
  if (savedAmount) setFromAmount(savedAmount);
}, []);

// Load saved currencies on startup
useEffect(() => {
  const savedFrom = localStorage.getItem("fromCurrency");
  const savedTo = localStorage.getItem("toCurrency");

  if (savedFrom) setFromCurrency(savedFrom);
  if (savedTo) setToCurrency(savedTo);
}, []);


// Save user input whenever it changes
useEffect(() => {
    localStorage.setItem("fromAmount", fromAmount)
}, [fromAmount]);

// Save selected currencies when they change
useEffect(() => {
  localStorage.setItem("fromCurrency", fromCurrency);
}, [fromCurrency]);

useEffect(() => {
  localStorage.setItem("toCurrency", toCurrency);
}, [toCurrency]);


  return (
    <div className="gradient-card mt-10 mx-auto max-w-5xl p-5 rounded-lg shadow-lg">
      <div className="lg:p-10">
      <div className="flex justify-between mb-6">
        <h3 className="font-medium text-xl md:text-1xl">From:</h3>
        <h3 className="font-medium text-xl md:text-1xl mr-49">To:</h3> 
      </div>


      <div className="flex justify-between flex-wrap mb-6">
        <CurrencySelector selectedCurrency={fromCurrency}
        onChange={setFromCurrency}
        />
      <CurrencySelector selectedCurrency={toCurrency}
      onChange={setToCurrency}
      />
      </div>
      

      {/* Swap Arrow icon */}
      <div className="flex justify-center my-4 text-3xl font-bold">
        <button onClick={() => {
          const prevFrom = fromCurrency
          setFromCurrency(toCurrency)
          setToCurrency(prevFrom);

          if (fromAmount && toAmount) {
            const prevAmount = fromAmount
            setFromAmount(toAmount)
            setToAmount(prevAmount)

          }
        }}
        className="text-2xl w-10 h-10 bg-blue-200/50 font-bold rounded-full transform transition-transform duration-200 hover:scale-125"
          title="Swap currencies">
         ⇄ 
        </button>
        </div>

      <AmountInput  
        fromAmount={fromAmount}
        toAmount={toAmount}
        setFromAmount={setFromAmount}
        setToAmount={setToAmount}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        showSymbols={true}
        />
      <ConvertButton  onClick={handleConvert} loading={loading}/>


        {error && (
        <p className="text-red-500 text-center font-medium text-xs mt-4">{error}</p>
      )}
    </div>
    {/* Currency info section */}
<CurrencyInfoCard
  fromCurrency={fromCurrency}
  toCurrency={toCurrency}
  exchangeRate={exchangeRate}
  lastUpdated={new Date().toLocaleString()}
/>

    </div>
  );
}

export default ConverterCard;
