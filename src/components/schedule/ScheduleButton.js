import { Link } from "@mui/material";
import { useAuth } from "../../AuthContext";
import paths from "./schedulePaths.json";

const styles = {
  link: {
    cursor: "pointer",
  },
};

/**
 * This component is used to create link to schedule external page
 * @param {string} text - text to be shown in the button
 * @returns {JSX.Element | null}
 */
const ScheduleButton = ({ text }) => {
  const { authData } = useAuth();
  const { role = "student", group, firstName, lastName, fatherName } = authData;

  const teacherFullName = [lastName, firstName, fatherName].join(" ");

  const isMethodist = role === "methodist";

  const isStudent = role === "student";

  const scheduleId = isStudent
    ? paths[role][group]
    : paths?.[role]?.[teacherFullName];

  if (!scheduleId && !isMethodist) {
    return null;
  }

  const pathname = isStudent
    ? `https://schedule.kpi.ua/`
    : `https://schedule.kpi.ua/lecturers`;

  const search = isStudent
    ? `?groupId=${scheduleId}`
    : `?lecturerId=${scheduleId}`;

  const href = isMethodist ? "https://schedule.kpi.ua" : pathname + search;

  return (
    <Link
      component="a"
      href={href}
      rel="noreferrer"
      target="_blank"
      sx={styles.link}
      children={text}
    />
  );
};

export default ScheduleButton;
