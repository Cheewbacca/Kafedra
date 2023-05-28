import { Box, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import StyledButton from "../UI/StyledButton";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const styles = {
  paper: {
    p: 3,
    borderRadius: "10px",
    backgroundColor: "white",
  },
  text: {
    width: "100%",
  },
};

const WishDetailedPage = () => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const [isDisabled, setIsDisabled] = useState(false);

  const navigate = useNavigate();

  const { authData } = useAuth();

  const { id: userId } = authData;

  const { id } = useParams();

  const changeName = (e) => {
    if (isDisabled) {
      return;
    }
    setName(e.target.value);
  };

  const changeText = (e) => {
    if (isDisabled) {
      return;
    }
    setText(e.target.value);
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    fetch(`/wish?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const [tempText] = res?.data;

        if (!tempText) {
          alert("Error");
          return;
        }

        setText(tempText?.text || "");
        setName(tempText?.name || "");
      });

    setIsDisabled(true);
  }, [id]);

  const toggleDisabled = () => {
    setIsDisabled(!isDisabled);
  };

  const updateWish = () => {
    fetch("/updateWish", {
      method: "POST",
      body: JSON.stringify({ id, text, name }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.success === true) {
          alert("Думку оновлено");
        }
      })
      .then(() => {
        setIsDisabled(true);
      });
  };

  const addWish = () => {
    fetch("/addWish", {
      method: "POST",
      body: JSON.stringify({
        id: userId,
        text,
        date: new Date().toLocaleDateString(),
        name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.success === true) {
          alert("Бажання збережено");
        }
      })
      .then(() => {
        navigate("/wish-list");
      });
  };

  return (
    <Box mt={3}>
      <Paper elevation={0} sx={styles.paper}>
        <TextField
          value={name}
          disabled={isDisabled}
          onChange={changeName}
          sx={styles.text}
        />
        <Box mt={3}>
          <TextField
            value={text}
            disabled={isDisabled}
            onChange={changeText}
            sx={styles.text}
            minRows={2}
            multiline
          />
        </Box>
        <Box mt={3} display="flex">
          <StyledButton
            colorVariant="blue"
            text="Зберегти"
            onClick={id ? updateWish : addWish}
            disableRipple
          />
          {isDisabled && (
            <Box ml={2}>
              <StyledButton
                colorVariant="transparent"
                text="Редагувати"
                onClick={toggleDisabled}
                disableRipple
              />
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default WishDetailedPage;
