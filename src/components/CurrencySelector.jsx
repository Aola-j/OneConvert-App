import { useEffect, useState, useRef } from "react"
import currencyData from "../services/currencyData"

function CurrencySelector ({ selectedCurrency, onChange }) {

const [currencies, setCurrencies] = useState([])
const [loading, setLoading] = useState(true)
const [search, setSearch] = useState("")
const [isOpen, setIsOpen] = useState(false) //toggle dropddown
const [selectedLabel, setSelectedLabel] = useState("");
const dropdownRef = useRef(null)

useEffect(() => {
    const fetchCurrencies = async () => {

    try{
        const res = await fetch(
            "https://v6.exchangerate-api.com/v6/f82a68a26438ec9c57bc940d/latest/USD"
        )
        const data = await res.json()
        if (data.result === "error") throw new Error("Invalid API response")
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

  //filter currencies with search
const filteredCurrencies = currencies.filter((code) => {
  const info = currencyData.find((c) => c.code === code)
  const name = info ? info.name : ""
  return (
    code.toLowerCase().includes(search.toLowerCase()) || 
    name.toLowerCase().includes(search.toLowerCase())
  )
  
})

// Selected currency visibility
const handleSelect = (currency) => {
  const info = currencyData.find((c) => c.code === currency)
  const label = info ? `${currency} - ${info.name}` : currency

  setSelectedLabel(label)
    onChange(currency);
    setIsOpen(false); // close dropdown after selection
    setSearch(""); // clear search
  };

  // Whenever selectedCurrency changes from outside, update the label too
  useEffect(() => {
    const info = currencyData.find((c) => c.code === selectedCurrency);
    if (info) {
      setSelectedLabel(`${selectedCurrency} - ${info.name}`);
    } else {
      setSelectedLabel(selectedCurrency || "");
    }
  }, [selectedCurrency]);

  return (
    <div ref={dropdownRef} className="relative w-60 md:w-58">
      {/* Dropdown button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="gradient-dropdown p-3 w-full rounded border text-left font-semibold flex justify-between items-center transition duration-200 hover:shadow-md"
      >
        <span className="truncate block max-w-[85%]">
          {loading ? "Loading..." : selectedLabel || "Select currency"}
        </span>
        
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
            {filteredCurrencies.map((code) =>  {
            const info = currencyData.find((c) => c.code === code);
            const name = info ? info.name : ""
            return (
              <div
                key={code}
                onClick={() => handleSelect(code)}
                className="p-2 hover:bg-blue-100 cursor-pointer transition-colors"
              >
                {info ? `${code} (${name})` : code}
              </div>
            )
            })}

            {filteredCurrencies.length === 0 && (
              <div className="p-2 text-gray-500 text-center">No results</div>
            )}
          </div>
        </div>
    </div>
  );
}

export default CurrencySelector;