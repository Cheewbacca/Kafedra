import { useMemo, useState } from "react";
import StyledSelect from "../UI/StyledSelect";
import { Box } from "@mui/material";
import StyledTable from "../UI/StyledTable";
import controlPageSelectOptions from "../../mocks/controlPageSelectOptions.json";
import headerItems from "./headerItems";

const items = [
  {
    name: "Історія Великого Всесвіту та шось там ще",
    teacher: "Петренко В.О.",
    mark: "12",
  },
  {
    name: "Історія Великого Всесвіту та шось там ще",
    teacher: "Петренко В.О.",
    mark: "12",
  },
  {
    name: "Історія Великого Всесвіту та шось там ще",
    teacher: "Петренко В.О.",
    mark: "12",
  },
  {
    name: "Історія Великого Всесвіту та шось там ще",
    teacher: "Петренко В.О.",
    mark: "12",
  },
  {
    name: "Історія Великого Всесвіту та шось там ще",
    teacher: "Петренко В.О.",
    mark: "12",
  },
];

const ControlPage = () => {
  const [selectValue, setSelectValue] = useState(
    controlPageSelectOptions[0].value
  );

  const changeSelect = (e) => {
    setSelectValue(e.target.value);
  };

  const headerItemsToShow = useMemo(() => {
    if (selectValue === "session") {
      return headerItems;
    }

    return headerItems.filter(({ show }) => Boolean(show));
  }, [selectValue]);

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
        <StyledTable headerItems={headerItemsToShow} items={items} />
      </Box>
    </>
  );
};

export default ControlPage;
