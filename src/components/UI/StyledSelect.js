import { MenuItem, Select } from "@mui/material";

const styles = {
  wrapper: {
    backgroundColor: "white",
    color: "secondary.main",
    border: "none",
    borderRadius: "15px",
    "& > .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& > svg": {
      color: "secondary.main",
    },
  },
};

const StyledSelect = ({ value, onChange, options, id, name }) => (
  <Select
    value={value}
    onChange={onChange}
    id={id}
    name={name || id}
    sx={styles.wrapper}
  >
    {options.map((option) => (
      <MenuItem
        key={option.value}
        value={option.value}
        children={option.text}
      />
    ))}
  </Select>
);

export default StyledSelect;
