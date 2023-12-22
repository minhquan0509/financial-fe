import { Container } from "@mui/material";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Spending from "./pages/Spending";
import { Routes, Route } from "react-router-dom";
import SpendingAdd from "./pages/SpendingAdd";
import SpendingLimit from "./pages/SpendingLimit";
import SpendingLimitAdd from "./pages/SpendingLimitAdd";
import Statistic from "./pages/Statistic";
import { useEffect } from "react";
import { getMessagingToken, onMessageListener } from "./firebase";
import Categories from "./pages/Categories";
import CategoriesAdd from "./pages/CategoriesAdd";
function App() {
  useEffect(() => {
    getMessagingToken();
    const channel = new BroadcastChannel("notifications");
    channel.addEventListener("message", (event) => {
      console.log("Receive background: ", event.data);
    });
  }, []);
  useEffect(() => {
    onMessageListener().then((data) => {
      console.log("Receive foreground: ", data);
      alert(`${data.notification.title} ${data.notification.body}`);
    });
  });
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spendings" element={<Spending />} />
        <Route path="/spendings-add" element={<SpendingAdd />} />
        <Route path="/spendings-limit" element={<SpendingLimit />} />
        <Route path="/spendings-limit-add" element={<SpendingLimitAdd />} />
        <Route path="/statistics" element={<Statistic />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category-add" element={<CategoriesAdd />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
