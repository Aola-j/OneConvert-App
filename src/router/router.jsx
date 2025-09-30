import { createBrowserRouter } from "react-router";
import CurrencyConverter from "../components/CurrencyConverter";
import Navbar from "../components/Navbar";
import UnitConverter from "../components/UnitConverter";



const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <CurrencyConverter />
      </>
    ),
  },
  {
    path: "/unit",
    element: (
      <>
        <Navbar />
        <UnitConverter />
      </>
    ),
  },
]);

export default router;