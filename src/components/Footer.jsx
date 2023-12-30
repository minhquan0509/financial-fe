import Add from "@mui/icons-material/Add";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "../icons/HomeIcon";
import LimitIcon from "../icons/Limit";
import MenuIcon from "../icons/MenuIcon";
import SpendingIcon from "../icons/SpendingIcon";

export default function Footer() {
  const [value, setValue] = React.useState("home");
  const location = useLocation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{ width: 500 }}
      value={value}
      onChange={handleChange}
    >
      <Link
        className="footer-nav"
        to="/"
      >
        <BottomNavigationAction
          value="home"
          icon={
            <HomeIcon
              color={location.pathname === "/" ? "#fd3c81e5" : "#C6C6C6"}
            />
          }
        />
      </Link>
      <Link
        className="footer-nav"
        to="/spendings"
      >
        <BottomNavigationAction
          value="favorites"
          icon={
            <SpendingIcon
              color={
                location.pathname === "/spendings" ? "#fd3c81e5" : "#C6C6C6"
              }
            />
          }
        />
      </Link>
      <Link
        className="footer-nav"
        to="/spendings-add"
      >
        <BottomNavigationAction
          className="nav-add"
          value="add"
          icon={<Add className="nav-add-icon" />}
        />
      </Link>
      <Link
        className="footer-nav"
        to="/statistics"
      >
        <BottomNavigationAction
          value="useage"
          icon={
            <LimitIcon
              color={
                location.pathname === "/statistics" ? "#fd3c81e5" : "#C6C6C6"
              }
            />
          }
        />
      </Link>
      <Link
        className="footer-nav"
        to="/menu"
      >
        <BottomNavigationAction
          value="menu"
          icon={
            <MenuIcon
              color={location.pathname === "/menu" ? "#fd3c81e5" : "#C6C6C6"}
            />
          }
        />
      </Link>
    </BottomNavigation>
  );
}
