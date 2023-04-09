import { Box, Typography } from "@mui/material";
import Logo from "../icons/Logo";
import menuItems from "../mocks/headerMenuItems.json";
import { NavLink } from "react-router-dom";

const styles = {
  wrapper: {
    backgroundColor: "white",
    py: "33px",
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoBox: {
    display: "flex",
    alignItems: "center",
    "& svg": {
      mr: "24px",
    },
  },
  menuItems: {
    display: "flex",
    alignItems: "center",
    "& > p": {
      "&:not(:first-of-type)": {
        ml: "40px",
      },
      "& > a": {
        color: "inherit",
        textDecoration: "none",
        fontSize: "16px",
        fontWeight: 500,
        transition: "color .3s",
        position: "relative",
        "&:hover": {
          color: "primary.main",
          "&::after": {
            backgroundColor: "primary.main",
          },
        },
      },
    },
  },
};

const Header = () => (
  <Box component="header" sx={styles.wrapper}>
    <Box className="container" sx={styles.content}>
      <Box sx={styles.logoBox}>
        <Logo />
        <Typography variant="h1" children="Study with KPI" />
      </Box>
      <Box sx={styles.menuItems}>
        {menuItems.map(({ url, text }) => (
          <Typography key={url} variant="body1">
            <NavLink to={url} children={text} />
          </Typography>
        ))}
      </Box>
    </Box>
  </Box>
);

export default Header;
