import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MainPage from "./mainPage/MainPage";
import ControlPage from "./controlPage/ControlPage";

const Layout = () => (
  <>
    <Header />
    <Box component="main" className="container" mt={3}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/control" element={<ControlPage />} />
      </Routes>
    </Box>
    <Box className="footer">
      <Box mt={6}>
        <Footer />
      </Box>
    </Box>
  </>
);

export default Layout;
