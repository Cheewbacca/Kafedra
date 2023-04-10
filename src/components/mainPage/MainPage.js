import { Box } from "@mui/material";
import Banner from "./Banner";
import AuthInfoBlock from "./AuthInfoBlock";
import BigInfoBlock from "./BigInfoBlock";
import AuthModal from "../modalWindow/AuthModal";
import AuthState from "../modalWindow/ModalContext";

const MainPage = () => (
  <AuthState>
    <Banner />
    <Box mt={3}>
      <AuthInfoBlock />
    </Box>
    <Box mt={6}>
      <BigInfoBlock />
    </Box>
    <AuthModal />
  </AuthState>
);

export default MainPage;
