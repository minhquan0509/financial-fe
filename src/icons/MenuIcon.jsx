function MenuIcon({ color}) {
  return (
    <svg
      width="24"
      height="19"
      viewBox="0 0 24 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="23.95"
        height="3.44827"
        rx="1.72414"
        transform="matrix(1 0 0 -1 0 3.44824)"
        fill={color}
      />
      <rect
        width="23.95"
        height="3.44827"
        rx="1.72414"
        transform="matrix(1 0 0 -1 0 10.8965)"
        fill={color}
      />
      <rect
        width="23.95"
        height="3.44827"
        rx="1.72414"
        transform="matrix(1 0 0 -1 0 18.3447)"
        fill={color}
      />
    </svg>
  );
}

export default MenuIcon;
