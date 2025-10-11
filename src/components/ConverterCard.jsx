function ConverterCard() {
  return (
    <div className="gradient-card mt-10 mx-auto max-w-5xl p-10 rounded-lg shadow-lg">
      <div className="lg:p-10">
      <div className="flex justify-between mb-6">
        <h3 className="font-semibold text-xl md:text-2xl">From:</h3>
        <h3 className="font-semibold text-xl md:text-2xl mr-49">To:</h3> 
      </div>

      {/* Currency Dropdown */}
      <div className="flex justify-between mb-6">
        <select className="gradient-dropdown p-3 w-60 md:w-58">
            <option>USD</option>
            <option>EUR</option>
            <option>GBP</option>
        </select>

         <select className="gradient-dropdown p-3 rounded border w-60 md:w-58">
            <option>USD</option>
            <option>EUR</option>
            <option>GBP</option>
        </select>
      </div>

      {/* Swap Arrow icon */}
      <div className="flex justify-center my-4 text-3xl font-bold">⇄</div>

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

      {/* Convert button */}
      <div className="flex justify-center">
        <button className="gradient-dropdown p-3 rounded border w-40 md:w-48 text-xl">
            Convert
        </button>
      </div>
    </div>
    </div>
  );
}

export default ConverterCard;
