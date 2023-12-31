import AddIcon from "@mui/icons-material/Add";
import { Container } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import SubScreenHeader from "../components/SubScreenHeader";
import NextIcon from "../icons/NextIcon";

function SpendingLimit() {
  // const navigate = useNavigate();
  // const [startDate, setStartDate] = useState();
  // const [endDate, setEndDate] = useState();
  // const today = new Date();

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT_PRODUCT}/limits`)
      .then((res) => {
        setData(res.data.data.limitCategories);
      });
  }, []);
  return (
    <Container className="spending">
      <SubScreenHeader title="Hạn mức chi tiêu" />
      <div className="spending-search">
        <div className="spending-search-bar py-3 px-5 flex items-center shadow-md flex-1">
          <div className="flex-1 w-10 text-lg">
            <input
              className="w-full placeholder-white font-medium placeholder:font-medium"
              placeholder="Tìm kiếm"
            />
          </div>
          <div className="text-[#91919F] p-2 bg-white rounded-2xl font-medium flex items-center justify-between gap-1">
            <span>12/2023</span>
            <NextIcon
              color="#91919F"
              size={12}
            />
          </div>
          {/* <DatePicker
              dateFormat="MM/yyyy"
              className="limit-date-picker"
              selected={today}
              onChange={(date) => setStartDate(date)}
              startDate={startDate}
              maxDate={today}
            /> */}
        </div>
        <Link
          to="/spendings-limit-add"
          className="grid place-items-center"
        >
          <AddIcon className="spending-limit-add_icon" />
        </Link>
      </div>
      <div className="spending-list">
        {data.map((spending) => (
          <div
            key={spending.id}
            className="spending-detail-list"
          >
            <div className="spending-category">
              <div className="spending-icon">
                <img
                  src={
                    `${process.env.REACT_APP_API_ENDPOINT_PRODUCT}/icons/` +
                    spending.Category.Icon.content
                  }
                  alt="icon"
                />
              </div>
              <div className="spending-info">
                <div className="spending-info-category">
                  {spending.Category.name}
                </div>
              </div>
            </div>
            <div>
              <div className="price">{spending.limit_money} đ</div>
              <div
                style={{ marginTop: "5px", color: "gray", fontWeight: "600" }}
              >
                {spending.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default SpendingLimit;
