const NextIcon = ({ size, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={size || 32}
    height={size || 32}
    x="0"
    y="0"
    viewBox="0 0 55.752 55.752"
    xmlSpace="preserve"
  >
    <g>
      <path
        d="M43.006 23.916a5.36 5.36 0 0 0-.912-.727L20.485 1.581a5.4 5.4 0 0 0-7.637 7.638l18.611 18.609-18.705 18.707a5.398 5.398 0 1 0 7.634 7.635l21.706-21.703a5.35 5.35 0 0 0 .912-.727 5.373 5.373 0 0 0 1.574-3.912 5.363 5.363 0 0 0-1.574-3.912z"
        fill={color || "#000000"}
        opacity="1"
        dataOriginal={color || "#000000"}
      ></path>
    </g>
  </svg>
);
export default NextIcon;
