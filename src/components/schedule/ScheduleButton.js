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

  const isStudent = role === "student";

  const scheduleId = isStudent
    ? paths[role][group]
    : paths[role][teacherFullName];

  if (!scheduleId) {
    return null;
  }

  const pathname = isStudent
    ? `https://schedule.kpi.ua/`
    : `https://schedule.kpi.ua/lecturers`;

  const search = isStudent
    ? `?groupId=${scheduleId}`
    : `?lecturerId=${scheduleId}`;

  return (
    <Link
      component="a"
      href={pathname + search}
      rel="noreferrer"
      target="_blank"
      sx={styles.link}
      children={text}
    />
  );
};

export default ScheduleButton;
