import { Edit, FindInPage } from "@mui/icons-material";
import {
  Box,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

const styles = {
  icon: {
    backgroundColor: "#E0E0E0",
    color: "secondary.main",
  },
};

const TeacherTableRow = ({ item, onView, onEdit }) => {
  const cells = Object.values(item);

  return (
    <TableRow>
      {cells.map((data) => (
        <TableCell key={data}>
          <Typography children={data} />
        </TableCell>
      ))}
      {
        <TableCell>
          <Box display="flex">
            {onEdit && (
              <IconButton
                sx={styles.icon}
                onClick={onEdit}
                children={<Edit />}
              />
            )}
            {onView && (
              <IconButton
                onClick={onView}
                sx={[styles.icon, { ml: 3 }]}
                children={<FindInPage />}
              />
            )}
          </Box>
        </TableCell>
      }
    </TableRow>
  );
};

export default TeacherTableRow;
