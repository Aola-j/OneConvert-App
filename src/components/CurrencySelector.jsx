import { useEffect, useState } from "react"

function CurrencySelector ({ selectedCurrency, onChange }) {

const [currencies, setCurrencies] = useState([])
const [loading, setLoading] = useState(true)
const [search, setSearch] = useState("")

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

const filteredCurrencies = currencies.filter((c) => c.toLowerCase().includes(search.toLowerCase()))


    return (
        <div>
        <input
        type="text"
        placeholder="Search currency..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />

      <div className="flex justify-between mb-6">
        <select 
        value={selectedCurrency}
        onChange={(e) => onChange(e.target.value)}
        className="gradient-dropdown p-3 w-60 md:w-58">
            {loading ? (
                <option>Loading...</option>
            ) : (
                filteredCurrencies.map((currency) => (
                    <option key={currency} value={currency}>
                        {currency}
                    </option>
                ))
            )}
        </select>
      </div>
        </div>
    )
}

export default CurrencySelector;