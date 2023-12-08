import { Container } from "@mui/material";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Spending() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  return (
    <Container className="spending">
      <div>
        <DatePicker
          className="spending-date-picker"
          placeholderText="Từ ngày"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <DatePicker
          className="spending-date-picker"
          placeholderText="Đến ngày"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
        />
      </div>
      <div className="spending-search">
        <input className="spending-search-bar" placeholder="Tìm kiếm" />
      </div>
    </Container>
  );
}

export default Spending;
