/** @format */
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button, Container, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-mobile-datepicker";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { dateConfig } from "../config/dateConfig";
import SubScreenHeader from "../components/SubScreenHeader";
function SpendingAdd() {
	const navigate = useNavigate();
	const [categories, setCategories] = useState("");
	const [category, setCategory] = useState("");
	const [money, setMoney] = useState("");
	const [note, setNote] = useState("");
	const [showDatePicker, setShowDatePicker] = useState(false);

	const [dateData, setDateData] = useState({
		time: new Date(),
		isOpen: false,
	});

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_ENDPOINT_PRODUCT}/categories`)
			.then((res) => {
				setCategories(res.data.data.categories);
			});
	}, []);

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

	const handleToggle = (e) => {
		e.preventDefault(); // 
		setShowDatePicker(!showDatePicker);
	};

	const handleCancel = () => {
		setDateData({ isOpen: false });
	};

	const handleSelect = (time) => {
		setDateData({ time, isOpen: false });
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

	const handleChange = (event) => {
		setCategory(event.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault(); // Prevent the default form submission behavior
		let value = money.split("").filter(v=>v !== "," && v!=='.').join("");
    value = Number(value);

		if (!category) {
			toast.error("Bạn phải chọn danh mục chi tiêu !");
			return;
		}
		if (value <= 0) {
			toast.error("Số tiền phải lớn hơn 0!");
			return;
		}
		if (category && value > 0) {
			axios
				.post(
					`${process.env.REACT_APP_API_ENDPOINT_PRODUCT}/spendings`,
					{
						money: value,
						note,
						date: `${dateData.time.getFullYear()}/${
							dateData.time.getMonth() + 1
						}/${dateData.time.getDate()}`,
						categoryId: category,
					}
				)
				.then((res) => {
					if (res.data.data.warning.length)
						toast.warning(res.data.data.warning, {
							autoClose: false,
						});
					navigate("/spendings");
				})
				.catch((error) => {
					toast.error(error.response.data.message);
					navigate("/spendings-limit-add");
				});
		}
	};

	return (
		<div className="home container">
			<div className="px-2"><SubScreenHeader type="pink" title="Thêm khoản chi tiêu"/></div>
			<Container className="spending-add-body">
				<form>
					<div className="spending-add-money-input">
						<input
							className="spending-add-money"
							name=""
							id=""
							min={0}
              value={money}
							onChange={(event) => handleChangeCost(event)}
							placeholder="000.000"
              style={{color: "white", width: money.length * 17 + 40}}
						/>{" "}
						đ
					</div>
					<div className="spending-add-form_wrapper flex flex-col gap-2 items-stretch">
						<FormControl sx={{ minWidth: 350 }}>
							<InputLabel id="demo-simple-select-label">
								Danh mục
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={category}
                input={<OutlinedInput label="Danh mục" />}
								onChange={handleChange}
                label="Danh mục"
                MenuProps={MenuProps}
							>
								{categories.length
									? categories.map((item) => (
											<MenuItem
												key={item.id}
												value={item.id}
											>
												{item.name}
											</MenuItem>
									))
									: null}
							</Select>
						</FormControl>
						<TextField
							className="spending-add-form_text"
							style={{
								borderRadius: "20px !important",
								marginTop: "10px",
							}}
							placeholder="Thông tin giao dịch"
							required
							onChange={(event) => setNote(event.target.value)}
						/>
						<button
							className="spending-add-form_date"
							onClick={handleToggle}
						>
							{dateData.time.getDate().toString().padStart(2, "0")}/
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
								theme={"ios"}
								onChange={handleSelect}
								onSelect={handleSelect}
								onCancel={handleCancel}
								dateFormat={["DD", "MM", "YYYY"]}
								confirmText=""
								cancelText=""
								dateConfig={dateConfig}
							/>
						)}
						<Button
							onClick={handleSubmit}
							className="spending-add-form_button"
						>
							Thêm giao dịch
						</Button>
					</div>
				</form>
			</Container>
		</div>
	);
}

export default SpendingAdd;
