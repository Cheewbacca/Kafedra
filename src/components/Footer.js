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
          Non augue volutpat arcu netus elementum at lorem sed et. Tempor et
          felis tincidunt in. Tempus amet consectetur morbi ornare cum. Viverra
          dolor cursus nunc tristique amet mauris quam. Aliquam convallis
          habitasse congue massa consectetur bibendum. Duis scelerisque
          ullamcorper maecenas amet sapien nec. Lectus nunc et nullam proin
          cras.
        </Typography>
      </Box>
    </Box>
  </Box>
);

export default Footer;
