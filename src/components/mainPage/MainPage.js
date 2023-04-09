import { Box } from "@mui/material";
import Banner from "./Banner";
import AuthInfoBlock from "./AuthInfoBlock";
import BigInfoBlock from "./BigInfoBlock";

const MainPage = () => (
  <>
    <Banner />
    <Box mt={3}>
      <AuthInfoBlock />
    </Box>
    <Box mt={6}>
      <BigInfoBlock />
    </Box>
  </>
);

export default MainPage;
