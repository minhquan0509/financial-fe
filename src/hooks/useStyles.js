import { useTheme } from "@emotion/react";
import { css } from "@emotion/react";
import { createTheme } from "@mui/material";

// Sử dụng hook useTheme để truy cập theme
const defaultTheme = createTheme();
const useStyles = () => {
  const theme = useTheme();

  // Sử dụng hàm css để định nghĩa các styles
  const styles = {
    root: css({
      position: "relative",
      overflow: "hidden",
      width: "100%",
      height: 26,
      borderRadius: 50,
      backgroundColor: "#ccc",
    }),
    value: css({
      color: "#fff",
      fontWeight: 500,
      position: "absolute",
      lineHeight: "24px",
      width: "100%",
      display: "flex",
      justifyContent: "center",
    }),
    bar: css({
      borderRadius: 50,
      height: "100%",
      "&.low": {
        backgroundColor: "#f44336",
      },
      "&.medium": {
        backgroundColor: "#efbb5aa3",
      },
      "&.high": {
        backgroundColor: "#088208a3",
      },
    }),
  };

  return styles;
};

export default useStyles;
