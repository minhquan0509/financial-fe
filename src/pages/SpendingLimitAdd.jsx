/** @format */

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
	Button,
	Container,
	FormControl,
	MenuItem,
	Select,
  InputLabel,
  OutlinedInput
} from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-mobile-datepicker";
// import dateCon from "../config/dateConfig";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dateConfigNoDay } from "../config/dateConfig";
import SubScreenHeader from "../components/SubScreenHeader";
import { toast } from "react-toastify";

function SpendingLimitAdd() {
	const navigate = useNavigate();
	const [category, setCategory] = useState("");
	const [categories, setCategories] = useState("");
	const [money, setMoney] = useState("");
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [error, setError] = useState({ money: "", category: "" });

	const [dateData, setDateData] = useState({
		time: new Date(),
		isOpen: false,
	});
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };



	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_ENDPOINT_PRODUCT}/categories`)
			.then((res) => {
				setCategories(res.data.data.categories);
			});
	}, []);

	const handleToggle = (e) => {
		e.preventDefault(); // Prevent the default form submission behavior
		setShowDatePicker(!showDatePicker);
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

  const handleChangeCost = (event) => {
    let value = event.target.value || "";
    value = value.split("").filter(v=>v !== "," && v!=='.').join("");
    value = Number(value);
    setMoney(v=> {
      if(value < 0 || isNaN(value)) return v;
      if(value === 0) return "";
      return value.toLocaleString();
    });
  }

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!category) {
			toast.error("Bạn chưa chọn danh mục");
			return;
		}
		if (money <= 0) {
			toast.error("Số tiền phải lớn hơn 0");
			return;
		}
		await axios
			.post(`${process.env.REACT_APP_API_ENDPOINT_PRODUCT}/limits`, {
				limitMoney: money,
				date: `${dateData.time.getFullYear()}-${
					dateData.time.getMonth() + 1
				}-01`,
				categoryId: category,
			})
			.then(() => navigate("/spendings-limit"))
			.catch(() => toast.error("Bạn đã thêm hạn mức cho tháng này rồi"));
	};
	return (
		<div className="home container">
			<SubScreenHeader
				type="pink"
				title="Thêm hạn mức chi tiêu"
			/>
			<Container className="spending-add-body">
				<form>
					<div className="spending-add-money-input">
						<input
							className="spending-add-money"
							name=""
							id=""
							placeholder="000.000"
							onChange={(event) => handleChangeCost(event)}
              value={money}
              style={{color: "white", width: money.length * 15 + 50}}
						/>{" "}
						đ
					</div>
					<div className="spending-add-form_wrapper">
						{/* <label className="spending-add-form_label">Chọn danh mục</label> */}
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">
								Danh mục
							</InputLabel>
							<Select
								value={category}
								onChange={handleChangeCategory}
								displayEmpty
								placeholder={"Category"}
                input={<OutlinedInput label="Danh mục" />}
								inputProps={{ "aria-label": "Without label" }}
								label="Danh mục"
                MenuProps={MenuProps}
							>
								{categories.length
									? categories.map((item) => (
											<MenuItem value={item.id}>
												{item.name}
											</MenuItem>
									  ))
									: null}
							</Select>
							<div className="error-message">
								{error.category}
							</div>
						</FormControl>
						<button
							className="spending-add-form_date"
							onClick={handleToggle}
						>
							{(dateData.time.getMonth() + 1)
								.toString()
								.padStart(2, "0")}
							/{dateData.time.getFullYear()}
							<KeyboardArrowDownIcon />
						</button>
						{showDatePicker && (
							<DatePicker
								showCaption={false}
								showHeader={false}
								value={dateData.time}
								isOpen={true}
								isPopup={false}
								onChange={handleSelect}
								onSelect={handleSelect}
								onCancel={handleCancel}
								theme={"ios"}
								dateFormat={["MM", "YYYY"]}
								confirmText=""
								cancelText=""
								dateConfig={dateConfigNoDay}
							/>
						)}
						<Button
							onClick={handleSubmit}
							className="spending-add-form_button"
						>
							Thêm Hạn Mức
						</Button>
					</div>
				</form>
			</Container>
		</div>
	);
}

export default SpendingLimitAdd;
