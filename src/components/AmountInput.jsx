function AmountInput ({ fromAmount, toAmount, setFromAmount, disabled}) {
    
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
  };
    
    
    return (
        <div>
            {/* Input fields */}
      <div className="flex justify-between flex-wrap mb-6">
        {/* From amount */}
        <input
        type="text"
        min="0"
        step="0.01"
        value={formatNumber(fromAmount)}
        onChange={handleChange}
        placeholder=""
        className="gradient-dropdown p-3 rounded border w-60 md:w-58"
        />
        {/* To amount */}
        <input
        type="text"
        value={formatNumber(toAmount)}
        disabled={disabled}
        placeholder=""
        className="gradient-dropdown p-3 rounded border w-60 md:w-58 text-gray cursor-not-allowed"
        />
      </div>
        </div>
    )
}

export default AmountInput;