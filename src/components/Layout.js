import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MainPage from "./mainPage/MainPage";
import ControlPage from "./controlPage/ControlPage";
import StudentControlPage from "./controlPage/StudentControlPage";
import TeacherControlDetails from "./controlPage/teacher/TeacherControlDetails";
import TeacherControlEdit from "./controlPage/teacher/TeacherControlEdit";
import TeacherCalendar from "./controlPage/teacher/TeacherCalendar";
import TeacherSession from "./controlPage/teacher/TeacherSession";

const Layout = () => (
  <>
    <Header />
    <Box component="main" mt={3}>
      <Box className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/student/control" element={<StudentControlPage />} />
          <Route
            path="/student/control/details"
            element={<StudentControlPage variant="details" />}
          />
          <Route path="/teacher/control" element={<ControlPage />} />
          <Route
            path="/teacher/control/detailsControl"
            element={<TeacherControlDetails />}
          />
          <Route
            path="/teacher/control/detailsControl/edit"
            element={<TeacherControlEdit />}
          />
          <Route
            path="/teacher/control/detailsCalendar"
            element={<TeacherCalendar />}
          />
          <Route
            path="/teacher/control/detailsSession"
            element={<TeacherSession />}
          />
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
