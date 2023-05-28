import { Box, CardMedia, Modal, Paper, Typography } from "@mui/material";
import Img from "./modal.svg";
import { useModalState } from "./ModalContext";
import RegistrationForm from "./RegistrationForm";

export const styles = {
  modal: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    maxWidth: "569px",
    display: "flex",
    flexDirection: "column",
    py: 3,
    px: 10,
    background: "white",
    borderRadius: "30px",
    textAlign: "center",
  },
};

const RegistrationModal = () => {
  const { openRegistration, toggleRegistration } = useModalState();

  return (
    <Modal
      sx={styles.modal}
      open={openRegistration}
      onClose={toggleRegistration}
    >
      <Paper sx={styles.wrapper} elevation={0}>
        <CardMedia src={Img} component="img" title="Some title" />
        <Typography variant="h3" children="Щоденник вдячності!" gutterBottom />
        <Typography children="Реєстрація" />
        <Box mt={1}>
          <RegistrationForm />
        </Box>
      </Paper>
    </Modal>
  );
};

export default RegistrationModal;
