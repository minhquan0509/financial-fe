import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Container, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";

function CategoriesAdd() {
  const navigate = useNavigate();
  const [icons, setIcons] = useState([]);
  const [cat_icon, setCatIcon] = useState("");
  const [cat_name, setCatName] = useState("");

  const handleSubmit = () => {
    axios.post(`${process.env.REACT_APP_API_ENDPOINT_PRODUCT}/categories`, {
      iconName: cat_icon,
      categoryName: cat_name
    })
    .then((res) => navigate("/categories"))
        .catch((error) => {
          toast.error(error.response.data.message);
          navigate("/category-add");
        });
  }


  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT_PRODUCT}/icons`)
      .then((res) => {
        setIcons(res.data.data.icons)
      })
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
          <input value={cat_name} onChange={(event) => setCatName(event.target.value)} className="category-add-input" placeholder="" />
        </div>
        <div className="category-list">
          <div className="category-icon-label">Icon</div>
          <Grid container rowSpacing={3}>
            {icons.map((icon) => (
              <Grid value={icon.name} item xs={3} className={icon.name === cat_icon ? "category-icon-selected" : "category-icon"}>
                <img src={`${process.env.REACT_APP_API_ENDPOINT_PRODUCT}/icons/${icon.content}`} alt={icon.name} 
                onClick={() => setCatIcon(icon.name)}/>
              </Grid>
            ))}
          </Grid>
          <div className="category-add-btn" onClick={handleSubmit}>Thêm danh mục</div>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default CategoriesAdd;
