import { Container } from "@mui/material";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Search } from "@mui/icons-material";

function Spending() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const today = new Date();
  return (
    <Container className="spending">
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
      <div className="spending-search">
        <Search style={{ color: '#fd7da9' }}/>
        <input className="spending-search-bar" placeholder="Tìm kiếm" />
      </div>
      <div className="spending-list">
        <div className="spending-date">Today</div>
        <div className="spending-detail-list">
          <div className="spending-category">
            <div className="spending-icon">
              <BusinessCenterIcon style={{ color: 'red' }} />
            </div>
            <div className="spending-info">
              <div className="spending-info-category">Shopping</div>
              <div className="spending-info-note">Cloths</div>
            </div>
          </div>
          <div className="price">-120.000</div>
        </div>
      </div>
    </Container>
  );
}

export default Spending;
