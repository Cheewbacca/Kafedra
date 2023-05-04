import { Box, Typography } from "@mui/material";
import Logo from "../icons/Logo";

const styles = {
  wrapper: {
    backgroundColor: "secondary.main",
    py: "80px",
  },
  content: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    color: "white",
    textAlign: "center",
  },
  logoBox: {
    display: "flex",
    alignItems: "center",
    "& svg": {
      mr: "24px",
    },
  },
};

const Footer = () => (
  <Box component="footer" sx={styles.wrapper}>
    <Box className="container" sx={styles.content}>
      <Box sx={styles.logoBox}>
        <Logo fill="white" />
        <Typography color="white" variant="h1" children="Study with KPI" />
      </Box>
      <Box mt={3}>
        <Typography>
          Даний прототип виконав Стурчак Максим для магістерської дисертації.
        </Typography>
      </Box>
    </Box>
  </Box>
);

export default Footer;
