import { Container, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function CategoriesAdd() {
  const navigate = useNavigate();
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
            <h2 className="spending-add-title">Thêm danh mục mới</h2>
          </Container>
        </div>
        <div className="category-add-name">
          Tên
          <input className="category-add-input" placeholder="" />
        </div>
        <div className="category-list">
          <div className="category-icon-label">Icon</div>
          <Grid container rowSpacing={3}>
            <Grid value={2} item xs={3}>
              <img src="/icons/money.svg" alt="" />
            </Grid>
            <Grid value={2} item xs={3}>
              <img src="/icons/2.png" alt="" />
            </Grid>
            <Grid item xs={3}>
              <img src="/icons/3.png" alt="" />
            </Grid>
            <Grid item xs={3}>
              <img src="/icons/4.png" alt="" />
            </Grid>
            <Grid item xs={3}>
              <img src="/icons/1.png" alt="" />
            </Grid>
            <Grid item xs={3}>
              <img src="/icons/2.png" alt="" />
            </Grid>
            <Grid item xs={3}>
              <img src="/icons/3.png" alt="" />
            </Grid>
            <Grid item xs={3}>
              <img src="/icons/4.png" alt="" />
            </Grid>
            <Grid item xs={3}>
              <img src="/icons/1.png" alt="" />
            </Grid>
            <Grid item xs={3}>
              <img src="/icons/2.png" alt="" />
            </Grid>
            <Grid item xs={3}>
              <img src="/icons/3.png" alt="" />
            </Grid>
            <Grid item xs={3}>
              <img src="/icons/4.png" alt="" />
            </Grid>
            <Grid item xs={3}>
              <img src="/icons/1.png" alt="" />
            </Grid>
            <Grid item xs={3}>
              <img src="/icons/2.png" alt="" />
            </Grid>
            <Grid item xs={3}>
              <img src="/icons/3.png" alt="" />
            </Grid>
            <Grid item xs={3}>
              <img src="/icons/4.png" alt="" />
            </Grid>
            <Grid item xs={3}>
              <img src="/icons/1.png" alt="" />
            </Grid>
            <Grid item xs={3}>
              <img src="/icons/2.png" alt="" />
            </Grid>
            <Grid item xs={3}>
              <img src="/icons/3.png" alt="" />
            </Grid>
            <Grid item xs={3}>
              <img src="/icons/4.png" alt="" />
            </Grid>
          </Grid>
          <div className="category-add-btn">Thêm danh mục</div>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default CategoriesAdd;
