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
      fetch(`http://localhost:3001/educator/control?id=${id}`)
        .then((res) => res.json())
        .then(({ data }) => {
          setTableItems(data);
        });
    } else if (variant === "calendar") {
      fetch(`http://localhost:3001/educator/calendarList?id=${id}`)
        .then((res) => res.json())
        .then(({ data }) => {
          setTableItems(data);
        });
    } else {
      fetch(`http://localhost:3001/educator/sessionList?id=${id}`)
        .then((res) => res.json())
        .then(({ data }) => {
          setTableItems(data);
        });
    }
  }, [id, variant]);

  if (role !== "educator") {
    return null;
  }

  const onView = (subjectId) => {
    if (variant === "calendar") {
      navigate(`/teacher/control/detailsCalendar`);
      return;
    }
    if (variant === "session") {
      navigate(`/teacher/control/detailsSession`);
      return;
    }

    navigate(`/teacher/control/detailsControl?subject=${subjectId}`);
  };

  const headerItemsToShow = headerItems?.current?.educator?.all || [];

  return (
    <StyledTable
      headerItems={headerItemsToShow}
      items={tableItems}
      onView={onView}
    />
  );
};

export default TeacherCurrentControl;
