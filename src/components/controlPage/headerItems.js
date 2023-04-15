import {
  BorderColor,
  CheckBox,
  CreditScore,
  DateRange,
  Hail,
  Today,
} from "@mui/icons-material";

const headerItems = [
  {
    Icon: BorderColor,
    text: "Назва Предмету",
    show: true,
  },
  {
    Icon: Hail,
    text: "Викладач",
    show: true,
  },
  {
    Icon: DateRange,
    text: "Дата",
    show: false,
  },
  {
    Icon: CheckBox,
    text: "Вид контролю",
    show: false,
  },
  {
    Icon: CreditScore,
    text: "Оцінка",
    show: true,
  },
  {
    Icon: Today,
    text: "Дії",
    show: true,
  },
];

export default headerItems;
