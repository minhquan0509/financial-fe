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
function SpendingAdd() {
  const [category, setCategory] = useState("");
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div className="home container">
      <Container className="spending-add-header">
        <ArrowBackIcon />
        <h2 className="spending-add-title">Thêm khoản chi tiêu</h2>
      </Container>
      <Container className="spending-add-body">
        <form>
          <input
            className="spending-add-money"
            type="number"
            name=""
            id=""
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
              <FormControlLabel
                value="eat"
                control={<Radio />}
                label="Ăn uống"
              />
              <FormControlLabel
                value="transport"
                control={<Radio />}
                label="Đi lại"
              />
              <FormControlLabel
                value="learn"
                control={<Radio />}
                label="Học tập"
              />
            </RadioGroup>
            <TextField
              className="spending-add-form_text"
              style={{ borderRadius: "20px !important" }}
              placeholder="Mua áo"
            />
            <Button className="spending-add-form_button">Thêm giao dịch</Button>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default SpendingAdd;
