import { useState } from "react";
import StyledSelect from "../UI/StyledSelect";
import { Box } from "@mui/material";
import StyledTable from "../UI/StyledTable";
import controlPageSelectOptions from "../../mocks/controlPageSelectOptions.json";
import headerItems from "./headerItems";
import { useAuth } from "../../AuthContext";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

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

const ControlPage = ({ variant }) => {
  const {
    authData: { role = "student" },
  } = useAuth();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const table = searchParams.get("table");

  const [selectValue, setSelectValue] = useState("");

  const [currentTable, setCurrentTable] = useState("all");

  useEffect(() => {
    if (!variant) {
      setCurrentTable("all");
      return;
    }

    if (variant === "details") {
      setCurrentTable("one");
      return;
    }

    setCurrentTable("additional");
  }, [variant]);

  useEffect(() => {
    setSelectValue(table || controlPageSelectOptions[0].value);
  }, [table]);

  const changeSelect = (e) => {
    navigate(`/control?table=${e.target.value}`);
  };

  const onView = () => {
    navigate("/control/details");
  };

  const onEdit = () => {
    navigate("/control/details/edit");
  };

  const headerItemsToShow =
    headerItems[selectValue]?.[role]?.[currentTable] || [];

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
        <StyledTable
          headerItems={headerItemsToShow}
          items={items}
          onView={onView}
          onEdit={onEdit}
        />
      </Box>
    </>
  );
};

export default ControlPage;
