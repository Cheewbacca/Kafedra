import { useState } from "react";
import controlPageSelectOptions from "../../mocks/controlPageSelectOptions.json";
import { useAuth } from "../../AuthContext";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import TeacherCurrentControl from "./teacher/TeacherCurrentControl";
import StyledSelect from "../UI/StyledSelect";
import { Box } from "@mui/material";

const tables = {
  current: <TeacherCurrentControl />,
  calendar: <TeacherCurrentControl variant="calendar" />,
  session: <TeacherCurrentControl variant="session" />,
};

const ControlPage = () => {
  const {
    authData: { role = "student" },
  } = useAuth();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const table = searchParams.get("table");

  const [selectValue, setSelectValue] = useState("current");

  useEffect(() => {
    setSelectValue(table || controlPageSelectOptions[0].value);
  }, [table]);

  if (role !== "teacher") {
    return null;
  }

  const changeSelect = (e) => {
    navigate(`/teacher/control?table=${e.target.value}`);
  };

  return (
    <>
      <StyledSelect
        value={selectValue}
        onChange={changeSelect}
        options={controlPageSelectOptions}
        id="control_select"
        name="control_select"
      />
      <Box mt={3}>{tables[selectValue]}</Box>
    </>
  );
};

export default ControlPage;
