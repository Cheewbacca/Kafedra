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
import { useAuth } from "../../AuthContext";
import { useModalState } from "./ModalContext";

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

const prepareUserData = (userFromApi) => ({
  group: userFromApi.group_name,
  firstName: userFromApi.name,
  lastName: userFromApi.surname,
  fatherName: userFromApi.patronymic,
  role: userFromApi.role_name,
  id: userFromApi.id,
});

const Form = () => {
  const { setAuthData } = useAuth();
  const { toggleModal } = useModalState();

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

    fetch("/login", {
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

        const preparedUser = prepareUserData(user);

        setAuthData(preparedUser);
        sessionStorage.setItem("login", JSON.stringify(preparedUser));
      })
      .then(() => {
        toggleModal();
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
