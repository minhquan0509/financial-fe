import { Container } from "@mui/material";
import Footer from "../components/Footer";
import PercentageBar from "../components/PercentageBar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SpendingItem from "../components/SpendingItem";
import LoadingIcon from "../icons/LoadingIcon";
function Home() {
  const [chooseDate, setChooseDate] = useState(new Date());
  const [dataArray, setDataArray] = useState([]);
  const maxDate = new Date();

  useEffect(() => {
    axios
      .get(
        `${
          process.env.REACT_APP_API_ENDPOINT_PRODUCT
        }/spendings/ratios?year=${chooseDate.getFullYear()}&month=${
          chooseDate.getMonth() + 1
        }`,
      )
      .then((res) => {
        setDataArray(res.data.data.ratioSpendingsInMonth);
      });
  }, [chooseDate]);

  const handleIncrementMonth = () => {
    const newDate = new Date(chooseDate);
    if (newDate.toDateString() !== maxDate.toDateString()) {
      newDate.setMonth(chooseDate.getMonth() + 1);
      setChooseDate(newDate);
    }
  };
  const handleDecrementMonth = () => {
    const newDate = new Date(chooseDate);
    newDate.setMonth(chooseDate.getMonth() - 1);
    setChooseDate(newDate);
  };
  const totalUsedMoney = dataArray.reduce(
    (accumulator, item) => accumulator + item.totalUsedMoney,
    0,
  );
  return (
    <>
      <Container className="container home-container">
        <div className="aspect-square w-8 border-[1px] border-[#fd3c81e5] border-solid p-1 bg-white grid place-items-center rounded-full">
          <img
            src="/home-icon.png"
            alt="home-icon"
          />
        </div>
        <div className="flex justify-center items-center my-5">
          <div className="statistic-button-month border-none">
            <ArrowBackIosIcon onClick={handleDecrementMonth} />
          </div>
          <div className="font-medium text-xl w-48 text-center">
            {`Tháng ${(chooseDate.getMonth() + 1)
              .toString()
              .padStart(2, "0")}, ${chooseDate.getFullYear()}`}
          </div>
          <div className="statistic-button-month border-none">
            <ArrowForwardIosIcon onClick={handleIncrementMonth} />
          </div>
        </div>
        <table className="home-table">
          <thead>
            {dataArray.length ? (
              dataArray.map((item) => (
                <tr
                  key={item.category_id}
                  className="home-table-row"
                >
                  <td className="font-medium">{item.name}</td>
                  <td className="w-8/12">
                    <PercentageBar value={item.percentage / 100} />
                  </td>
                  <td className="w-1/12">
                    {item.percentage > 100 && (
                      <img
                        src="/warning.png"
                        alt="warning-icon"
                      />
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <div style={{ textAlign: "center" }}>
                Không có dữ liệu chi tiêu
              </div>
            )}
          </thead>
        </table>
        <Container className="home-total-spendings">
          <div className="mb-3 font-medium">TỔNG CHI TIÊU</div>
          <div className="home-total-money font-medium">
            {totalUsedMoney.toLocaleString()} đ
          </div>
        </Container>
        <Link
          to="/statistics"
          className="home-report rounded-lg"
        >
          <div className="home-report-label">Xem báo cáo tài chính</div>
          <div className="statistic-button-month border-none">
            <ArrowForwardIosIcon />
          </div>
        </Link>
        <div
          style={{
            marginTop: "15px",
          }}
        >
          {dataArray.map((spending) => (
            <SpendingItem
              key={spending.category_id}
              name={spending.name}
              note={spending.name}
              icon={spending.icon.content}
              money={spending.totalUsedMoney}
            />
          ))}
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default Home;
