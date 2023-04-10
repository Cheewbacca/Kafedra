import { Box, Paper, Typography } from "@mui/material";
import StyledButton from "../UI/StyledButton";
import Login from "../../icons/Login";
import { useModalState } from "../modalWindow/ModalContext";

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

  return (
    <Paper sx={styles.banner} elevation={0}>
      <Box sx={styles.bannerInner}>
        <Typography
          variant="h2"
          children="Раді вітати вас у КПІ ім. Ігоря СІкорського!"
          gutterBottom
        />
        <Typography
          variant="h4"
          children="Тут ви зможете знайти інформацію про поточний контроль, дізнатись розклад та подивитись нормативні документи."
          gutterBottom
        />
        <Typography
          variant="h5"
          children="Сайт від учнів для учнів та вчителів."
        />
      </Box>
      <StyledButton
        sx={styles.mt50}
        startIcon={<Login />}
        variant="contained"
        text="Увійти"
        colorVariant="white"
        onClick={toggleModal}
      />
    </Paper>
  );
};

export default Banner;
