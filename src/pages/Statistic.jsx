import { Container } from "@mui/material";
import Footer from "../components/Footer";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { BarChart } from "@mui/x-charts/BarChart";

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = ["1", "2", "3", "4", "5", "6", "7"];

function Statistic() {
  return (
    <>
      <div className="statistic-container">
        <Container>
          <h2 className="statistic-title">Thống kê chi tiêu</h2>
        </Container>
        <div className="statistic-button-wrapper">
          <div className="statistic-button button-monthly statistic-button-active">
            Hàng ngày
          </div>
          <div className="statistic-button button-yearly">Hàng tháng</div>
        </div>

        <div className="statistic-button-wrapper statistic-button-month-wrapper">
          <div className="statistic-button-month button-month-back">
            <ArrowBackIosIcon />
          </div>
          <div className="statistic-month">11/2023</div>
          <div className="statistic-button-month button-month-back">
            <ArrowForwardIosIcon />
          </div>
        </div>
        <Container>
          <BarChart
            // width={500}
            height={300}
            series={[
              {
                data: uData,
                label: "uv",
                id: "uvId",
                stack: "total",
                color: "#74C0FF",
              },
            ]}
            xAxis={[{ data: xLabels, scaleType: "band" }]}
          />
        </Container>
        <Container>
          <table className="statistic-spendings">
            <thead>
              <tr>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tổng cộng:</td>
                <td>300000</td>
              </tr>
              <tr>
                <td>Ăn uống:</td>
                <td>200000</td>
              </tr>
              <tr>
                <td>Ăn uống:</td>
                <td>200000</td>
              </tr>
            </tbody>
          </table>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Statistic;
