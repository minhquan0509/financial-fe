import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Add from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import HomeIcon from "../icons/HomeIcon";
import SpendingIcon from "../icons/SpendingIcon";
import LimitIcon from "../icons/Limit";
import MenuIcon from "../icons/MenuIcon";
import Home from "@mui/icons-material/Home";

export default function Footer() {
  const [value, setValue] = React.useState("home");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
      <Link className="footer-nav" to="/">
        <BottomNavigationAction value="home" icon={<HomeIcon />} />
        {/* <BottomNavigationAction value="home" icon={<Icon><img src="./Home.svg"/></Icon>} /> */}
      </Link>
      <Link className="footer-nav" to="/spendings">
        <BottomNavigationAction value="favorites" icon={<SpendingIcon />} />
      </Link>
      <Link className="footer-nav" to="/spendings-add">
        <BottomNavigationAction
          className="nav-add"
          value="add"
          icon={<Add className="nav-add-icon" />}
        />
      </Link>
      <Link className="footer-nav" to="/statistics">
        <BottomNavigationAction value="useage" icon={<LimitIcon />} />
      </Link>
      <Link className="footer-nav" to="/">
        <BottomNavigationAction value="menu" icon={<MenuIcon />} />
      </Link>
    </BottomNavigation>
  );
}
