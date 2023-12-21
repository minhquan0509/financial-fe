import { createStyles, createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        // border: `1px solid ${theme.palette.divider}`,
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: 26,
        borderRadius: 50,
        backgroundColor: "#ccc",
      },
      value: {
        color: "#fff",
        fontWeight: 500,
        position: "absolute",
        lineHeight: "24px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      },
      bar: {
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
      },
    }),
  { defaultTheme }
);

function PercentageBar({ value }) {
  const valueInPercent = value * 100;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div
        className={classes.value}
      >{`${valueInPercent.toLocaleString()} %`}</div>
      <div
        className={clsx(classes.bar, {
          low: valueInPercent < 30,
          medium: valueInPercent >= 30 && valueInPercent <= 70,
          high: valueInPercent > 70,
        })}
        style={{ maxWidth: `${valueInPercent}%` }}
      />
    </div>
  );
}

export default PercentageBar;
