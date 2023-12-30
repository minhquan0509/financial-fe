import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Container } from "@mui/material";
import axios from "axios";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useRef, useState } from "react";
import { Bar, getElementAtEvent } from "react-chartjs-2";
import EmptyIcon from "../icons/Empty";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  barThickness: 40,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      display: false,
      grid: {
        display: false,
      },
      ticks: {
        display: false,
        beginAtZero: true,
      },
    },
  },
};

function StatisticYear() {
  const chartRef = useRef();
  const [detail, setDetail] = useState(0);
  const onClick = (event) => {
    if (getElementAtEvent(chartRef.current, event).length) {
      setDetail(getElementAtEvent(chartRef.current, event)[0].index);
    }
  };

  const [chooseDate, setChooseDate] = useState(new Date());
  const maxDate = new Date();

  const handleIncrementYear = () => {
    const newDate = new Date(chooseDate);
    if (newDate.toDateString() !== maxDate.toDateString()) {
      newDate.setFullYear(chooseDate.getFullYear() + 1);
      setChooseDate(newDate);
    }
  };
  const handleDecrementYear = () => {
    const newDate = new Date(chooseDate);
    newDate.setFullYear(chooseDate.getFullYear() - 1);
    setChooseDate(newDate);
  };
  const [dataArray, setDataArray] = useState([]);
  const [loadStatus, setLoadStatus] = useState("loading");
  useEffect(() => {
    setLoadStatus("loading");
    axios
      .get(
        `${
          process.env.REACT_APP_API_ENDPOINT_PRODUCT
        }/spendings/statistics?year=${chooseDate.getFullYear()}`,
      )
      .then((res) => {
        setDataArray(res.data.data.resultArray);
        setLoadStatus("success");
      });
  }, [chooseDate]);

  const getSpendings = () => {
    if (dataArray.length) {
      return dataArray.map((item, index) => item.totalSpendings);
    }
    return [];
  };
  const getDays = () => {
    if (dataArray.length) {
      return dataArray.map((item) => `Tháng ${item.month}`);
    }
    return [];
  };
  const data = {
    labels: getDays(),
    datasets: [
      {
        data: getSpendings(),
        backgroundColor: "#74C0FF",
        barPercentage: 0.9,
        categoryPercentage: 1,
        borderRadius: 5,
      },
    ],
  };
  const isEmpty = dataArray.every((i) => i.categories.length === 0);
  return (
    <>
      <div className="statistic-button-wrapper statistic-button-month-wrapper">
        <div className="statistic-button-month button-month-back">
          <ArrowBackIosIcon onClick={handleDecrementYear} />
        </div>
        <div className="statistic-month">{chooseDate.getFullYear()}</div>
        <div className="statistic-button-month button-month-back">
          <ArrowForwardIosIcon onClick={handleIncrementYear} />
        </div>
      </div>
      {loadStatus === "loading" ? (
        <div
          style={{
            textAlign: "center",
            height: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "normal",
            fontSize: 20,
          }}
        >
          <center className="font-medium text-xl">Đang tải dữ liệu</center>
        </div>
      ) : isEmpty ? (
        <div
          style={{
            textAlign: "center",
            height: 500,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            fontWeight: "normal",
            fontSize: 20,
          }}
        >
          <p style={{ marginBottom: 10 }}>Không có dữ liệu</p>
          <EmptyIcon size={64} />
        </div>
      ) : (
        <>
          <Container className="chart-container">
            <div
              className="chart-wrapper"
              style={{ width: `${dataArray.length * 64}px` }}
            >
              <Bar
                onClick={onClick}
                options={options}
                data={data}
                ref={chartRef}
              />
            </div>
          </Container>
          <Container>
            <table className="statistic-spendings">
              <thead>
                <tr>
                  <th>Tổng cộng:</th>
                  <th>{dataArray[detail].totalSpendings} đ</th>
                </tr>
              </thead>
              <tbody>
                {dataArray.length
                  ? dataArray[detail].categories.map((item) => (
                      <tr key={item.category_id}>
                        <td>{item.Category.name}:</td>
                        <td>{item.totalSpendings} đ</td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </Container>
        </>
      )}
    </>
  );
}

export default StatisticYear;
