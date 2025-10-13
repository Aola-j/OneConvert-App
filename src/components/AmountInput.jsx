function AmountInput () {
    return (
        <div>
            {/* Input fields */}
      <div className="flex justify-between mb-6">
        <input
        type="number"
        placeholder=""
        className="gradient-dropdown p-3 rounded border w-60 md:w-58"
        />

        <input
        type="number"
        placeholder=""
        className="gradient-dropdown p-3 rounded border w-60 md:w-58"
        />
      </div>
        </div>
    )
}

export default AmountInput;