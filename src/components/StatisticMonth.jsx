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
import LoadingIcon from "../icons/LoadingIcon";
import { useSearchParams } from "react-router-dom";

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
      enabled: true,
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
  const [searchParams] = useSearchParams();
  const [chooseDate, setChooseDate] = useState(
    new Date(
      `01/${searchParams.get("month") || new Date().getMonth() + 1}/${
        searchParams.get("year") || new Date().getFullYear()
      }`,
    ),
  );
  const [detail, setDetail] = useState(0);
  const [loadStatus, setLoadStatus] = useState("loading");
  const [dataArray, setDataArray] = useState([]);
  const onClick = (event) => {
    if (getElementAtEvent(chartRef.current, event).length) {
      setDetail(getElementAtEvent(chartRef.current, event)[0].index);
    }
  };
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
  useEffect(() => {
    setLoadStatus("loading");
    axios
      .get(
        `${
          process.env.REACT_APP_API_ENDPOINT_PRODUCT
        }/spendings/statistics?year=${chooseDate.getFullYear()}&month=${(
          chooseDate.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}`,
      )
      .then((res) => {
        setDataArray(res.data.data.spendings);
        setLoadStatus("success");
      });
    const isChooseCurrentMonth =
      chooseDate.getFullYear() === new Date().getFullYear() &&
      chooseDate.getMonth() === new Date().getMonth();
    if (isChooseCurrentMonth) {
      setDetail(new Date().getDate() - 1);
    }
  }, [chooseDate]);

  const getSpendings = () => {
    if (dataArray.length) {
      return dataArray.map((item, index) => item.totalAmount);
    }
    return [];
  };
  const getDays = () => {
    if (dataArray.length) {
      return dataArray.map((item) => {
        const date = new Date(item.date);
        const dateN = date.getDate().toString().padStart(2, "0");
        const monthN = (date.getMonth() + 1).toString().padStart(2, "0");
        return `${dateN}/${monthN}`;
      });
    }
    return [];
  };
  const data = {
    labels: getDays(),
    datasets: [
      {
        data: getSpendings(),
        backgroundColor: "#74C0FF",
        barPercentage: 0.1,
        categoryPercentage: 0.1,
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
          {(chooseDate.getMonth() + 1).toString().padStart(2, "0")}/
          {chooseDate.getFullYear()}
        </div>
        <div className="statistic-button-month button-month-back">
          <ArrowForwardIosIcon onClick={handleIncrementMonth} />
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
          <center className="font-medium text-xl">
            <LoadingIcon size={100} />
          </center>
        </div>
      ) : (
        <>
          <Container className="chart-container">
            <div
              className="chart-wrapper h-60"
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
                {dataArray.length && dataArray[detail] ? (
                  <tr>
                    <th>Tổng cộng:</th>
                    <th style={{ textAlign: "end" }}>
                      {Number(dataArray[detail].totalAmount).toLocaleString()} đ
                    </th>
                  </tr>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <p style={{ marginBottom: 10 }}>Không có dữ liệu</p>{" "}
                    <EmptyIcon size={64} />
                  </div>
                )}
              </thead>
              <tbody>
                {dataArray.length
                  ? dataArray[detail].categories.map((item) => (
                      <tr key={item.category_id}>
                        <td>{item.Category.name}:</td>
                        <td style={{ textAlign: "end" }}>
                          {Number(item.totalSpendings).toLocaleString()} đ
                        </td>
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

export default StatisticMonth;
