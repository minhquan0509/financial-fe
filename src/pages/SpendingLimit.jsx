import AddIcon from "@mui/icons-material/Add";
import { Container } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import SubScreenHeader from "../components/SubScreenHeader";
import NextIcon from "../icons/NextIcon";
import LoadingIcon from "../icons/LoadingIcon";
/**
 * @typedef {{id:number,limit_money:number;category_id:number;Category:{id:number;name:string;icon_id:number;Icon:{id:number;content:string;name:string}}}} Category
 * @typedef {{date: string, categories: Category[]}} SpendingLimt
 */

function SpendingLimit() {
  const [loading, setLoading] = useState(true);
  /**
   * @type {[SpendingLimt[], React.Dispatch<SpendingLimt[]>]}
   */
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT_PRODUCT}/limits`)
      .then((res) => {
        setData(res.data.data.limitCategories);
        setLoading(false);
      });
  }, []);
  return (
    <Container className="spending">
      <SubScreenHeader title="Hạn mức chi tiêu" />
      <div className="spending-search">
        <div className="spending-search-bar py-3 px-5 flex items-center shadow-md flex-1">
          <div className="flex-1 w-10 text-lg">
            <input
              className="w-full placeholder-white font-medium placeholder:font-medium bg-transparent"
              placeholder="Tìm kiếm"
            />
          </div>
          <div className="text-[#91919F] p-2 bg-white rounded-2xl font-medium flex items-center justify-between gap-1">
            <span>12/2023</span>
            <NextIcon
              color="#91919F"
              size={12}
            />
          </div>
        </div>
        <Link
          to="/spendings-limit-add"
          className="grid place-items-center"
        >
          <AddIcon className="spending-limit-add_icon" />
        </Link>
      </div>
      {loading ? (
        <div className="h-96 grid place-items-center">
          <LoadingIcon size={100} />
        </div>
      ) : (
        <div className="spending-list">
          {data.map(({ categories, date }) => {
            const split = date.split("/");
            split.splice(1, 0, "2")
            const nDate = new Date(split.join("/"));
            const fomatedDate = `${(nDate.getMonth() + 1)
              .toString()
              .padStart(2, "0")}/${nDate.getFullYear()}`;
            return (
              <div key={date}>
                <div className="spending-date">{fomatedDate}</div>
                {categories.map((spending) => (
                  <div
                    key={spending.id}
                    className="spending-detail-list"
                  >
                    <div className="spending-category">
                      <div className="spending-icon">
                        <img
                          className="w-14 h-14"
                          src={
                            `${process.env.REACT_APP_API_ENDPOINT_PRODUCT}/icons/` +
                            spending.Category.Icon.content
                          }
                          alt="icon"
                        />
                      </div>
                      <div className="spending-info">
                        <div className="spending-info-category">
                          {spending.Category.name}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-evenly self-stretch">
                      <div className="price">
                        {Number(spending.limit_money).toLocaleString()} đ
                      </div>
                      <div
                        style={{
                          marginTop: "5px",
                          color: "#91919F",
                          fontWeight: "600",
                        }}
                      >
                        {fomatedDate}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </Container>
  );
}

export default SpendingLimit;
