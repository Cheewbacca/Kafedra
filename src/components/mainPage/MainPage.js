import { Box } from "@mui/material";
import Banner from "./Banner";
import AuthInfoBlock from "./AuthInfoBlock";
import AuthModal from "../modalWindow/AuthModal";
import RegistrationModal from "../modalWindow/RegistrationModal";
import ModalState from "../modalWindow/ModalContext";

const MainPage = () => (
  <ModalState>
    <Banner />
    <AuthModal />
    <Box mt={3}>
      <AuthInfoBlock />
    </Box>
    <RegistrationModal />
  </ModalState>
);

export default MainPage;
