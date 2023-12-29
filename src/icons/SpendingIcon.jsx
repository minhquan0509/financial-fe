function SpendingIcon({ color }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.1301 17.9303V18.9303C20.1301 19.5869 20.0007 20.2371 19.7495 20.8438C19.4982 21.4504 19.1299 22.0016 18.6656 22.4659C18.2013 22.9302 17.6501 23.2985 17.0435 23.5497C16.4369 23.801 15.7867 23.9303 15.1301 23.9303H11.8701C11.8546 24.4772 11.69 25.0095 11.3939 25.4695C11.0977 25.9295 10.6815 26.2998 10.1901 26.5403C9.78024 26.7451 9.32822 26.8513 8.87007 26.8503C8.19234 26.8544 7.53322 26.6288 7.00007 26.2103L3.29007 23.3003C2.92874 23.0199 2.63631 22.6606 2.43514 22.2498C2.23398 21.839 2.12939 21.3877 2.12939 20.9303C2.12939 20.473 2.23398 20.0216 2.43514 19.6109C2.63631 19.2001 2.92874 18.8408 3.29007 18.5603L7.00007 15.6503C7.44707 15.2936 7.98673 15.072 8.55545 15.0118C9.12417 14.9516 9.69826 15.0551 10.2101 15.3103C10.8916 15.6363 11.4165 16.2187 11.6701 16.9303H19.1001C19.2339 16.9263 19.3672 16.9492 19.492 16.9977C19.6168 17.0461 19.7306 17.1191 19.8267 17.2124C19.9227 17.3057 19.9991 17.4173 20.0512 17.5406C20.1033 17.6639 20.1301 17.7965 20.1301 17.9303Z"
        fill={color}
      />
      <path
        d="M29.8701 11.0704C29.8702 11.5278 29.7657 11.9791 29.5647 12.3898C29.3636 12.8006 29.0713 13.1599 28.7101 13.4404L25.0001 16.3504C24.4595 16.7705 23.7947 16.9991 23.1101 17.0004C22.652 17.0014 22.2 16.8952 21.7901 16.6904C21.1086 16.3645 20.5837 15.7821 20.3301 15.0704H12.8701C12.6049 15.0704 12.3505 14.9651 12.163 14.7775C11.9755 14.59 11.8701 14.3357 11.8701 14.0704V13.0704C11.8701 11.7444 12.3969 10.4726 13.3346 9.53491C14.2723 8.59723 15.544 8.07044 16.8701 8.07044H20.1301C20.1423 7.51139 20.3105 6.96687 20.6157 6.49832C20.9209 6.02978 21.351 5.65586 21.8574 5.41876C22.3638 5.18167 22.9264 5.09083 23.4817 5.15651C24.0371 5.22218 24.563 5.44175 25.0001 5.79044L28.7101 8.70044C29.0713 8.98094 29.3636 9.3403 29.5647 9.75106C29.7657 10.1618 29.8702 10.6131 29.8701 11.0704Z"
        fill={color}
      />
    </svg>
  );
}

export default SpendingIcon;
