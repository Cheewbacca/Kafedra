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

const TeacherTableRow = ({ item, onView, onEdit, variant }) => {
  const { ID_subject, resource_name, student_id, ...otherItems } = item;

  const cells = Object.values(otherItems);

  const editItem = () => {
    if (!student_id) {
      return;
    }

    onEdit(student_id);
  };

  const viewItem = () => {
    if (variant === "calendar" || variant === "session") {
      onView(otherItems.group_name);
      return;
    }

    if (!ID_subject) {
      return;
    }

    onView(ID_subject, resource_name);
  };

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
                onClick={editItem}
                children={<Edit />}
              />
            )}
            {onView && (
              <IconButton
                onClick={viewItem}
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
