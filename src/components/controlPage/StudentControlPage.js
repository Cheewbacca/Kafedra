import { useState } from "react";
import StyledSelect from "../UI/StyledSelect";
import { Box } from "@mui/material";
import controlPageSelectOptions from "../../mocks/controlPageSelectOptions.json";
import headerItems from "./headerItems";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import StudentTable from "./student/StudentTable";

const StudentControlPage = ({ variant }) => {
  const {
    authData: { role = "student", id },
  } = useAuth();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const table = searchParams.get("table");

  const [selectValue, setSelectValue] = useState("");

  const [currentTable, setCurrentTable] = useState("all");

  const [tableItems, setTableItems] = useState([]);

  useEffect(() => {
    if (!id) {
      return;
    }

    if (!table || table === "current") {
      if (!variant) {
        fetch(`http://localhost:3001/student/control?id=${id}`)
          .then((res) => res.json())
          .then(({ data }) => {
            setTableItems(data);
          });
        return;
      }

      fetch(`http://localhost:3001/student/controlDetailed?id=${id}`)
        .then((res) => res.json())
        .then(({ data }) => {
          setTableItems(data);
        });
    } else if (table === "calendar") {
      fetch(`http://localhost:3001/student/calendar?id=${id}`)
        .then((res) => res.json())
        .then(({ data }) => {
          setTableItems(data);
        });
    } else {
      fetch(`http://localhost:3001/student/session?id=${id}`)
        .then((res) => res.json())
        .then(({ data }) => {
          setTableItems(data);
        });
    }
  }, [id, variant, table]);

  useEffect(() => {
    if (variant === "details") {
      setCurrentTable("one");
      return;
    }

    setCurrentTable("all");
  }, [variant]);

  useEffect(() => {
    setSelectValue(table || controlPageSelectOptions[0].value);
  }, [table]);

  if (role !== "student") {
    return null;
  }

  const changeSelect = (e) => {
    navigate(`/student/control?table=${e.target.value}`);
    setCurrentTable("all");
  };

  const onView = () => {
    navigate("/student/control/details");
  };

  const headerItemsToShow =
    headerItems[selectValue]?.student?.[currentTable] || [];

  return (
    <>
      <StyledSelect
        value={selectValue}
        onChange={changeSelect}
        options={controlPageSelectOptions}
        id="control_select"
        name="control_select"
      />
      <Box mt={3}>
        <StudentTable
          headerItems={headerItemsToShow}
          items={tableItems}
          onView={onView}
        />
      </Box>
    </>
  );
};

export default StudentControlPage;
