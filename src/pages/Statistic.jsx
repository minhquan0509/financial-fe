import { Container } from "@mui/material";
import Footer from "../components/Footer";
import { useState } from "react";
import StatisticMonth from "../components/StatisticMonth";
import StatisticYear from "../components/StatisticYear";

function Statistic() {
  const [tab, setTab] = useState(1);
  return (
    <>
      <div className="statistic-container">
        <Container>
          <h2 className="statistic-title">Thống kê chi tiêu</h2>
        </Container>
        <div className="statistic-button-wrapper">
          <div
            onClick={() => setTab(1)}
            className={`statistic-button button-monthly ${
              tab === 1 ? `statistic-button-active` : null
            }`}
          >
            Hàng ngày
          </div>
          <div
            onClick={() => setTab(2)}
            className={`statistic-button button-yearly ${
              tab === 2 ? `statistic-button-active` : null
            }`}
          >
            Hàng tháng
          </div>
        </div>

        {tab === 1 ? <StatisticMonth /> : <StatisticYear />}
      </div>
      <Footer />
    </>
  );
}

export default Statistic;
