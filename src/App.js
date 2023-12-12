import { Container } from "@mui/material";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Spending from "./pages/Spending";
import { Routes, Route } from "react-router-dom";
import SpendingAdd from "./pages/SpendingAdd";
import SpendingLimit from "./pages/SpendingLimit";
import SpendingLimitAdd from "./pages/SpendingLimitAdd";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spendings" element={<Spending />} />
        <Route path="/spendings-add" element={<SpendingAdd />} />
        <Route path="/spendings-limit" element={<SpendingLimit />} />
        <Route path="/spendings-limit-add" element={<SpendingLimitAdd />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
