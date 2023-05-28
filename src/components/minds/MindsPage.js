import { Box, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StyledButton from "../UI/StyledButton";
import { useAuth } from "../../AuthContext";
import { Delete } from "@mui/icons-material";

const styles = {
  item: {
    p: 2,
    width: "100%",
    backgroundColor: "white",
    borderRadius: "10px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
};

function getCookie(name, getDate = false) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (getDate && parts.length === 2) {
    return parts.pop().split(";").shift();
  }

  if (parts.length === 2) return parts.pop().split(";").shift();
}

function deleteCookie(expiresGMT) {
  document.cookie = `cookie1=day/${expiresGMT}; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
}

const MindsPage = () => {
  const [list, setList] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const { authData } = useAuth();

  const { id } = authData;

  const navigate = useNavigate();

  const openItem = (id) => {
    navigate(`/my-minds/${id}`);
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    const day = getCookie("cookie1");

    if (day) {
      setDisabled(true);
    }

    fetch(`/minds?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const tempList = res?.data;

        if (!tempList) {
          alert("Error");
          return;
        }
        setList(tempList);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const addMind = () => {
    const day = getCookie("cookie1");

    if (day) {
      return;
    }

    const now = new Date();

    const timezoneOffset = now.getTimezoneOffset();

    const expires = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0 - timezoneOffset,
      0
    );

    const expiresGMT = expires.toGMTString();

    document.cookie = `cookie1=day/${expiresGMT}; expires=${expiresGMT}; path=/`;
    navigate("/my-minds/add");
  };

  const deleteItem = (id) => {
    const now = new Date();

    const timezoneOffset = now.getTimezoneOffset();

    const expires = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0 - timezoneOffset,
      0
    );

    const expiresGMT = expires.toGMTString();

    const day = getCookie("cookie1");

    fetch(`/deleteMind?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.status === true) {
          setList((prev) => prev.filter((el) => el.id !== id));
          if (day.split("/").pop() === expiresGMT) {
            deleteCookie(expiresGMT);
            setDisabled(false);
          }
          alert("Видалено");
        }
      });
  };

  return (
    <Box mt={3}>
      {Boolean(list.length) && (
        <Typography variant="h6" gutterBottom children="Список ваших думок: " />
      )}
      {list.map(({ id, date }) => (
        <Box key={id} sx={styles.item} mt={2}>
          <Typography children={date} onClick={openItem.bind(null, id)} />
          <IconButton onClick={deleteItem.bind(null, id)}>
            <Delete />
          </IconButton>
        </Box>
      ))}
      <Box mt={3}>
        <StyledButton
          colorVariant="blue"
          text="Додати"
          disabled={disabled}
          onClick={addMind}
          disableRipple
        />
      </Box>
    </Box>
  );
};

export default MindsPage;
