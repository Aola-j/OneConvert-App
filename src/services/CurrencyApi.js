export async function getExchangeRate(from,to) {
    const apiKey = f82a68a26438ec9c57bc940d
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}`

    try{
        const response = await fetch(url);
        const data = await response.json();

        if (data.result === "success") {
            return data.conversion_rate;
        } else {
            throw new Error("Failed to fetch exchange rate")
        }
    } catch (error) {
        console.error("Error fetching exchange rate", error);
        return null;
    }
}