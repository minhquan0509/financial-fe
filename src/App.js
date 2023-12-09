import { Container } from "@mui/material";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Spending from "./pages/Spending";
import { Routes, Route } from "react-router-dom";
import SpendingAdd from "./pages/SpendingAdd";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spendings" element={<Spending />} />
        <Route path="/spendings-add" element={<SpendingAdd />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
