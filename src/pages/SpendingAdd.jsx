import {
  Button,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import DatePicker from "react-mobile-datepicker";
import { useEffect } from "react";
import { dateConfig } from "../config/dateConfig";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SpendingAdd() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState("");
  const [category, setCategory] = useState(1);
  const [money, setMoney] = useState(100000);
  const [note, setNote] = useState("");

  const [dateData, setDateData] = useState({
    time: new Date(),
    isOpen: false,
  });

  useEffect(() => {
    axios.get("http://localhost:3001/categories").then((res) => {
      setCategories(res.data.data.categories);
    });
  }, []);

  const handleClick = () => {
    setDateData({ isOpen: true });
  };

  const handleCancel = () => {
    setDateData({ isOpen: false });
  };

  const handleSelect = (time) => {
    setDateData({ time, isOpen: false });
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:3001/spendings", {
        money,
        note,
        date: `${dateData.time.getFullYear()}/${dateData.time.getMonth()}/${dateData.time.getDate()}`,
        categoryId: category,
      })
      .then(navigate("/spendings"));
  };

  return (
    <div className="home container">
      <Container className="spending-add-header">
        <ArrowBackIcon onClick={() => navigate(-1)} />
        <h2 className="spending-add-title">Thêm khoản chi tiêu</h2>
      </Container>
      <Container className="spending-add-body">
        <form>
          <input
            className="spending-add-money"
            type="number"
            name=""
            id=""
            onChange={(event) => setMoney(event.target.value)}
            placeholder="100.000 đ"
          />
          <div className="spending-add-form_wrapper">
            <label className="spending-add-form_label">Chọn danh mục</label>
            <RadioGroup
              className="spending-add-form_radio-group"
              name="controlled-radio-buttons-group"
              value={category}
              onChange={handleChangeCategory}
            >
              {categories.length
                ? categories.map((item) => (
                    <FormControlLabel
                      value={item.id}
                      control={<Radio />}
                      label={item.name}
                    />
                  ))
                : null}
            </RadioGroup>
            <TextField
              className="spending-add-form_text"
              style={{ borderRadius: "20px !important" }}
              placeholder="Mua áo"
              onChange={(event) => setNote(event.target.value)}
            />
            <DatePicker
              showCaption={false}
              showHeader={false}
              value={dateData.time}
              isOpen={true}
              isPopup={false}
              theme={"ios"}
              onChange={handleSelect}
              onSelect={handleSelect}
              onCancel={handleCancel}
              dateFormat={["DD", "MM", "YYYY"]}
              confirmText=""
              cancelText=""
              dateConfig={dateConfig}
            />
            <Button onClick={handleSubmit} className="spending-add-form_button">
              Thêm giao dịch
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default SpendingAdd;
