import { Box } from "@mui/material";
import Banner from "./Banner";
import AuthInfoBlock from "./AuthInfoBlock";
import BigInfoBlock from "./BigInfoBlock";
import AuthModal from "../modalWindow/AuthModal";
import ModalState from "../modalWindow/ModalContext";

const MainPage = () => (
  <ModalState>
    <Banner />
    <Box mt={3}>
      <AuthInfoBlock />
    </Box>
    <Box mt={6}>
      <BigInfoBlock />
    </Box>
    <AuthModal />
  </ModalState>
);

export default MainPage;
