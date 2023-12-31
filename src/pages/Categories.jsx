import AddIcon from "@mui/icons-material/Add";
import { Container } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import SubScreenHeader from "../components/SubScreenHeader";

function Categories() {
  // const [startDate, setStartDate] = useState();
  // const [endDate, setEndDate] = useState();
  // const today = new Date();

  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT_PRODUCT}/categories`)
      .then((res) => {
        setData(res.data.data.categories);
      });
    setShow(true);
  }, []);
  return (
    <Container
      className="spending transition-all"
      style={{
        opacity: show ? 1 : 0,
      }}
    >
      <SubScreenHeader title="Danh mục của tôi" />
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
          <div
            key={spending.id}
            className="spending-detail-list"
          >
            <div className="spending-category gap-2">
              <div className="spending-icon">
                <img
                  src={
                    `${process.env.REACT_APP_API_ENDPOINT_PRODUCT}/icons/` +
                    spending.Icon.content
                  }
                  alt="icon"
                />
              </div>
              <span className="flex-1 w-[240px] font-semibold text-lg truncate">
                {spending.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Categories;
