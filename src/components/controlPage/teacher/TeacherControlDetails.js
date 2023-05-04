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
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
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

const TeacherControlDetails = () => {
  const navigate = useNavigate();

  const {
    authData: { id },
  } = useAuth();

  const [items, setItems] = useState([]);

  const [searchParams] = useSearchParams();

  const subjectId = searchParams.get("subject");
  const resource = searchParams.get("resource");

  useEffect(() => {
    if (!id || !resource) {
      return;
    }

    fetch(`/educator/controlDetailed?id=${id}&resource=${resource}`)
      .then((res) => res.json())
      .then(({ data }) => {
        if (!data) {
          alert("Invalid permissions!");
          return;
        }
        setItems(data);
      });
  }, [id, resource]);

  const headerItemsToShow = headerItems?.current?.educator?.one || [];

  const onEdit = (id) => {
    navigate(
      `/teacher/control/detailsControl/edit?id=${id}&subject=${subjectId}&resource=${resource}`
    );
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
