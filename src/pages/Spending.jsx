import { Container } from "@mui/material";
// import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { Search } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Footer from "../components/Footer";
import SpendingItem from "../components/SpendingItem";
import DropDownIcon from "../icons/DropDownIcon";
import FilterIcon from "../icons/FilterIcon";
import ScreenHeader from "../components/ScreenHeader";
import LoadingIcon from "../icons/LoadingIcon";

function Spending() {
  const [data, setData] = useState([]);
  const [mess, setMess] = useState({ content: "", show: false });
  const [search, setSearch] = useState("");
  const [loadStatus, setLoadStatus] = useState("loading");
  const filteredData = useMemo(() => {
    if (!search) return data;
    return data
      .map((data) => {
        const spendings = data.spendings.filter(
          (spending) =>
            spending.Category.name
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            spending.note.toLowerCase().includes(search.toLowerCase()),
        );
        return { ...data, spendings };
      })
      .filter((data) => data.spendings.length > 0);
  }, [data, search]);
  useEffect(() => {
    setLoadStatus("loading");
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT_PRODUCT}/spendings`)
      .then((res) => {
        setData(res.data.data.spendings);
        setLoadStatus("success");
      });
  }, []);
  const handleClickSpending = (note = "") => {
    if (!note) return;
    const mess = {
      content: note,
      show: true,
    };
    setMess(mess);
    setTimeout(() => {
      setMess({ ...mess, show: false });
    }, 500);
  };

  return (
    <>
      <Container className="spending">
        <ScreenHeader title="Lịch sử chi tiêu" />
        <div
          style={{
            position: "fixed",
            top: 100,
            right: 0,
            width: "100%",
            textAlign: "center",
          }}
        >
          <span
            style={{
              padding: "12px 10px",
              backgroundColor: "#ffffff",
              border: ".5px solid #00000044",
              borderRadius: 10,
              width: 200,
              display: "inline-block",
              boxShadow: "0 1px 5px #00000044",
              transition: "all .3s",
              opacity: mess.show ? 1 : 0,
            }}
          >
            {mess.content}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-5">
            <div className="border-[1px] border-slate-200 border-solid rounded-full p-3 flex gap-3 items-center shadow-sm transition-all active:opacity-50">
              <DropDownIcon
                color="#fd3c81e5"
                size={16}
              />
              <span>Từ ngày</span>
            </div>
            <div className="border-[1px] border-slate-200 border-solid rounded-full p-3 flex gap-3 items-center shadow-sm transition-all active:opacity-50">
              <DropDownIcon
                color="#fd3c81e5"
                size={16}
              />
              <span>Đến ngày</span>
            </div>
          </div>
          <div className="p-1 border-[1px] border-slate-200 border-solid rounded-lg flex items-center justify-center shadow-sm transition-all active:opacity-50">
            <FilterIcon size={30} />
          </div>
        </div>
        <label className="spending-search gap-1">
          <div className="grid place-items-center border-[1px] border-slate-200 border-solid rounded-full p-2 shadow-md transition-all active:bg-[#fd3c8028]">
            <Search style={{ color: "#fd3c81e5" }} />
          </div>
          <input
            className="w-[240px] h-5 py-3 px-6 bg-[#FD3C8177] rounded-full outline-none border-none text-base placeholder:text-white shadow-md"
            placeholder="Tìm kiếm"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
        {loadStatus === "loading" ? (
          <div className="h-80 grid place-items-center font-medium text-xl">
            <LoadingIcon size={100} />
          </div>
        ) : (
          <div className="spending-list">
            {filteredData.map((data) => {
              const date = new Date(data.date);
              const fomatedTitle = `${date
                .getDate()
                .toString()
                .padStart(2, "0")}/${(date.getMonth() + 1)
                .toString()
                .padStart(2, "0")}/${date.getFullYear()}`;
              const isToday = new Date().toDateString() === date.toDateString();
              const isYesterday =
                new Date(
                  new Date().setDate(new Date().getDate() - 1),
                ).toDateString() === date.toDateString();
              return (
                <div key={data.date}>
                  <div className="spending-date">
                    {isToday
                      ? "Hôm nay"
                      : isYesterday
                      ? "Hôm qua"
                      : fomatedTitle}
                  </div>
                  {data.spendings.map((spending) => (
                    <SpendingItem
                      key={spending.id}
                      name={spending.Category.name}
                      icon={spending.Category.Icon.content}
                      note={spending.note}
                      money={spending.money}
                      onClick={() => handleClickSpending(spending.note)}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default Spending;
