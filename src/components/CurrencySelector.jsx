import ConverterCard from "./ConverterCard";

function CurrencySelector () {
    return (
        <div>
            {/* Currency Dropdown */}
      <div className="flex justify-between mb-6">
        <select className="gradient-dropdown p-3 w-60 md:w-58">
            <option>USD</option>
            <option>EUR</option>
            <option>GBP</option>
        </select>
      </div>
        </div>
    )
}

export default CurrencySelector;