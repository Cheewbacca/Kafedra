import {
  BorderColor,
  CheckBox,
  CreditScore,
  DateRange,
  Hail,
  Today,
} from "@mui/icons-material";

const Name = {
  Icon: BorderColor,
  text: "Назва Предмету",
  type: "name",
};

const Professor = {
  Icon: Hail,
  text: "Викладач",
  type: "professor",
};

const Actions = {
  Icon: Today,
  text: "Дії",
  type: "actions",
};

const Date = {
  Icon: DateRange,
  text: "Дата",
  type: "date",
};

const Score = {
  Icon: CreditScore,
  text: "Оцінка",
  type: "score",
};

const Atestation1 = {
  Icon: CreditScore,
  text: "Атестація 1",
  type: "atestation1",
};

const Atestation2 = {
  Icon: CreditScore,
  text: "Атестація 2",
  type: "atestation2",
};

const Control = {
  Icon: CheckBox,
  text: "Вид контролю",
  type: "control",
};

const Group = {
  Icon: Hail,
  text: "Група",
  type: "group",
};

const Student = {
  Icon: BorderColor,
  text: "Студент",
  type: "student",
};

const tablesHeaders = {
  current: {
    student: {
      all: [Name, Professor, Actions],
      one: [Date, Professor, Score, Control],
    },
    teacher: {
      all: [Name, Group, Actions],
      one: [Student, Group, Actions],
      additional: [Student, Date, Score, Control, Actions],
    },
  },
  session: {
    student: {
      all: [Name, Professor, Score, Date],
    },
    teacher: {
      all: [Name, Group, Actions],
      one: [Student, Group, Score, Actions],
    },
  },
  calendar: {
    student: {
      all: [Name, Professor, Atestation1, Atestation2],
    },
    teacher: {
      all: [Name, Group, Actions],
      one: [Student, Group, Atestation1, Atestation2, Actions],
    },
  },
};

export default tablesHeaders;
