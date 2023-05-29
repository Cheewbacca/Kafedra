import {
  Box,
  FormControl,
  FormLabel,
  TextField,
  FormHelperText,
} from "@mui/material";
import { useRef, useState } from "react";
import StyledButton from "../UI/StyledButton";
import Login from "../../icons/Login";
import { useModalState } from "./ModalContext";
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

const emailCheck =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const RegistrationForm = () => {
  const { toggleRegistration } = useModalState();
  const { setAuthData } = useAuth();

  const loginRef = useRef(false);
  const passRef = useRef(false);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const changeLogin = (e) => {
    loginRef.current = true;
    setLogin(e.target.value);
  };

  const changePassword = (e) => {
    passRef.current = true;
    setPassword(e.target.value);
  };

  const register = (e) => {
    e.preventDefault();

    if (!login || !password) {
      return;
    }

    fetch("/register", {
      method: "POST",
      body: JSON.stringify({ login, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const user = res?.data;

        if (!user) {
          alert("Error");
          return;
        }

        setAuthData(user);
        sessionStorage.setItem("login", JSON.stringify(user));
      })
      .then(() => {
        toggleRegistration();
      });
  };

  return (
    <Box sx={styles.wrapper} component="form">
      <FormControl sx={styles.formControl} required>
        <FormLabel sx={styles.label} variant="body2" htmlFor="login">
          Ваш email
        </FormLabel>
        <TextField
          id="login"
          value={login}
          onChange={changeLogin}
          type="email"
          required
        />
        {(!login || !emailCheck.test(login)) && loginRef.current && (
          <FormHelperText error={!login} children="Wrong email" />
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
        {!password && passRef.current && (
          <FormHelperText error={!password} children="Fill password field" />
        )}
      </FormControl>

      <Box sx={styles.buttonWrapper}>
        <StyledButton
          disableRipple
          variant="text"
          startIcon={<Login />}
          text="Реєстрація"
          colorVariant="blue"
          onClick={register}
          type="submit"
          disabled={!login || !password}
        />
      </Box>
    </Box>
  );
};

export default RegistrationForm;
