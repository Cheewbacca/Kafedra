import { Delete, Done, Edit } from "@mui/icons-material";
import {
  Box,
  IconButton,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
import StyledSelect from "../../UI/StyledSelect";

const styles = {
  icon: {
    backgroundColor: "#E0E0E0",
    color: "secondary.main",
  },
};

const options = [
  {
    value: "practice",
    text: "Практика",
  },
  {
    value: "lecture",
    text: "Лекція",
  },
];

const controlVariants = options.reduce(
  (acc, el) => ({ ...acc, [el.value]: el.text }),
  {}
);

const TeacherEditableTableRow = ({ item, onEdit, onDelete, onCreate }) => {
  const { isNew = false, id, ...otherItems } = item;

  const [editable, setEditable] = useState(isNew);

  const { date: initialDate, name } = otherItems;

  const [date, setDate] = useState(dayjs(initialDate));
  const [note, setNote] = useState(otherItems.note);
  const [controlType, setControlType] = useState(otherItems.control);

  const afterEditItem = {
    name,
    date: date.format("YYYY-MM-DD"),
    note,
    control: controlType,
    id,
    isNew: false,
  };

  const startEditItem = () => {
    setEditable(true);
  };

  const endEditItem = () => {
    if (!date || !note) {
      return;
    }
    onEdit(afterEditItem);
    setEditable(false);
  };

  const deleteItem = () => {
    onDelete(id);
  };

  const createItem = () => {
    if (!date || !note) {
      return;
    }
    onCreate(afterEditItem);
    setEditable(false);
  };

  const changeNote = (e) => {
    const newNote = +e.target.value;
    setNote(newNote);
  };

  const changeControlType = (e) => {
    setControlType(e.target.value);
  };

  const changeDate = (newValue) => {
    setDate(newValue);
  };

  const Content = () => {
    if (!editable) {
      return Object.entries(otherItems).map(([key, data]) => (
        <TableCell key={data}>
          <Typography
            children={key === "control" ? controlVariants[data] : data}
          />
        </TableCell>
      ));
    }

    return (
      <>
        <TableCell>
          <Typography children={name} />
        </TableCell>
        <TableCell>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker value={date} onChange={changeDate} />
          </LocalizationProvider>
        </TableCell>
        <TableCell>
          <TextField
            type="number"
            value={note}
            onChange={changeNote}
            InputProps={{ inputProps: { min: 0, max: 100 } }}
          />
        </TableCell>
        <TableCell>
          <StyledSelect
            value={controlType}
            onChange={changeControlType}
            options={options}
          ></StyledSelect>
        </TableCell>
      </>
    );
  };

  return (
    <TableRow>
      <Content />
      <TableCell>
        <Box display="flex">
          {onEdit && !isNew && (
            <IconButton
              sx={styles.icon}
              onClick={editable ? endEditItem : startEditItem}
              children={<Edit />}
            />
          )}
          {editable && isNew && (
            <IconButton
              onClick={createItem}
              sx={[styles.icon, { ml: 3 }]}
              children={<Done />}
            />
          )}
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

export default TeacherEditableTableRow;
