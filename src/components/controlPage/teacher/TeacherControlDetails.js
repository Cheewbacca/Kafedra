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
import TeacherTableRow from "./TeacherTableRow";
import headerItems from "../headerItems";
import { useNavigate } from "react-router-dom";

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

const items = [
  {
    name: "Історія Великого Всесвіту та шось там ще",
    teacher: "Петренко В.О.",
  },
  {
    name: "Історія Великого Всесвіту та шось там ще",
    teacher: "Петренко В.О.",
  },
  {
    name: "Історія Великого Всесвіту та шось там ще",
    teacher: "Петренко В.О.",
  },
  {
    name: "Історія Великого Всесвіту та шось там ще",
    teacher: "Петренко В.О.",
  },
  {
    name: "Історія Великого Всесвіту та шось там ще",
    teacher: "Петренко В.О.",
  },
];

const TeacherControlDetails = () => {
  const navigate = useNavigate();
  const headerItemsToShow = headerItems?.current?.teacher?.one || [];

  const onEdit = () => {
    navigate("/teacher/control/detailsControl/edit");
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
          {items.map((item, index) => (
            <TeacherTableRow key={index} item={item} onEdit={onEdit} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeacherControlDetails;
