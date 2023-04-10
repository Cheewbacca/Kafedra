import {
  Box,
  FormControl,
  FormLabel,
  TextField,
  FormHelperText,
} from "@mui/material";
import { useState } from "react";
import StyledButton from "../UI/StyledButton";
import Login from "../../icons/Login";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },
  formControl: {
    mt: 2,
    "&:focus-within": {
      "& label": {
        color: "primary.main",
      },
    },
    "& .MuiInputBase-root": {
      width: "100%",
      borderRadius: "15px",
      background: "#F5F5F5",
      mt: 1,
    },
  },
  label: {
    textAlign: "left",
    color: "secondary.main",
    opacity: 0.5,
  },
  buttonWrapper: {
    mt: 3,
    mx: "auto",
  },
};

const Form = () => {
  const navigate = useNavigate();
  const { setAuthData } = useAuth();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const changeLogin = (e) => {
    setLogin(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const makeAuth = (e) => {
    e.preventDefault();

    if (!login || !password) {
      return;
    }

    // TODO: extend with API call
    Promise.resolve({ id: 1 })
      .then((res) => {
        setAuthData(res);
      })
      .then(() => {
        navigate("/control");
      });
  };

  return (
    <Box sx={styles.wrapper} component="form">
      <FormControl sx={styles.formControl} required>
        <FormLabel sx={styles.label} variant="body2" htmlFor="login">
          Ваш логін
        </FormLabel>
        <TextField id="login" value={login} onChange={changeLogin} required />
        {!login && (
          <FormHelperText error={!login} children="Fill login field" />
        )}
      </FormControl>

      <FormControl sx={styles.formControl} required>
        <FormLabel sx={styles.label} variant="body2" htmlFor="login">
          Пароль
        </FormLabel>
        <TextField
          value={password}
          onChange={changePassword}
          type="password"
          required
        />
        {!password && (
          <FormHelperText error={!password} children="Fill password field" />
        )}
      </FormControl>

      <Box sx={styles.buttonWrapper}>
        <StyledButton
          disableRipple
          variant="text"
          startIcon={<Login />}
          text="Авторизація"
          colorVariant="blue"
          onClick={makeAuth}
          type="submit"
          disabled={!login || !password}
        />
      </Box>
    </Box>
  );
};

export default Form;
