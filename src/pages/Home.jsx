import { Container } from "@mui/material";
import Footer from "../components/Footer";
import PercentageBar from "../components/PercentageBar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useState } from "react";
import axios from "axios";
function Home() {
  const [chooseDate, setChooseDate] = useState(new Date());
  const [dataArray, setDataArray] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${
          process.env.REACT_APP_API_ENDPOINT_PRODUCT
        }/spendings/ratios?year=${chooseDate.getFullYear()}&month=${
          chooseDate.getMonth() + 1
        }`
      )
      .then((res) => {
        setDataArray(res.data.data.ratioSpendingsInMonth);
      });
  }, [chooseDate]);

  const handleIncrementMonth = () => {
    const newDate = new Date(chooseDate);
    newDate.setMonth(chooseDate.getMonth() + 1);
    setChooseDate(newDate);
  };
  const handleDecrementMonth = () => {
    const newDate = new Date(chooseDate);
    newDate.setMonth(chooseDate.getMonth() - 1);
    setChooseDate(newDate);
  };

  return (
    <>
      <Container className="container home-container">
        <div className="statistic-button-month home-logo">
          <img src="/home-icon.png" />
        </div>
        <div className="statistic-button-wrapper statistic-button-month-wrapper">
          <div className="statistic-button-month border-none">
            <ArrowBackIosIcon onClick={handleDecrementMonth} />
          </div>
          <div className="home-month-picker border-none">
            {`Tháng ${chooseDate.getMonth() + 1}, ${chooseDate.getFullYear()}`}
          </div>
          <div className="statistic-button-month border-none">
            <ArrowForwardIosIcon onClick={handleIncrementMonth} />
          </div>
        </div>
        <table className="">
          <thead></thead>
          <tbody>
            {dataArray.length &&
              dataArray.map((item) => (
                <tr>
                  <td className="col1">{item.name}</td>

                  <td className="col2">
                    <PercentageBar value={item.percentage / 100} />
                  </td>
                  <td className="col3">
                    {item.percentage > 100 && <img src="/warning.png" />}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Container className="home-total-spendings">
          <div>TỔNG CHI TIÊU</div>
          <div className="home-total-money">
            {dataArray.length &&
              dataArray.reduce(
                (accumulator, item) => accumulator + item.totalUsedMoney,
                0
              )}{" "}
            đ
          </div>
        </Container>
        <div className="home-report">
          <div className="home-report-label">Xem báo cáo tài chính</div>
          <div className="statistic-button-month border-none">
            <ArrowForwardIosIcon />
          </div>
        </div>
        {dataArray.map((spending) => (
          <div className="spending-detail-list">
            <div className="spending-category">
              <div className="spending-icon">
                {/* <BusinessCenterIcon style={{ color: 'red' }} /> */}
                <img
                  src={
                    `${process.env.REACT_APP_API_ENDPOINT_PRODUCT}/icons/` +
                    spending.icon.content
                  }
                  alt="icon"
                />
              </div>
              <div className="spending-info">
                <div className="spending-info-category">{spending.name}</div>
                <div className="spending-info-note">{spending.name}</div>
              </div>
            </div>
            <div className="price">-{spending.totalUsedMoney} đ</div>
          </div>
        ))}
      </Container>
      <Footer />
    </>
  );
}

export default Home;
