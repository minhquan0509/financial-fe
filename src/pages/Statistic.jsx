import { useState } from "react";
import Footer from "../components/Footer";
import ScreenHeader from "../components/ScreenHeader";
import StatisticMonth from "../components/StatisticMonth";
import StatisticYear from "../components/StatisticYear";

function Statistic() {
  const [tab, setTab] = useState(1);
  return (
    <>
      <div className="statistic-container">
        <ScreenHeader title="Thống kê chi tiêu" />
        {/* <h2 className="statistic-title">Thống kê chi tiêu</h2> */}
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
