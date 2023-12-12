import { Container } from "@mui/material";
// import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Search } from "@mui/icons-material";
import axios from "axios";
import Footer from "../components/Footer";

function Spending() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const today = new Date();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/spendings").then((res) => {
      setData(res.data.data.spendings);
    });
  }, []);

  return (
    <>
      <Container className="spending">
        <div className="spending-filter">
          <div>
            <DatePicker
              className="spending-date-picker"
              placeholderText="Từ ngày"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              startDate={startDate}
              maxDate={today}
            />
            <DatePicker
              className="spending-date-picker"
              placeholderText="Đến ngày"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              endDate={endDate}
              startDate={startDate}
              minDate={startDate}
              maxDate={today}
            />
          </div>
          <FilterListIcon />
        </div>
        <div className="spending-search">
          <Search style={{ color: "#fd7da9", marginRight: "10px" }} />
          <input className="spending-search-bar" placeholder="Tìm kiếm" />
        </div>
        <div className="spending-list">
          {data.map((data) => (
            <div>
              <div className="spending-date">{data.date}</div>
              {data.spendings.map((spending) => (
                <div className="spending-detail-list">
                  <div className="spending-category">
                    <div className="spending-icon">
                      {/* <BusinessCenterIcon style={{ color: 'red' }} /> */}
                      <img
                        src={
                          "http://localhost:3001/icons/" +
                          spending.Category.Icon.content
                        }
                        alt="icon"
                      />
                    </div>
                    <div className="spending-info">
                      <div className="spending-info-category">
                        {spending.Category.name}
                      </div>
                      <div className="spending-info-note">{spending.note}</div>
                    </div>
                  </div>
                  <div className="price">-{spending.money} đ</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default Spending;
