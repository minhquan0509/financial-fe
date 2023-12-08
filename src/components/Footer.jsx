import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Home from "@mui/icons-material/Home";
import SyncAlt from "@mui/icons-material/SyncAlt";
import Add from "@mui/icons-material/Add";
import DataUsage from "@mui/icons-material/DataUsage";
import MenuIcon from "@mui/icons-material/Menu";

export default function Footer() {
  const [value, setValue] = React.useState("home");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
      <BottomNavigationAction value="home" icon={<Home />} />
      <BottomNavigationAction value="favorites" icon={<SyncAlt />} />
      <BottomNavigationAction
        className="nav-add"
        value="add"
        icon={<Add className="nav-add-icon" />}
      />
      <BottomNavigationAction value="useage" icon={<DataUsage />} />
      <BottomNavigationAction value="menu" icon={<MenuIcon />} />
    </BottomNavigation>
  );
}
