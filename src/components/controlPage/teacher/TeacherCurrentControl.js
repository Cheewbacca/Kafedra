import { useState } from "react";
import StyledTable from "./TeacherStyledTable.js";
import { useAuth } from "../../../AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import headerItems from "../headerItems";

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

const TeacherCurrentControl = ({ variant }) => {
  const {
    authData: { role = "student" },
  } = useAuth();

  const navigate = useNavigate();

  const [tableItems, setTableItems] = useState([]);

  useEffect(() => {
    setTableItems(items);
  }, []);

  if (role !== "teacher") {
    return null;
  }

  const onView = () => {
    if (variant === "calendar") {
      navigate(`/teacher/control/detailsCalendar`);
      return;
    }
    if (variant === "session") {
      navigate(`/teacher/control/detailsSession`);
      return;
    }

    navigate(`/teacher/control/detailsControl`);
  };

  const headerItemsToShow = headerItems?.current?.teacher?.all || [];

  return (
    <StyledTable
      headerItems={headerItemsToShow}
      items={tableItems}
      onView={onView}
    />
  );
};

export default TeacherCurrentControl;
