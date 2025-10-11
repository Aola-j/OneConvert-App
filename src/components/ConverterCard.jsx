function ConverterCard({ children }) {
  return (
    <div className="gradient-card mt-10 pb-100 md:mx-10 lg:mx-35 shadow-lg">
      {children}
      <div className="flex justify-between flex-wrap lg:ml-20 md:ml-20 lg:mr-150 md:mr-75 items-center pt-20">
        <h3 className="font-semibold text-3xl">From:</h3>
        <h3 className="font-semibold text-3xl">To:</h3> 
      </div>
    </div>
  );
}

export default ConverterCard;
