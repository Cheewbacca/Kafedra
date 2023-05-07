import { Avatar, Box, Typography } from "@mui/material";
import Logo from "../icons/Logo";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import StyledButton from "./UI/StyledButton";
import Login from "../icons/Login";
import ScheduleButton from "./schedule/ScheduleButton";

const styles = {
  wrapper: {
    backgroundColor: "white",
    py: "33px",
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoBox: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    "& svg": {
      mr: "24px",
    },
  },
  menuItems: {
    display: "flex",
    alignItems: "center",
    "& > p": {
      "&:not(:first-of-type)": {
        ml: "40px",
      },
      "& > a": {
        color: "inherit",
        textDecoration: "none",
        fontSize: "16px",
        fontWeight: 500,
        transition: "color .3s",
        position: "relative",
        "&:hover": {
          color: "primary.main",
          "&::after": {
            backgroundColor: "primary.main",
          },
        },
      },
    },
  },
  avatar: {
    height: "54px",
    width: "54px",
    backgroundColor: "secondary.main",
    textTransform: "uppercase",
    color: "white",
  },
};

const Header = () => {
  const navigate = useNavigate();
  const { authData, setAuthData } = useAuth();

  const { role = "student" } = authData;

  const menuItems = [
    ...(role === "methodist"
      ? []
      : [
          {
            url: role === "student" ? "/student/control" : "/teacher/control",
            text: "Контроль",
          },
        ]),
    {
      url: "/documents",
      text: "Нормативні документи",
    },
    {
      url: "/schedule",
      text: "Розклад",
    },
  ];

  const onExit = () => {
    setAuthData({});
    navigate("/");
    sessionStorage.removeItem("login");
  };

  const goToMainPage = () => {
    navigate("/");
  };

  const avatarData = [authData.firstName, authData.lastName]
    .map((str) => str && str[0])
    .join(".");

  return (
    <Box component="header" sx={styles.wrapper}>
      <Box className="container" sx={styles.content}>
        <Box sx={styles.logoBox} onClick={goToMainPage}>
          <Logo />
          <Typography variant="h1" children="Study with KPI" />
        </Box>
        {authData.id && (
          <>
            <Box sx={styles.menuItems}>
              {menuItems.map(({ url, text }, index) => (
                <Typography key={url} variant="body1">
                  {index === menuItems.length - 1 ? (
                    <ScheduleButton text={text} />
                  ) : (
                    <NavLink to={url} children={text} />
                  )}
                </Typography>
              ))}
            </Box>
            <Box display="flex">
              <Avatar sx={styles.avatar}>
                <Typography variant="button" children={avatarData} />
              </Avatar>
              <Box ml={2}>
                <StyledButton
                  disableRipple
                  variant="text"
                  startIcon={<Login />}
                  text="Вийти"
                  colorVariant="transparent"
                  onClick={onExit}
                />
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Header;
