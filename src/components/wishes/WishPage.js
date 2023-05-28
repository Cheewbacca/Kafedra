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

const WishPage = () => {
  const [list, setList] = useState([]);

  const { authData } = useAuth();

  const { id: userId } = authData;

  const navigate = useNavigate();

  const openItem = (id) => {
    navigate(`/wish-list/${id}`);
  };

  useEffect(() => {
    if (!userId) {
      return;
    }

    fetch(`/wishes?id=${userId}`, {
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
  }, [userId]);

  const addWish = () => {
    navigate("/wish-list/add");
  };

  const deleteItem = (id) => {
    fetch(`/deleteWish?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.status === true) {
          setList((prev) => prev.filter((el) => el.id !== id));
          alert("Видалено");
        }
      });
  };

  return (
    <Box mt={3}>
      {Boolean(list.length) && (
        <Typography
          variant="h6"
          gutterBottom
          children="Список ваших бажань та цілей: "
        />
      )}
      {list.map(({ id, name }) => (
        <Box key={id} sx={styles.item} mt={2}>
          <Typography children={name} onClick={openItem.bind(null, id)} />
          <IconButton onClick={deleteItem.bind(null, id)}>
            <Delete />
          </IconButton>
        </Box>
      ))}
      <Box mt={3}>
        <StyledButton
          colorVariant="blue"
          text="Додати"
          onClick={addWish}
          disableRipple
        />
      </Box>
    </Box>
  );
};

export default WishPage;
