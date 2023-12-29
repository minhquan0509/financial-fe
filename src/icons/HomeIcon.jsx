function HomeIcon({ color }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
          >
      <path
        d="M27.67 13.5596L25.67 11.7396L18 4.77956C17.45 4.2876 16.738 4.01562 16 4.01562C15.2621 4.01562 14.55 4.2876 14 4.77956L6.35002 11.7796L4.35002 13.5996C4.21534 13.7362 4.12282 13.9087 4.08349 14.0965C4.04416 14.2843 4.05968 14.4794 4.1282 14.6586C4.19673 14.8378 4.31535 14.9936 4.46994 15.1072C4.62452 15.2208 4.80853 15.2876 5.00002 15.2996C5.25331 15.2881 5.49279 15.1809 5.67002 14.9996L6.00002 14.6996V24.9996C6.00002 25.7952 6.31609 26.5583 6.8787 27.1209C7.44131 27.6835 8.20437 27.9996 9.00002 27.9996H23C23.7957 27.9996 24.5587 27.6835 25.1213 27.1209C25.6839 26.5583 26 25.7952 26 24.9996V14.7396L26.33 15.0396C26.5134 15.2063 26.7522 15.2989 27 15.2996C27.2016 15.299 27.3984 15.2376 27.5645 15.1232C27.7305 15.0089 27.8582 14.8471 27.9306 14.6589C28.0031 14.4707 28.017 14.2651 27.9704 14.0689C27.9239 13.8727 27.8192 13.6952 27.67 13.5596Z"
        fill={color}
      />
    </svg>
  );
}

export default HomeIcon;
