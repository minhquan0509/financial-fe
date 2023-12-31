const LoadingIcon = ({ size = 32 }) => {
  const colors = [
    "#fd3c81e5",
    "#f47e60",
    "#f8b26a",
    "#abbd81",
    "#849b87",
    "#6492ac",
    "#638ca6",
    "#638ca6",
  ].reverse();
  const r = 5;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnXlink="http://www.w3.org/1999/xlink"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <g>
        <circle
          cx="73.801"
          cy="68.263"
          fill={colors[0]}
          r={r}
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            calcMode="spline"
            values="0 50 50;360 50 50"
            times="0;1"
            keySplines="0.5 0 0.5 1"
            repeatCount="indefinite"
            dur="1.4925373134328357s"
            begin="0s"
          ></animateTransform>
        </circle>
        <circle
          cx="68.263"
          cy="73.801"
          fill={colors[1]}
          r={r}
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            calcMode="spline"
            values="0 50 50;360 50 50"
            times="0;1"
            keySplines="0.5 0 0.5 1"
            repeatCount="indefinite"
            dur="1.4925373134328357s"
            begin="-0.062s"
          ></animateTransform>
        </circle>
        <circle
          cx="61.481"
          cy="77.716"
          fill={colors[2]}
          r={r}
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            calcMode="spline"
            values="0 50 50;360 50 50"
            times="0;1"
            keySplines="0.5 0 0.5 1"
            repeatCount="indefinite"
            dur="1.4925373134328357s"
            begin="-0.125s"
          ></animateTransform>
        </circle>
        <circle
          cx="53.916"
          cy="79.743"
          fill={colors[3]}
          r={r}
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            calcMode="spline"
            values="0 50 50;360 50 50"
            times="0;1"
            keySplines="0.5 0 0.5 1"
            repeatCount="indefinite"
            dur="1.4925373134328357s"
            begin="-0.187s"
          ></animateTransform>
        </circle>
        <circle
          cx="46.084"
          cy="79.743"
          fill={colors[4]}
          r={r}
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            calcMode="spline"
            values="0 50 50;360 50 50"
            times="0;1"
            keySplines="0.5 0 0.5 1"
            repeatCount="indefinite"
            dur="1.4925373134328357s"
            begin="-0.25s"
          ></animateTransform>
        </circle>
        <circle
          cx="38.519"
          cy="77.716"
          fill={colors[5]}
          r={r}
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            calcMode="spline"
            values="0 50 50;360 50 50"
            times="0;1"
            keySplines="0.5 0 0.5 1"
            repeatCount="indefinite"
            dur="1.4925373134328357s"
            begin="-0.312s"
          ></animateTransform>
        </circle>
        <circle
          cx="31.737"
          cy="73.801"
          fill={colors[6]}
          r={r}
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            calcMode="spline"
            values="0 50 50;360 50 50"
            times="0;1"
            keySplines="0.5 0 0.5 1"
            repeatCount="indefinite"
            dur="1.4925373134328357s"
            begin="-0.375s"
          ></animateTransform>
        </circle>
        <circle
          cx="26.199"
          cy="68.263"
          fill={colors[7]}
          r={r}
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            calcMode="spline"
            values="0 50 50;360 50 50"
            times="0;1"
            keySplines="0.5 0 0.5 1"
            repeatCount="indefinite"
            dur="1.4925373134328357s"
            begin="-0.437s"
          ></animateTransform>
        </circle>
        <animateTransform
          attributeName="transform"
          type="rotate"
          calcMode="spline"
          values="0 50 50;0 50 50"
          times="0;1"
          keySplines="0.5 0 0.5 1"
          repeatCount="indefinite"
          dur="1.4925373134328357s"
        ></animateTransform>
      </g>
    </svg>
  );
};

export default LoadingIcon;
