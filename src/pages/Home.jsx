import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ClickAwayListener, Container, Tooltip } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import PercentageBar from "../components/PercentageBar";
import SpendingItem from "../components/SpendingItem";
import LoadingIcon from "../icons/LoadingIcon";
import WarningIcon from "../icons/WarningIcon";
function Home() {
  const [chooseDate, setChooseDate] = useState(new Date());
  const [dataArray, setDataArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const maxDate = new Date();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
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
        <div className="flex items-center">
          <div className="aspect-square w-8 border-[1px] border-[#fd3c81e5] border-solid p-1 bg-white grid place-items-center rounded-full">
            <img
              src="/home-icon.png"
              alt="home-icon"
            />
          </div>
          <span className="flex-1 text-end font-medium text-sm text-slate-500">
            Hôm nay:{" "}
            {new Date().toLocaleDateString("vi", { dateStyle: "full" })}
          </span>
        </div>
        <div className="flex justify-center items-center my-5">
          <div className="statistic-button-month border-none">
            <ArrowBackIosIcon onClick={handleDecrementMonth} />
          </div>
          <div className="text-xl w-48 text-center font-semibold">
            {`Tháng ${(chooseDate.getMonth() + 1)
              .toString()
              .padStart(2, "0")}, ${chooseDate.getFullYear()}`}
          </div>
          <div className="statistic-button-month border-none">
            <ArrowForwardIosIcon onClick={handleIncrementMonth} />
          </div>
        </div>
        <div className="">
          <table className="home-table">
            <thead>
              {dataArray.length ? (
                dataArray.map((item) => (
                  <Item
                    key={item.category_id}
                    item={item}
                  />
                ))
              ) : loading ? (
                <div className="h-32 grid place-items-center">
                  <LoadingIcon size={100} />
                </div>
              ) : (
                <div className="h-32 grid place-items-center">
                  <span className="font-medium text-lg">
                    Không có dữ liệu chi tiêu
                  </span>
                </div>
              )}
            </thead>
          </table>
        </div>
        <Container className="home-total-spendings">
          <div className="mb-3 font-semibold">TỔNG CHI TIÊU</div>
          <div className="home-total-money font-semibold">
            {totalUsedMoney.toLocaleString()} đ
          </div>
        </Container>
        <div
          onClick={() =>
            navigate(
              `/statistics?year=${chooseDate.getFullYear()}&month=${
                chooseDate.getMonth() + 1
              }`,
            )
          }
          className="home-report rounded-lg active:opacity-80 shadow-sm"
        >
          <div className="home-report-label">Xem báo cáo tài chính</div>
          <div className="statistic-button-month border-none">
            <ArrowForwardIosIcon />
          </div>
        </div>
        <div
          style={{
            marginTop: "15px",
          }}
        >
          {loading ? (
            <div className="h-44 grid place-items-center">
              <LoadingIcon size={100} />
            </div>
          ) : (
            dataArray.map((spending) => (
              <SpendingItem
                key={spending.category_id}
                name={spending.name}
                icon={spending.icon.content}
                money={spending.totalUsedMoney}
              />
            ))
          )}
        </div>
      </Container>
      <Footer />
    </>
  );
}
const Item = ({ item }) => {
  const [show, setShow] = useState(false);
  return (
    <tr
      key={item.category_id}
      className="home-table-row"
      onClick={() => setShow(!show)}
    >
      <td className="font-medium">
        <ClickAwayListener onClickAway={() => setShow(false)}>
          <Tooltip
            arrow
            open={show}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={<>Bạn đã chi tiêu {item.percentage}% hạn mức <b>{item.name}</b></>}
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: 'offset',
                    options: {
                      offset: [0, -10],
                    },
                  },
                ],
              },
            }}
          >
            <div className="max-w-[100px] truncate">{item.name}</div>
          </Tooltip>
        </ClickAwayListener>
      </td>
      <td className="w-8/12">
        <PercentageBar value={item.percentage / 100} />
      </td>
      <td className="w-1/12 text-center">
        {item.percentage > 100 && <WarningIcon size={25} />}
      </td>
    </tr>
  );
};
export default Home;
