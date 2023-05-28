import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MainPage from "./mainPage/MainPage";
import MindsPage from "./minds/MindsPage";
import MindsDetailedPage from "./minds/MindsDetailedPage";
import WishPage from "./wishes/WishPage";
import WishDetailedPage from "./wishes/WishDetailedPage";

const Layout = () => (
  <>
    <Header />
    <Box component="main" mt={3}>
      <Box className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/my-minds" element={<MindsPage />} />
          <Route path="/my-minds/:id" element={<MindsDetailedPage />} />
          <Route path="/my-minds/add" element={<MindsDetailedPage />} />
          <Route path="/wish-list" element={<WishPage />} />
          <Route path="/wish-list/:id" element={<WishDetailedPage />} />
          <Route path="/wish-list/add" element={<WishDetailedPage />} />
        </Routes>
      </Box>
    </Box>
    <Box className="footer">
      <Box mt={6}>
        <Footer />
      </Box>
    </Box>
  </>
);

export default Layout;
