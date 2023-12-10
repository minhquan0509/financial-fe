import { Container } from "@mui/material";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
function SpendingLimit() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  return (
    <Container className="spending">
      <div>
        <Container className="spending-add-header spending-limit-header">
          <ArrowBackIcon />
          <h2 className="spending-add-title">Hạn mức chi tiêu</h2>
        </Container>
      </div>
      <div className="spending-search">
        <input className="spending-search-bar" placeholder="Tìm kiếm" />
        <Link to="/spendings-limit-add">
          <AddIcon className="spending-limit-add_icon" />
        </Link>
      </div>
    </Container>
  );
}

export default SpendingLimit;
