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

const StyledTableRow = ({ item }) => {
  const cells = Object.values(item);

  return (
    <TableRow>
      {cells.map((data, index) => (
        <TableCell key={data}>
          <Typography
            sx={[index === cells.length - 1 && { color: "primary.main" }]}
            children={data}
          />
        </TableCell>
      ))}
      <TableCell>
        <Box display="flex">
          <IconButton sx={styles.icon} children={<Edit />} />
          <IconButton sx={[styles.icon, { ml: 3 }]} children={<FindInPage />} />
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default StyledTableRow;
