import { FindInPage } from "@mui/icons-material";
import {
  Box,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useLocation, useSearchParams } from "react-router-dom";

const styles = {
  icon: {
    backgroundColor: "#E0E0E0",
    color: "secondary.main",
  },
};

const StudentTableRow = ({ item, onView }) => {
  const location = useLocation();

  const pagePaths = location.pathname.split("/");

  const currentPage = pagePaths[pagePaths.length - 1];

  const [searchParams] = useSearchParams();

  const table = searchParams.get("table");

  const cells = Object.values(item);

  const removeActions = table !== "current" && table;

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
      {!removeActions && (
        <TableCell>
          <Box display="flex">
            {currentPage === "control" && (
              <IconButton
                onClick={onView}
                sx={[styles.icon, { ml: 3 }]}
                children={<FindInPage />}
              />
            )}
          </Box>
        </TableCell>
      )}
    </TableRow>
  );
};

export default StudentTableRow;