import { useState } from "react";
import { Link } from "react-router";
import Logo1 from "../assets/Logo1.png"

function Navbar () {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <nav className="flex p-2  items-center bg-white/80 shadow-sm fixed top-0 left-0 w-full z-50">
        <div className="flex items-center space-x-3" >
            {/* Mobile menu button (hamburger) */}
          <button className="md:hidden px-2 rounded text-blue-700 font-semibold text-3xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? "✕" : "☰"} 
          </button>
        <img className="w-20 md:w-28 ml-4" src={Logo1} alt="OneConvert Logo"/>
        </div>

        {/* Navigation links */}
      <div className="hidden md:flex space-x-10 font-semibold ml-50">
        <Link to="/" className="hover:text-blue-500">Currency Converter</Link>
        <Link to="/unit" className="hover:text-blue-500">Unit Converter</Link>
      </div>

      { /* Mobile Menu */}
      <div
        className={`absolute top-full left-0 w-full bg-white/50 shadow-md md:hidden flex flex-col items-center overflow-hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? "max-h-40 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        }`} >
          <Link to="/"
          onClick={() => setIsMenuOpen(false)}
          className="text-sm font-medium hover:text-blue-500">
            Currency Converter
          </Link>
          <Link to="/unit"
          onClick={() => setIsMenuOpen(false)}
          className="text-sm font-medium hover:text-blue-500">
            Unit Converter
          </Link>
        </div>
        </nav>
    )
}

export default Navbar;