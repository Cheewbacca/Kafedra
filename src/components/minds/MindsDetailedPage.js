import { Box, Paper, TextField, Typography } from "@mui/material";
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

const MindsDetailedPage = () => {
  const [text, setText] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const navigate = useNavigate();

  const { authData } = useAuth();

  const { id: userId } = authData;

  const { id } = useParams();

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

    fetch(`/mind?id=${id}`, {
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
      });

    setIsDisabled(true);
  }, [id]);

  const updateMind = () => {
    fetch("/updateMind", {
      method: "POST",
      body: JSON.stringify({ id, text }),
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

  const addMind = () => {
    fetch("/addMind", {
      method: "POST",
      body: JSON.stringify({
        id: userId,
        text,
        date: new Date().toLocaleDateString(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.success === true) {
          alert("Думку збережено");
        }
      })
      .then(() => {
        navigate("/my-minds");
      });
  };

  const toggleDisabled = () => {
    setIsDisabled(!isDisabled);
  };

  return (
    <Box mt={3}>
      <Paper elevation={0} sx={styles.paper}>
        <Typography variant="h6" children="Мої думки" />
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
            onClick={id ? updateMind : addMind}
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

export default MindsDetailedPage;
