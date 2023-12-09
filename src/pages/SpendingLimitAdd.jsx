import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DatePicker from "react-mobile-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import dateCon from "../config/dateConfig";
import { useState } from "react";
import { dateConfigNoDay } from "../config/dateConfig";

function SpendingLimitAdd() {
  const [category, setCategory] = useState("");

  const [dateData, setDateData] = useState({
    time: new Date(),
    isOpen: false,
  });

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
  return (
    <div className="home container">
      <Container className="spending-add-header">
        <ArrowBackIcon />
        <h2 className="spending-add-title">Thêm hạn mức chi tiêu</h2>
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
            {/* <label className="spending-add-form_label">Chọn danh mục</label> */}
            <FormControl fullWidth>
              <Select
                value={category}
                onChange={handleChangeCategory}
                displayEmpty
                placeholder={"Category"}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={"eat"}>Ăn uống</MenuItem>
                <MenuItem value={"shopping"}>Mua sắm</MenuItem>
                <MenuItem value={"study"}>Học tập</MenuItem>
              </Select>
            </FormControl>
            {/* <TextField
              className="spending-add-form_text"
              style={{ borderRadius: "20px !important" }}
              placeholder="Mua áo"
            /> */}
            <DatePicker
              showCaption={false}
              showHeader={false}
              value={dateData.time}
              isOpen={true}
              isPopup={false}
              onChange={handleSelect}
              onSelect={handleSelect}
              onCancel={handleCancel}
              dateFormat={["MM", "YYYY"]}
              confirmText=""
              cancelText=""
              dateConfig={dateConfigNoDay}
            />
            <Button className="spending-add-form_button">Thêm Hạn Mức</Button>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default SpendingLimitAdd;
