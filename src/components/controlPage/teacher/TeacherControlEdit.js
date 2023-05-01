import {
  Box,
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
import StyledButton from "../../UI/StyledButton";
import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import TeacherEditableTableRow from "./TeacherEditableTableRow";

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

const itemsTest = [
  {
    name: "student",
    date: "2023-05-01",
    note: 12,
    control: "practice",
    id: 1,
  },
  {
    name: "student",
    date: "2023-05-01",
    note: 12,
    control: "practice",
    id: 2,
  },
  {
    name: "student",
    date: "2023-05-01",
    note: 12,
    control: "practice",
    id: 3,
  },
  {
    name: "student",
    date: "2023-05-01",
    note: 12,
    control: "practice",
    id: 4,
  },
  {
    name: "student",
    date: "2023-05-01",
    note: 12,
    control: "practice",
    id: 5,
  },
];

const TeacherControlEdit = () => {
  const [items, setItems] = useState([]);

  const studentName = items?.[0]?.name || "";

  useEffect(() => {
    setItems(itemsTest);
  }, []);

  const headerItemsToShow = headerItems?.current?.teacher?.additional || [];

  const onEdit = (itemToEdit) => {
    setItems((prev) =>
      prev.map((el) => (el.id === itemToEdit.id ? itemToEdit : el))
    );
  };

  const onDelete = (deleteId) => {
    setItems((prev) => prev.filter(({ id }) => id !== deleteId));
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        name: studentName,
        date: new Date().toDateString(),
        note: null,
        control: "practice",
        id: new Date().getTime(),
        isNew: true,
      },
    ]);
  };

  const onCreate = (newItem) => {
    setItems((prev) => [
      ...prev.filter(({ id }) => id !== newItem.id),
      newItem,
    ]);
  };

  return (
    <>
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
              <TeacherEditableTableRow
                key={item.id}
                item={item}
                onEdit={onEdit}
                onDelete={onDelete}
                onCreate={onCreate}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={3} width="100%" display="flex" justifyContent="center">
        <StyledButton
          disableRipple
          variant="text"
          startIcon={<Add />}
          text="Додати"
          colorVariant="link"
          onClick={addItem}
        />
      </Box>
    </>
  );
};

export default TeacherControlEdit;
