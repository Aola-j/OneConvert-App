function AmountInput ({ fromAmount, toAmount, setFromAmount, disabled}) {
    return (
        <div>
            {/* Input fields */}
      <div className="flex justify-between flex-wrap mb-6">
        {/* From amount */}
        <input
        type="number"
        min="0"
        step="0.01"
        value={fromAmount}
        onChange={(e) => setFromAmount(e.target.value)}
        placeholder=""
        className="gradient-dropdown p-3 rounded border w-60 md:w-58"
        />
        {/* To amount */}
        <input
        type="text"
        value={toAmount}
        disabled={disabled}
        placeholder=""
        className="gradient-dropdown p-3 rounded border w-60 md:w-58 text-gray cursor-not-allowed"
        />
      </div>
        </div>
    )
}

export default AmountInput;