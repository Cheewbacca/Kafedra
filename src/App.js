import { ThemeProvider } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";
import theme from "./theme";
import Layout from "./components/Layout";
import AuthState from "./AuthContext";

const App = () => (
  <AuthState>
    <Router>
      <ThemeProvider theme={theme}>
        <Layout />
      </ThemeProvider>
    </Router>
  </AuthState>
);

export default App;
