import { useState } from "react";
import StyledTable from "./TeacherStyledTable.js";
import { useAuth } from "../../../AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import headerItems from "../headerItems";

const TeacherCurrentControl = ({ variant }) => {
  const {
    authData: { role = "student", id },
  } = useAuth();

  const navigate = useNavigate();

  const [tableItems, setTableItems] = useState([]);

  useEffect(() => {
    if (!id) {
      return;
    }

    if (!variant || variant === "current") {
      fetch(`/educator/control?id=${id}`)
        .then((res) => res.json())
        .then(({ data }) => {
          setTableItems(data);
        });
    } else if (variant === "calendar") {
      fetch(`/educator/calendarList?id=${id}`)
        .then((res) => res.json())
        .then(({ data }) => {
          setTableItems(data);
        });
    } else {
      fetch(`/educator/sessionList?id=${id}`)
        .then((res) => res.json())
        .then(({ data }) => {
          setTableItems(data);
        });
    }
  }, [id, variant]);

  if (role !== "educator" && role !== "admin") {
    return null;
  }

  const onView = (param, resource = "") => {
    if (variant === "calendar") {
      navigate(`/teacher/control/detailsCalendar?group_name=${param}`);
      return;
    }
    if (variant === "session") {
      navigate(`/teacher/control/detailsSession?group_name=${param}`);
      return;
    }

    navigate(
      `/teacher/control/detailsControl?subject=${param}&resource=${resource}`
    );
  };

  const headerItemsToShow = headerItems?.current?.educator?.all || [];

  return (
    <StyledTable
      headerItems={headerItemsToShow}
      items={tableItems}
      onView={onView}
      variant={variant}
    />
  );
};

export default TeacherCurrentControl;
