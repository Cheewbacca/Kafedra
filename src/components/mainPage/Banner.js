import { Box, Paper, Typography } from "@mui/material";
import StyledButton from "../UI/StyledButton";
import Login from "../../icons/Login";
import { useModalState } from "../modalWindow/ModalContext";
import { useAuth } from "../../AuthContext";

const styles = {
  banner: {
    backgroundColor: "#17ACFF",
    borderRadius: "30px",
    minHeight: "550px",
    px: "50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundImage: "url('/banner.svg')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom 26px right 50px",
    backgroundSize: "58%",
  },
  bannerInner: {
    maxWidth: "570px",
  },
  mt50: {
    mt: "50px",
  },
};

const Banner = () => {
  const { toggleModal } = useModalState();
  const { authData } = useAuth();

  return (
    <Paper sx={styles.banner} elevation={0}>
      <Box sx={styles.bannerInner}>
        <Typography variant="h2" children="Щоденник вдячності!" gutterBottom />
        <Typography
          variant="h4"
          children="Ласкаво просимо на наш сайт щоденника вдячності, де можна розпочати свій день з дозою позитиву та поділитися своїми найсвітлішими моментами!"
          gutterBottom
        />
      </Box>
      {!authData.id && (
        <StyledButton
          sx={styles.mt50}
          startIcon={<Login />}
          variant="contained"
          text="Увійти"
          colorVariant="white"
          onClick={toggleModal}
        />
      )}
    </Paper>
  );
};

export default Banner;
