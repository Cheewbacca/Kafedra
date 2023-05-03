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
  Typography,
} from "@mui/material";
import headerItems from "../headerItems";
import { useEffect, useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import StyledSelect from "../../UI/StyledSelect";
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

const attestationOptions = [
  {
    text: "+",
    value: "+",
  },
  {
    text: "-",
    value: "-",
  },
];

const EditableCalendarRow = ({ item, onEdit, onDelete }) => {
  const { id, ...otherItems } = item;
  const [firstAttestation, setFirstAttestation] = useState(item.atestation1);
  const [secondAttestation, setSecondAttestation] = useState(item.atestation2);

  const changeAttestation1 = (e) => {
    setFirstAttestation(e.target.value);
  };

  const changeAttestation2 = (e) => {
    setSecondAttestation(e.target.value);
  };

  const [editable, setEditable] = useState(false);

  const startEditItem = () => {
    setEditable(true);
  };

  const endEditItem = () => {
    setEditable(false);
    onEdit({
      ...item,
      atestation1: firstAttestation,
      atestation2: secondAttestation,
    });
  };

  const deleteItem = () => {
    onDelete(id);
  };

  const Content = () => {
    if (!editable) {
      return Object.values(otherItems).map((data) => (
        <TableCell key={data}>
          <Typography children={data} />
        </TableCell>
      ));
    }

    const { name, group } = otherItems;

    return (
      <>
        <TableCell>
          <Typography children={name} />
        </TableCell>
        <TableCell>
          <Typography children={group} />
        </TableCell>
        <TableCell>
          <StyledSelect
            value={firstAttestation}
            onChange={changeAttestation1}
            options={attestationOptions}
          />
        </TableCell>
        <TableCell>
          <StyledSelect
            value={secondAttestation}
            onChange={changeAttestation2}
            options={attestationOptions}
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

  useEffect(() => {
    if (!id) {
      return;
    }

    fetch(`http://localhost:3001/educator/controlDetailed?id=${id}`)
      .then((res) => res.json())
      .then(({ data }) => {
        setItems(data);
      });
  }, [id]);

  const headerItemsToShow = headerItems?.calendar?.teacher?.one || [];

  const onEdit = (itemToEdit) => {
    setItems((prev) =>
      prev.map((el) => (el.id === itemToEdit.id ? itemToEdit : el))
    );
  };

  const onDelete = (deleteId) => {
    setItems((prev) => prev.filter(({ id }) => id !== deleteId));
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
            <EditableCalendarRow
              key={item.id}
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeacherCalendar;
