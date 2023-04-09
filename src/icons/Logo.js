import { SvgIcon } from "@mui/material";

const styles = {
  width: "51px",
  height: "35px",
};

const Logo = ({ fill = "#17ACFF" }) => (
  <SvgIcon
    width="52"
    height="36"
    viewBox="0 0 52 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    sx={styles}
  >
    <path
      d="M38.2572 18.9926V27.7933C38.2572 28.3031 38.0733 28.8187 37.7088 29.3261C35.8432 31.9265 30.0002 33.7418 23.4998 33.7418C17.0006 33.7418 11.1576 31.9265 9.29083 29.325C8.92755 28.8187 8.7424 28.3031 8.7424 27.7933V18.9926L23.0967 26.414C23.2233 26.4785 23.3615 26.5113 23.4998 26.5113C23.6381 26.5113 23.7776 26.4785 23.9041 26.414L38.2572 18.9926ZM51.8498 27.8402C51.8498 29.2371 50.917 30.4195 49.642 30.798V34.6207C49.642 35.1058 49.2483 35.4996 48.7631 35.4996C48.2779 35.4996 47.8842 35.1058 47.8842 34.6207V30.798C46.6092 30.4195 45.6776 29.2371 45.6776 27.8402C45.6776 26.4433 46.6092 25.2621 47.8842 24.8824V14.1L48.1572 13.8633C48.5615 13.6219 49.3104 13.1261 49.642 12.5718V24.8824C50.917 25.2621 51.8498 26.4433 51.8498 27.8402ZM50.092 27.8402C50.092 27.1078 49.4955 26.5113 48.7631 26.5113C48.0307 26.5113 47.4354 27.1078 47.4354 27.8402C47.4354 28.5726 48.0307 29.1691 48.7631 29.1691C49.4955 29.1691 50.092 28.5726 50.092 27.8402ZM23.4998 0.500366L0.150208 12.5718L23.4998 24.6433L46.8494 12.5718L23.4998 0.500366Z"
      fill={fill}
    />
  </SvgIcon>
);

export default Logo;
