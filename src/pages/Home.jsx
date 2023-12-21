import { Container } from "@mui/material";
import Footer from "../components/Footer";
import PercentageBar from "../components/PercentageBar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
function Home() {
  const [chooseDate, setChooseDate] = useState(new Date());

  return (
    <>
      <Container className="container home-container">
        <div className="statistic-button-month home-logo">
          <img src="/home-icon.png" />
        </div>
        <div className="statistic-button-wrapper statistic-button-month-wrapper">
          <div className="statistic-button-month border-none">
            <ArrowBackIosIcon />
          </div>
          <div className="home-month-picker border-none">
            {`Tháng ${chooseDate.getMonth() + 1}, ${chooseDate.getFullYear()}`}
          </div>
          <div className="statistic-button-month border-none">
            <ArrowForwardIosIcon />
          </div>
        </div>
        <table className="">
          <thead>
            <tr>
              <th className="col1">Tổng cộng:</th>
              <th className="col2">
                <PercentageBar value={1.8} />
              </th>
              <th className="col3"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="col1">Đi lại</td>

              <td className="col2">
                <PercentageBar value={0.75} />
              </td>
              <td className="col3">
                <img src="/warning.png" />
              </td>
            </tr>
            <tr>
              <td className="col1">Ăn uống</td>

              <td className="col2">
                <PercentageBar value={0.55} />
              </td>
              <td className="col3">
                <img src="/warning.png" />
              </td>
            </tr>
            <tr>
              <td className="col1">Nhà</td>

              <td className="col2">
                <PercentageBar value={0.15} />
              </td>
              <td className="col3">
                <img src="/warning.png" />
              </td>
            </tr>
          </tbody>
        </table>
        <Container className="home-total-spendings">
          <div>TỔNG CHI TIÊU</div>
          <div className="home-total-money">10000000 đ</div>
        </Container>
        <div className="home-report">
          <div className="home-report-label">Xem báo cáo tài chính</div>
          <div className="statistic-button-month border-none">
            <ArrowForwardIosIcon />
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default Home;
