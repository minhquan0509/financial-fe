import { Container } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SubScreenHeader from "../components/SubScreenHeader";
import LoadingIcon from "../icons/LoadingIcon";

function CategoriesAdd() {
  const navigate = useNavigate();
  const [icons, setIcons] = useState([]);
  const [cat_icon, setCatIcon] = useState("");
  const [cat_name, setCatName] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSubmit = () => {
    if (cat_name.trim() === "") {
      setCatName("");
      return toast.error("Tên danh mục không được để trống", {
        autoClose: 1000,
      });
    }
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT_PRODUCT}/categories`, {
        iconName: cat_icon,
        categoryName: cat_name,
      })
      .then((res) => {
        setLoading(false);
        navigate("/categories");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        navigate("/category-add");
      });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT_PRODUCT}/icons`)
      .then((res) => {
        setIcons(res.data.data.icons);
        setLoading(false);
      });
  }, []);

  return (
    <Container className="spending">
      <SubScreenHeader title="Thêm danh mục mới" />
      <label className="flex items-center justify-between mt-7 gap-3">
        <span className="category-icon-label">Tên</span>
        <input
          value={cat_name}
          onChange={(event) => setCatName(event.target.value)}
          className="w-8 flex-1 font-medium text-xl border-[1px] border-[#FD3C81] border-solid rounded-2xl py-3 px-3"
          placeholder="Tên danh mục"
        />
      </label>
      <div className="mt-7">
        <span className="category-icon-label">Icon</span>
        {loading ? (
          <div className="h-72 grid place-items-center">
            <LoadingIcon size={100} />
          </div>
        ) : (
          <div className="grid grid-cols-4 my-3 mx-[-12px]">
            {icons.map((icon) => {
              return (
                <div
                  key={icon.id}
                  className="grid place-items-center p-3 rounded-lg"
                >
                  <img
                    src={`${process.env.REACT_APP_API_ENDPOINT_PRODUCT}/icons/${icon.content}`}
                    alt={icon.name}
                    onClick={() => setCatIcon(icon.name)}
                    className="w-16 h-16 transition-all duration-300 border-solid border-[1.5px] rounded-[20px] active:border-[0] box-border"
                    style={{
                      filter:
                        icon.name === cat_icon
                          ? "drop-shadow(0 0 2px #FD3C81)"
                          : null,
                      borderColor:
                        icon.name === cat_icon ? "#FD3C81" : "transparent",
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}
        <div
          className="category-add-btn"
          onClick={handleSubmit}
        >
          Thêm danh mục
        </div>
      </div>
    </Container>
  );
}

export default CategoriesAdd;
