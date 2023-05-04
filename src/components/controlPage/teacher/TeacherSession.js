import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import headerItems from "../headerItems";
import { useEffect, useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../../AuthContext";

const styles = {
  wrapper: {
    p: 2,
    boxShadow: "none",
    borderRadius: "30px",
  },
  head: {
    position: "relative",
    zIndex: 1,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      backgroundColor: "#F5F5F5",
      borderRadius: "20px",
      zIndex: -1,
    },
  },
  cell: {
    border: "none",
  },
  cellContent: {
    display: "flex",
    alignItems: "center",
    "& > span": {
      ml: 1,
    },
  },
};

const EditableCalendarRow = ({ item, onEdit }) => {
  const { ID_student_exam: id, ...otherItems } = item;

  const [note, setNote] = useState(item.score);

  const changeNote = (e) => {
    setNote(e.target.value);
  };

  const [editable, setEditable] = useState(false);

  const startEditItem = () => {
    setEditable(true);
  };

  const endEditItem = () => {
    setEditable(false);
    onEdit({
      ...item,
      score: note,
    });
  };

  const deleteItem = () => {
    setEditable(false);
  };

  const Content = () => {
    if (!editable) {
      return Object.values(otherItems).map((data) => (
        <TableCell key={data}>
          <Typography children={data} />
        </TableCell>
      ));
    }

    const { student_name_surname: name, group_name: group } = otherItems;

    return (
      <>
        <TableCell>
          <Typography children={name} />
        </TableCell>
        <TableCell>
          <Typography children={group} />
        </TableCell>
        <TableCell>
          <TextField
            type="number"
            value={note}
            onChange={changeNote}
            InputProps={{ inputProps: { min: 0, max: 100 } }}
          />
        </TableCell>
      </>
    );
  };

  return (
    <TableRow>
      <Content />
      <TableCell>
        <Box display="flex">
          <IconButton
            sx={styles.icon}
            onClick={editable ? endEditItem : startEditItem}
            children={<Edit />}
          />
          {editable && (
            <IconButton
              onClick={deleteItem}
              sx={[styles.icon, { ml: 3 }]}
              children={<Delete />}
            />
          )}
        </Box>
      </TableCell>
    </TableRow>
  );
};

const TeacherCalendar = () => {
  const {
    authData: { id },
  } = useAuth();

  const [items, setItems] = useState([]);

  const [searchParams] = useSearchParams();

  const group = searchParams.get("group_name");

  useEffect(() => {
    if (!group || !id) {
      return;
    }

    fetch(`/educator/sessionsGroup?group=${group}&educator_id=${id}`)
      .then((res) => res.json())
      .then(({ data }) => {
        setItems(data);
      });
  }, [group, id]);

  const headerItemsToShow = headerItems?.session?.educator?.one || [];

  const onEdit = (itemToEdit) => {
    fetch(
      `/educator/updateSession?score=${itemToEdit.score}&educator_id=${id}&student_id=${itemToEdit.ID_student_exam}`,
      {
        method: "PUT",
      }
    ).then((res) => {
      if (!res) {
        alert("Error");
        return;
      }
      setItems((prev) =>
        prev.map((el) =>
          el.ID_student_exam === itemToEdit.ID_student_exam ? itemToEdit : el
        )
      );
    });
  };

  return (
    <TableContainer component={Paper} sx={styles.wrapper}>
      <Table>
        <TableHead sx={styles.head}>
          <TableRow>
            {headerItemsToShow.map(({ Icon, text }, index) => (
              <TableCell key={index} sx={styles.cell} scope="row">
                <Box sx={styles.cellContent}>
                  <Icon />
                  <Typography variant="button" children={text} />
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <EditableCalendarRow key={item.id} item={item} onEdit={onEdit} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeacherCalendar;
