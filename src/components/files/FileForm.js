import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  TextField,
} from "@mui/material";
import { useState } from "react";
import StyledSelect from "../UI/StyledSelect";
import StyledButton from "../UI/StyledButton";
import { Add } from "@mui/icons-material";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },
  formControl: {
    mt: 2,
    "&:focus-within": {
      "& label": {
        color: "primary.main",
      },
    },
    "& .MuiInputBase-root": {
      width: "100%",
      borderRadius: "15px",
      background: "#F5F5F5",
      mt: 1,
    },
  },
  label: {
    textAlign: "left",
    color: "secondary.main",
    opacity: 0.5,
  },
};

const selectOptions = [
  { text: "Студент", value: "student" },
  { text: "Викладач", value: "educator" },
];

const FileForm = ({ toggleModal, getFiles }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("student");
  const [file, setFile] = useState(null);

  const changeName = (e) => {
    setName(e.target.value);
  };

  const changeRole = (e) => {
    setRole(e.target.value);
  };

  const changeFile = (e) => {
    if (!e.target.files[0]) {
      return;
    }

    setFile(e.target.files[0]);
  };

  const uploadImage = () => {
    if (!role || !file || !name) {
      return;
    }

    const data = new FormData();

    data.append("img", file);
    data.append("role", role);
    data.append("name", name);

    fetch(`/fileUpload`, {
      method: "POST",
      contentType: "multipart/form-data",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.status) {
          alert("Error");
          return;
        }

        getFiles().then(() => {
          toggleModal();
        });
      });
  };

  return (
    <Box sx={styles.wrapper} component="form">
      <FormControl sx={styles.formControl} required>
        <FormLabel sx={styles.label} variant="body2" htmlFor="name">
          Введіть назву файлу
        </FormLabel>
        <TextField id="name" value={name} onChange={changeName} required />
        {!name && <FormHelperText error={!name} children="Fill name field" />}
      </FormControl>

      <FormControl sx={styles.formControl} required>
        <FormLabel sx={styles.label} variant="body2" htmlFor="role">
          Виберіть роль для доступу
        </FormLabel>
        <StyledSelect
          options={selectOptions}
          value={role}
          onChange={changeRole}
        />
        {!role && <FormHelperText error={!role} children="Fill role field" />}
      </FormControl>

      <FormControl sx={styles.formControl} required>
        <FormLabel sx={styles.label} variant="body2" htmlFor="file">
          Виберіть файл
        </FormLabel>
        <TextField id="file" type="file" onChange={changeFile} required />
        {!file && <FormHelperText error={!file} children="Upload file" />}
      </FormControl>

      <Box mt={3} display="flex" justifyContent="center">
        <StyledButton
          disableRipple
          variant="contained"
          startIcon={<Add />}
          text="Завантажити"
          colorVariants="link"
          onClick={uploadImage}
        />
      </Box>
    </Box>
  );
};

export default FileForm;
