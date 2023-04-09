import { createTheme } from "@mui/material";

const blackColor = "#333333";

const theme = createTheme({
  palette: {
    primary: {
      main: "#17ACFF",
    },
    secondary: {
      main: blackColor,
    },
  },
  spacing: 10,
  typography: {
    h1: {
      textTransform: "uppercase",
      fontWeight: 900,
      fontSize: "20px",
      color: blackColor,
    },
    h2: {
      textTransform: "uppercase",
      fontWeight: 900,
      fontSize: "46px",
      lineHeight: "54px",
      color: "white",
    },
    h3: {
      textTransform: "uppercase",
      fontWeight: 900,
      fontSize: "24px",
      lineHeight: "28px",
      color: blackColor,
    },
    h4: {
      fontWeight: 400,
      fontSize: "18px",
      lineHeight: "21px",
      color: "white",
    },
    h5: {
      fontWeight: 700,
      fontSize: "18px",
      lineHeight: "21px",
      color: "white",
    },
    body1: {
      fontWeight: 400,
      fontSize: "18px",
      lineHeight: "21px",
    },
    button: {
      textTransform: "none",
      fontWeight: 700,
      fontSize: "16px",
      lineHeight: "19px",
    },
  },
});

export default theme;
