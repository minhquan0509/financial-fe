import React, { useEffect } from "react";
import clsx from "clsx";

const styles = {
  root: {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    height: 26,
    borderRadius: 999,
    backgroundColor: "#cccccc",
  },
  value: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  if (value > 100) return "#c60000";
};

function PercentageBar({ value }) {
  const valueInPercent = value * 100;
  const [width, setWidth] = React.useState(0);
  useEffect(() => {
    const sto = setTimeout(() => {
      setWidth(valueInPercent);
    }, 350);
    return () => {
      clearTimeout(sto);
    };
  }, [valueInPercent]);

  return (
    <div style={styles.root}>
      <div
        className="transition-all duration-1000 ease-in-out"
        style={{
          ...styles.value,
          width: `${width > 100 ? 100 : width}%`,
          backgroundColor: getColor(valueInPercent),
          borderRadius: "30px",
        }}
      ></div>
      <span
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          color: "#ffffff",
          fontWeight: 600,
          lineHeight: "24px",
          textShadow: "0 1px 1px #000000ff",
        }}
      >{`${valueInPercent.toLocaleString()} %`}</span>
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
