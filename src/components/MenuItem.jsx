import {
  MenuItem as DefaultMenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CategoryIcon from "../icons/CategoryIcon";
import NextIcon from "../icons/NextIcon";
import { useNavigate } from "react-router-dom";

const MenuItem = ({ name, url, icon, onClick }) => {
  const navigate = useNavigate();
  return (
    <DefaultMenuItem
      className="rounded-md gap-2"
      sx={{
        padding: "15px 15px",
      }}
      onClick={
        onClick ??
        (() => {
          setTimeout(() => {
            url && navigate(url);
          }, 500);
        })
      }
    >
      <ListItemIcon className="justify-center items-center">
        {icon || <CategoryIcon size={26} />}
      </ListItemIcon>
      <ListItemText>
        <span className="font-medium text-lg">{name}</span>
      </ListItemText>
      <ListItemIcon className="justify-center items-center">
        <NextIcon
          size={16}
          color="#FD3C81"
        />
      </ListItemIcon>
    </DefaultMenuItem>
  );
};
export default MenuItem;
