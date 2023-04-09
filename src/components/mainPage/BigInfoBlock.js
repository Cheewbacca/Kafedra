import { Box, Typography } from "@mui/material";

const styles = {
  bigInfo: {
    margin: "0 auto",
    maxWidth: "770px",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    "& span": {
      backgroundColor: "primary.main",
      color: "white",
      borderRadius: "10px",
      p: "2px",
    },
  },
};

const BigInfoBlock = () => (
  <Box sx={styles.bigInfo}>
    <Typography variant="h2" color="secondary" gutterBottom>
      Sed neque egestas enim faucibus interdum a ultricies consequat risus.
      <span>In et tellus. </span>
    </Typography>
  </Box>
);

export default BigInfoBlock;
