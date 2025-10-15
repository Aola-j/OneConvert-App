import ConverterCard from "./ConverterCard";

function CurrencyConverter() {
  return (
    <div className="pt-25 px-4">
      <h2 className="mt-10 md:ml-10 lg:ml-10 font-semibold md:text-1xl lg:text-2xl">Currency Converter</h2>
      <ConverterCard />
    </div>
  );
}

export default CurrencyConverter;