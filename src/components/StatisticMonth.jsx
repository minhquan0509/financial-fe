import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { BarChart } from "@mui/x-charts/BarChart";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, getElementAtEvent } from "react-chartjs-2";
import { useRef } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
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

function StatisticMonth() {
  const chartRef = useRef();
  const [detail, setDetail] = useState(0);
  const onClick = (event) => {
    if (getElementAtEvent(chartRef.current, event).length) {
      setDetail(getElementAtEvent(chartRef.current, event)[0].index);
    }
  };

  const [chooseDate, setChooseDate] = useState(new Date());
  const maxDate = new Date();
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
  const [dataArray, setDataArray] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${
          process.env.REACT_APP_API_ENDPOINT_PRODUCT
        }/spendings/statistics?year=${chooseDate.getFullYear()}&month=${
          chooseDate.getMonth() + 1
        }`
      )
      .then((res) => {
        setDataArray(res.data.data.spendings);
      });
  }, [chooseDate]);

  const getSpendings = () => {
    if (dataArray.length) {
      return dataArray.map((item, index) => item.totalAmount);
    }
    return [];
  };
  const getDays = () => {
    if (dataArray.length) {
      return dataArray.map(
        (item) => `${item.date.slice(-2)}/${item.date.slice(5, 7)}`
      );
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
  return (
    <>
      <div className="statistic-button-wrapper statistic-button-month-wrapper">
        <div className="statistic-button-month button-month-back">
          <ArrowBackIosIcon onClick={handleDecrementMonth} />
        </div>
        <div className="statistic-month">
          {chooseDate.getMonth() + 1}/{chooseDate.getFullYear()}
        </div>
        <div className="statistic-button-month button-month-back">
          <ArrowForwardIosIcon onClick={handleIncrementMonth} />
        </div>
      </div>
      <Container className="chart-container">
        <div
          className="chart-wrapper"
          style={{ width: `${dataArray.length * 80}px` }}
        >
          <Bar onClick={onClick} options={options} data={data} ref={chartRef} />
        </div>
      </Container>
      <Container>
        <table className="statistic-spendings">
          <thead>
            {dataArray.length && dataArray[detail] ? (
              <tr>
                <th>Tổng cộng:</th>
                <th>{dataArray[detail].totalAmount} đ</th>
              </tr>
            ) : (
              "Không có dữ liệu"
            )}
          </thead>
          <tbody>
            {dataArray.length
              ? dataArray[detail].categories.map((item) => (
                  <tr>
                    <td>{item.Category.name}:</td>
                    <td>{item.totalSpendings} đ</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </Container>
    </>
  );
}

export default StatisticMonth;
