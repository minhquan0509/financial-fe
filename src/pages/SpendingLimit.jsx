import { Container } from "@mui/material";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function SpendingLimit() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const today = new Date();

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/limits").then((res) => {
      setData(res.data.data.limitCategories);
    });
  }, []);
  return (
    <>
      <Container className="spending">
        <div>
          <Container className="spending-add-header spending-limit-header">
            <ArrowBackIcon onClick={() => navigate(-1)} />
            <h2 className="spending-add-title">Hạn mức chi tiêu</h2>
          </Container>
        </div>
        <div className="spending-search">
          <div className="limit-search">
            <input className="spending-search-bar" placeholder="Tìm kiếm" />
            <DatePicker
              dateFormat="MM/yyyy"
              className="limit-date-picker"
              // placeholderText={today}
              selected={today}
              onChange={(date) => setStartDate(date)}
              startDate={startDate}
              maxDate={today}
            />
          </div>
          <Link to="/spendings-limit-add">
            <AddIcon className="spending-limit-add_icon" />
          </Link>
        </div>
        <div className="spending-list">
          {data.map((spending) => (
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
      <Footer />
    </>
  );
}

export default SpendingLimit;
