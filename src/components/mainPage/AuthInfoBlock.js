import { Box, Divider, Paper, Typography } from "@mui/material";
import StyledButton from "../UI/StyledButton";
import Pencil from "../../icons/Pencil";
import { useModalState } from "../modalWindow/ModalContext";

const styles = {
  authorizationBlock: {
    display: "flex",
    borderRadius: "30px",
    backgroundColor: "white",
    py: "12px",
    px: "50px",
    minHeight: "300px",
  },
  authorizationBlockImg: {
    minHeight: "100%",
    flexBasis: "40%",
    backgroundImage: "url('/auth.svg')",
    backgroundRepeat: "no-repeat",
  },
  authorizationBlockInfo: {
    minHeight: "100%",
    flexBasis: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    pl: "65px",
  },
  divider: {
    height: "170px",
    width: "1px",
    ml: "91px",
    backgroundColor: "secondary.main",
    display: "block",
    alignSelf: "center",
  },
};

const AuthInfoBlock = () => {
  const { toggleModal } = useModalState();

  return (
    <Paper sx={styles.authorizationBlock} elevation={0}>
      <Box sx={styles.authorizationBlockImg} />
      <Divider orientation="vertical" sx={styles.divider} />
      <Box sx={styles.authorizationBlockInfo}>
        <Typography
          variant="h3"
          children="Всього крок до користування!"
          gutterBottom
        />
        <Typography
          children="Для повного розкриття можливостей і функцій сайту необхідно авторизуватись в системі."
          gutterBottom
        />
        <Typography
          children="Заповни поля у віконці реєстрації і працюй на повну!"
          gutterBottom
        />
        <StyledButton
          disableRipple
          variant="text"
          startIcon={<Pencil />}
          text="Авторизація"
          colorVariant="link"
          onClick={toggleModal}
        />
      </Box>
    </Paper>
  );
};

export default AuthInfoBlock;
