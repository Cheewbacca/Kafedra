import { Box, CardMedia, Modal, Paper, Typography } from "@mui/material";
import Img from "./modal.svg";
import { useModalState } from "./ModalContext";
import Form from "./Form";

const styles = {
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

const AuthModal = () => {
  const { open, toggleModal } = useModalState();

  return (
    <Modal sx={styles.modal} open={open} onClose={toggleModal}>
      <Paper sx={styles.wrapper} elevation={0}>
        <CardMedia src={Img} component="img" title="Some title" />
        <Typography
          variant="h3"
          children="Раді вітати вас у КПІ!"
          gutterBottom
        />
        <Typography children="Кілька питань до вас і можемо розпочинати!" />
        <Box mt={1}>
          <Form />
        </Box>
      </Paper>
    </Modal>
  );
};

export default AuthModal;
