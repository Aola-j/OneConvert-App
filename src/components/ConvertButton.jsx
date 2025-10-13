function ConvertButton ({ onClick, loading}) {
    return (
      <div className="flex justify-center">
        <button onClick={onClick}
        disabled={loading}
        className={`bg-blue-600 text-white px-6 py-2 rounded-md font-semibold mt-4 hover:bg-blue-700 transition ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {loading ? "Converting..." : "Convert"}
        </button>
      </div>
    )
}

export default ConvertButton;