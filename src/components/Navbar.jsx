import { Link } from "react-router";
import Logo from "../assets/Logo.png"

function Navbar () {
    return (
        <nav>
     {/* Add Logo to the left */}
        <div>
        <img src={Logo} alt="OneConvert Logo"/>
        <span>OneConvert</span>
        </div>

        <div>
        {/* Navigation links */}
      <div className="space-x-4">
        <Link to="/">Currency Converter</Link>
        <Link to="/unit">Unit Converter</Link>
      </div>
        </div>
        </nav>
    )
}

export default Navbar;