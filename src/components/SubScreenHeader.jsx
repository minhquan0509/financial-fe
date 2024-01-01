import { useNavigate } from "react-router-dom";
import BackIcon from "../icons/BackIcon";
/**
 * @param {{title: string, type?: "black"|"pink"}}
 */
const SubScreenHeader = ({ title, type = "black" }) => {
  const navigate = useNavigate();
  return (
    <div className="py-6 px-3">
      <div className="relative grid place-items-center">
        <div
          className="text-2xl font-bold"
          style={{
            color: type === "pink" ? "#ffffff" : undefined,
          }}
        >
          {title}
        </div>
        <div className="absolute w-full h-full flex justify-start items-center">
          <BackIcon
            className="active:opacity-50 transition-all"
            color={type === "pink" ? "#ffffff" : undefined}
            size={20}
            onClick={() => navigate(-1)}
          />
        </div>
      </div>
    </div>
  );
};

export default SubScreenHeader;
