import { useEffect, useState, useRef } from "react"

function CurrencySelector ({ selectedCurrency, onChange }) {

const [currencies, setCurrencies] = useState([])
const [loading, setLoading] = useState(true)
const [search, setSearch] = useState("")
const [isOpen, setIsOpen] = useState(false) //toggle dropddown
const dropdownRef = useRef(null)

useEffect(() => {
    const fetchCurrencies = async () => {

    try{
        const res = await fetch(
            "https://v6.exchangerate-api.com/v6/f82a68a26438ec9c57bc940d/latest/USD"
        )
        const data = await res.json()
        setCurrencies(Object.keys(data.conversion_rates))
    } catch (err) {
        console.error("Error loading currencies", err)
    } finally {
        setLoading(false)
    }
 }
 fetchCurrencies()
}, [])

// close dropdown on click outside
useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

const filteredCurrencies = currencies.filter((c) => c.toLowerCase().includes(search.toLowerCase()))

// Selected currency visibility
const handleSelect = (currency) => {
    onChange(currency);
    setIsOpen(false); // close dropdown after selection
    setSearch(""); // clear search
  };

  return (
    <div ref={dropdownRef} className="relative w-60 md:w-58">
      {/* Dropdown button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="gradient-dropdown p-3 w-full rounded border text-left flex justify-between items-center transition duration-200 hover:shadow-md"
      >
        {loading ? "Loading..." : selectedCurrency || "Select currency"}
        <span className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}>
            ▼
            </span>
      </button>

      {/* Dropdown menu */}
       <div
        className={`absolute z-10 w-full mt-2 bg-white border rounded shadow-lg transform transition-all duration-300 origin-top ${
          isOpen
            ? "opacity-100 scale-y-100"
            : "opacity-0 scale-y-0 pointer-events-none"
        }`}
      >

          {/* Search input */}
          <input
            type="text"
            placeholder="Search currency..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-b p-2 w-full outline-none"
          />

          {/* Currency list */}
          <div className="max-h-40 overflow-y-auto">
            {filteredCurrencies.map((currency) => (
              <div
                key={currency}
                onClick={() => handleSelect(currency)}
                className="p-2 hover:bg-blue-100 cursor-pointer transition-colors"
              >
                {currency}
              </div>
            ))}

            {filteredCurrencies.length === 0 && (
              <div className="p-2 text-gray-500 text-center">No results</div>
            )}
          </div>
        </div>
    </div>
  );
}

export default CurrencySelector;