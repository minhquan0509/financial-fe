import React from "react";
import clsx from "clsx";

const styles = {
  root: {
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
    height: "100%",
    display: "flex",
    justifyContent: "center",
  },
  bar: {
    borderRadius: 50,
    height: "100%",
  },
  low: {
    backgroundColor: "#f44336",
  },
  medium: {
    backgroundColor: "#efbb5aa3",
  },
  high: {
    backgroundColor: "#088208a3",
  },
};

const getColor = (value) => {
  if (value <= 30) return "#63d597";
  if (value > 30 && value <= 70) return "#f2d758";
  if (value > 70 && value <= 100) return "#eb5757";
  if (value > 100) return "#a30000";
};

function PercentageBar({ value }) {
  const valueInPercent = value * 100;

  return (
    <div style={styles.root}>
      <div
        style={{
          ...styles.value,
          width: `${valueInPercent > 100 ? 100 : valueInPercent}%`,
          backgroundColor: getColor(valueInPercent),
          borderRadius: "30px",
        }}
      >{`${valueInPercent.toLocaleString()} %`}</div>
      <div
        className={clsx(styles.bar, {
          [styles.low]: valueInPercent < 30,
          [styles.medium]: valueInPercent >= 30 && valueInPercent <= 70,
          [styles.high]: valueInPercent > 70,
        })}
        style={{ maxWidth: `${valueInPercent}%` }}
      />
    </div>
  );
}

export default PercentageBar;
