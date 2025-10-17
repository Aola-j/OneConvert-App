import currencySymbols from "../services/currencySymbols";

function AmountInput ({ fromAmount, toAmount, setFromAmount, setToAmount, fromCurrency, toCurrency, disabled, showSymbols = true,}) {
    
    //Adding commas for more interactivity

     const formatNumber = (value) => {
    if (!value) return "";
    const num = value.replace(/,/g, ""); // remove existing commas
    if (isNaN(num)) return fromAmount; // prevent invalid input
    return Number(num).toLocaleString();
  };

  const handleChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9.]/g, ""); // remove commas for storage
    setFromAmount(rawValue);

     // If the user deletes everything, clear the "To" field too
  if (rawValue === "") {
    setToAmount("");
  }
  };
    
    return (
      <div className="flex md:justify-between justify-center flex-wrap mb-6">
        {/* From amount */}

        <div className="relative mb-4">
        <span className="absolute left-3 top-3 text-black">
          {currencySymbols[fromCurrency] || ""}
        </span>
        <input
        type="text"
        min="0"
        step="0.01"
        value={formatNumber(fromAmount)}
        onChange={handleChange}
        placeholder=""
        className={`gradient-dropdown p-3 ${
            showSymbols ? "pl-10" : "pl-3"
          } rounded border w-60 md:w-58`}
        />
        </div>

        {/* To amount */}
         <div className="relative">
         {showSymbols && (
          <span className="absolute left-3 top-3 text-black">
            {currencySymbols[toCurrency] || "€"}
          </span>
        )}
        <input
        type="text"
        value={formatNumber(toAmount)}
        disabled={disabled}
        placeholder=""
        className={`gradient-dropdown p-3 ${
            showSymbols ? "pl-10" : "pl-3"
          } rounded border w-60 md:w-58 text-gray cursor-not-allowed`}
        />
        </div>
      </div>
    )
}

export default AmountInput;