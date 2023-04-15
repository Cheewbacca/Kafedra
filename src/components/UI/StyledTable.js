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
import StyledTableRow from "./StyledTableRow";

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

const StyledTable = ({ headerItems, items }) => (
  <TableContainer component={Paper} sx={styles.wrapper}>
    <Table>
      <TableHead sx={styles.head}>
        <TableRow>
          {headerItems.map(({ Icon, text }, index) => (
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
          <StyledTableRow key={index} item={item} />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default StyledTable;
