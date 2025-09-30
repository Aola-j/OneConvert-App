import { Link } from "react-router";
import Logo1 from "../assets/Logo1.png"

function Navbar () {
    return (
        <nav className="flex p-px  items-center bg-blue-300/80 shadow-sm fixed top-0 left-0 w-full z-50">
        <div className="flex items-center space-x-3" >
            {/* Mobile menu button (hamburger) */}
          <button className="md:hidden px-2 rounded text-blue-700 font-semibold text-xl">
            ☰
          </button>
        <img className="w-30 sm:w-28 md:w-30 pt-2 ml-10" src={Logo1} alt="OneConvert Logo"/>
        </div>

        {/* Navigation links */}
      <div className="hidden md:flex space-x-10 font-semibold ml-50">
        <Link to="/" className="hover:text-blue-500">Currency Converter</Link>
        <Link to="/unit" className="hover:text-blue-500">Unit Converter</Link>
      </div>
        </nav>
    )
}

export default Navbar;