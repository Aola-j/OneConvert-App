import AmountInput from "./AmountInput";
import ConvertButton from "./ConvertButton";
import CurrencySelector from "./CurrencySelector";

function ConverterCard() {
  return (
    <div className="gradient-card mt-10 mx-auto max-w-5xl p-10 rounded-lg shadow-lg">
      <div className="lg:p-10">
      <div className="flex justify-between mb-6">
        <h3 className="font-semibold text-xl md:text-2xl">From:</h3>
        <h3 className="font-semibold text-xl md:text-2xl mr-49">To:</h3> 
      </div>
      <CurrencySelector />

      {/* Swap Arrow icon */}
      <div className="flex justify-center my-4 text-3xl font-bold">⇄</div>

      <AmountInput />
      <ConvertButton />
    </div>
    </div>
  );
}

export default ConverterCard;
