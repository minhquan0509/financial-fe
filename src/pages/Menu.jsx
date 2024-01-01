import { Divider, MenuList } from "@mui/material";
import Footer from "../components/Footer";
import MenuItem from "../components/MenuItem";
import SpendingMenuIcon from "../icons/SpendingMenuIcon";
import ExitIcon from "../icons/ExitIcon";
import ScreenHeader from "../components/ScreenHeader";

const Menu = () => {
  return (
    <div className="menu-container">
      <ScreenHeader title="Menu" />
      <Divider />
      <MenuList>
        <MenuItem
          name="Quản lý danh mục chi tiêu"
          url="/categories"
        />
        <MenuItem
          icon={<SpendingMenuIcon size={30} />}
          name="Quản lý hạn mức chi tiêu"
          url="/spendings-limit"
        />
        <div className="grid place-items-center my-3">
          <Divider className="w-[90%]" />
        </div>
        <MenuItem
          icon={<ExitIcon size={26} />}
          name="Thoát"
          onClick={() => {
            window.open(window.location, "_self").close();
          }}
        />
      </MenuList>
      <Footer />
    </div>
  );
};
export default Menu;
