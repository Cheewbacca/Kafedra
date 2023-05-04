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
import { useSearchParams } from "react-router-dom";
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

const TeacherControlEdit = () => {
  const {
    authData: { id },
  } = useAuth();

  const [items, setItems] = useState([]);

  const studentName = items?.[0]?.student_name_surname || "";

  const [searchParams] = useSearchParams();

  const studentId = searchParams.get("id");
  const subjectId = searchParams.get("subject");
  const resource = searchParams.get("resource");

  useEffect(() => {
    if (!studentId || !resource) {
      return;
    }

    fetch(`/educator/controlStudent?id=${studentId}&resource=${resource}`)
      .then((res) => res.json())
      .then(({ data }) => {
        setItems(data);
      });
  }, [studentId, resource]);

  const headerItemsToShow = headerItems?.current?.educator?.additional || [];

  const onEdit = (itemToEdit) => {
    const urlParams = new URLSearchParams({
      score: itemToEdit.score,
      educator_id: +id,
      id_math: itemToEdit.ID_math_score,
      resource,
    });

    fetch(`/educator/controlEdit?${urlParams.toString()}`, {
      method: "PUT",
    }).then((res) => {
      if (!res) {
        alert("Error");
        return;
      }
      setItems((prev) =>
        prev.map((el) =>
          el.ID_math_score === itemToEdit.ID_math_score ? itemToEdit : el
        )
      );
    });
  };

  const onDelete = (deleteId) => {
    setItems((prev) =>
      prev.filter(({ ID_math_score }) => ID_math_score !== deleteId)
    );
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        student_name_surname: studentName,
        score_date: new Date().toDateString(),
        score: undefined,
        type_of_control: "practic",
        ID_math_score: new Date().getTime(),
        isNew: true,
      },
    ]);
  };

  const onCreate = (newItem) => {
    fetch("/educator/addScore", {
      method: "POST",
      body: JSON.stringify({
        student_id: studentId,
        score_date: newItem.score_date,
        score: newItem.score,
        type_of_control: newItem.type_of_control,
        educator_id: id,
        subject_id: subjectId,
        resource,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status !== 200) {
        alert("Error");
        return;
      }

      setItems((prev) => [
        ...prev.filter(
          ({ ID_math_score }) => ID_math_score !== newItem.ID_math_score
        ),
        newItem,
      ]);
    });
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
                key={item.ID_math_score}
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
