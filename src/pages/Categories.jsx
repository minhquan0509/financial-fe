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

function Categories() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const today = new Date();

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT_PRODUCT}/categories`)
      .then((res) => {
        setData(res.data.data.categories);
      });
  }, []);
  return (
    <>
      <Container className="spending">
        <div>
          <Container className="spending-add-header spending-limit-header">
            <ArrowBackIcon onClick={() => navigate(-1)} />
            <h2 className="spending-add-title">Danh mục của tôi</h2>
          </Container>
        </div>
        <div className="spending-search">
          <div className="limit-search">
            <div className="category-label">Danh mục chi tiêu</div>
          </div>
          <Link to="/category-add">
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
                      `${process.env.REACT_APP_API_ENDPOINT_PRODUCT}/icons/` +
                      spending.Icon.content
                    }
                    alt="icon"
                  />
                </div>
                <div className="spending-info">
                  <div className="spending-info-category">{spending.name}</div>
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

export default Categories;
